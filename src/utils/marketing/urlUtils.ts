/**
 * URL shortening utilities (client-side)
 */

const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * Encode number to Base62
 */
function encodeBase62(num: number): string {
  if (num === 0) return BASE62_CHARS[0]
  
  let result = ''
  while (num > 0) {
    result = BASE62_CHARS[num % 62] + result
    num = Math.floor(num / 62)
  }
  return result
}

/**
 * Generate short code from URL
 */
export function generateShortCode(url: string, customAlias?: string): string {
  if (customAlias) {
    // Validate custom alias (alphanumeric and hyphens only)
    if (!/^[a-zA-Z0-9-]+$/.test(customAlias)) {
      throw new Error('Custom alias can only contain letters, numbers, and hyphens')
    }
    return customAlias
  }

  // Generate hash from URL
  let hash = 0
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }

  // Convert to positive number and encode
  const positiveHash = Math.abs(hash)
  return encodeBase62(positiveHash).substring(0, 8)
}

/**
 * Validate URL format
 */
export function validateURL(url: string): { valid: boolean; error?: string } {
  if (!url.trim()) {
    return { valid: false, error: 'URL is required' }
  }

  try {
    const urlObj = new URL(url)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { valid: false, error: 'URL must use HTTP or HTTPS protocol' }
    }
    return { valid: true }
  } catch {
    // Try adding https:// if protocol is missing
    try {
      const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
      new URL(urlWithProtocol)
      return { valid: true }
    } catch {
      return { valid: false, error: 'Invalid URL format' }
    }
  }
}

export interface URLMapping {
  url: string
  createdAt: string
  clicks: number
  expiresAt?: string
  password?: string
}

/**
 * Store URL mapping in localStorage
 */
export function storeURLMapping(shortCode: string, originalUrl: string, data?: Partial<URLMapping>): void {
  try {
    const mappings = getURLMappings()
    const existing = mappings[shortCode]
    mappings[shortCode] = {
      url: originalUrl,
      createdAt: existing?.createdAt || new Date().toISOString(),
      clicks: existing?.clicks || 0,
      ...data,
    }
    localStorage.setItem('devimuth_marketing_url_mappings', JSON.stringify(mappings))
  } catch (error) {
    console.error('Failed to store URL mapping:', error)
  }
}

/**
 * Get URL from short code
 */
export function getURLFromCode(shortCode: string, password?: string): string | null {
  try {
    const mappings = getURLMappings()
    const mapping = mappings[shortCode]
    if (mapping) {
      // Check expiration
      if (mapping.expiresAt && new Date(mapping.expiresAt) < new Date()) {
        return null // URL expired
      }
      
      // Check password
      if (mapping.password && mapping.password !== password) {
        return null // Wrong password
      }
      
      // Increment click count
      mapping.clicks++
      localStorage.setItem('devimuth_marketing_url_mappings', JSON.stringify(mappings))
      return mapping.url
    }
    return null
  } catch (error) {
    console.error('Failed to get URL from code:', error)
    return null
  }
}

/**
 * Get all URL mappings
 */
export function getURLMappings(): Record<string, URLMapping> {
  try {
    const stored = localStorage.getItem('devimuth_marketing_url_mappings')
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

/**
 * Update URL mapping
 */
export function updateURLMapping(shortCode: string, updates: Partial<URLMapping>): void {
  try {
    const mappings = getURLMappings()
    if (mappings[shortCode]) {
      mappings[shortCode] = { ...mappings[shortCode], ...updates }
      localStorage.setItem('devimuth_marketing_url_mappings', JSON.stringify(mappings))
    }
  } catch (error) {
    console.error('Failed to update URL mapping:', error)
  }
}

/**
 * Delete URL mapping
 */
export function deleteURLMapping(shortCode: string): void {
  try {
    const mappings = getURLMappings()
    delete mappings[shortCode]
    localStorage.setItem('devimuth_marketing_url_mappings', JSON.stringify(mappings))
  } catch (error) {
    console.error('Failed to delete URL mapping:', error)
  }
}

