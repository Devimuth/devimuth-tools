/**
 * SEO template utilities for generating meta tags
 */

export interface SEOMetaData {
  title: string
  description: string
  keywords: string
  canonicalUrl: string
  robots: string
  viewport: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  ogType?: string
  ogSiteName?: string
  ogLocale?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

/**
 * Generate SEO meta tags HTML
 */
export function generateSEOMetaTags(data: SEOMetaData): string {
  const tags: string[] = []

  // Title tag
  if (data.title) {
    tags.push(`<title>${escapeHtml(data.title)}</title>`)
  }

  // Basic meta tags
  if (data.description) {
    tags.push(`<meta name="description" content="${escapeHtml(data.description)}">`)
  }

  if (data.keywords) {
    tags.push(`<meta name="keywords" content="${escapeHtml(data.keywords)}">`)
  }

  if (data.canonicalUrl) {
    tags.push(`<link rel="canonical" href="${escapeHtml(data.canonicalUrl)}">`)
  }

  if (data.robots) {
    tags.push(`<meta name="robots" content="${escapeHtml(data.robots)}">`)
  }

  if (data.viewport) {
    tags.push(`<meta name="viewport" content="${escapeHtml(data.viewport)}">`)
  }

  // Open Graph tags
  if (data.ogTitle || data.title) {
    tags.push(`<meta property="og:title" content="${escapeHtml(data.ogTitle || data.title)}">`)
  }

  if (data.ogDescription || data.description) {
    tags.push(`<meta property="og:description" content="${escapeHtml(data.ogDescription || data.description)}">`)
  }

  if (data.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(data.ogImage)}">`)
  }

  if (data.ogUrl || data.canonicalUrl) {
    tags.push(`<meta property="og:url" content="${escapeHtml(data.ogUrl || data.canonicalUrl || '')}">`)
  }

  if (data.ogType) {
    tags.push(`<meta property="og:type" content="${escapeHtml(data.ogType)}">`)
  }

  if (data.ogSiteName) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(data.ogSiteName)}">`)
  }

  if (data.ogLocale) {
    tags.push(`<meta property="og:locale" content="${escapeHtml(data.ogLocale)}">`)
  }

  // Twitter Card tags
  if (data.twitterCard) {
    tags.push(`<meta name="twitter:card" content="${escapeHtml(data.twitterCard)}">`)
  }

  if (data.twitterTitle || data.title) {
    tags.push(`<meta name="twitter:title" content="${escapeHtml(data.twitterTitle || data.title)}">`)
  }

  if (data.twitterDescription || data.description) {
    tags.push(`<meta name="twitter:description" content="${escapeHtml(data.twitterDescription || data.description)}">`)
  }

  if (data.twitterImage) {
    tags.push(`<meta name="twitter:image" content="${escapeHtml(data.twitterImage)}">`)
  }

  return tags.join('\n')
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Validate title length (50-60 characters recommended)
 */
export function validateTitleLength(title: string): { valid: boolean; length: number; message: string } {
  const length = title.length
  if (length === 0) {
    return { valid: false, length, message: 'Title is required' }
  }
  if (length < 30) {
    return { valid: false, length, message: 'Title is too short (recommended: 50-60 characters)' }
  }
  if (length > 60) {
    return { valid: false, length, message: 'Title is too long (recommended: 50-60 characters)' }
  }
  return { valid: true, length, message: 'Title length is optimal' }
}

/**
 * Validate description length (150-160 characters recommended)
 */
export function validateDescriptionLength(description: string): { valid: boolean; length: number; message: string } {
  const length = description.length
  if (length === 0) {
    return { valid: false, length, message: 'Description is required' }
  }
  if (length < 120) {
    return { valid: false, length, message: 'Description is too short (recommended: 150-160 characters)' }
  }
  if (length > 160) {
    return { valid: false, length, message: 'Description is too long (recommended: 150-160 characters)' }
  }
  return { valid: true, length, message: 'Description length is optimal' }
}

