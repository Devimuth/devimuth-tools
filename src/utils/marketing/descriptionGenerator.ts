/**
 * Meta description generation utilities
 */

export interface DescriptionOptions {
  content: string
  keywords: string[]
  tone?: 'professional' | 'friendly' | 'casual' | 'formal'
  maxLength?: number
}

/**
 * Shuffle array randomly (Fisher-Yates algorithm)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Generate meta description variations from content
 */
export function generateDescriptionVariations(options: DescriptionOptions): string[] {
  const { content, keywords, tone = 'professional', maxLength = 160 } = options
  const variations: string[] = []

  // Extract sentences from content
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  if (sentences.length === 0) {
    return ['Enter content to generate meta descriptions']
  }

  const callToActions = [
    'Discover more today.',
    'Learn more now.',
    'Find out more.',
    'Explore our solutions.',
    'Get started today.',
    'See how it works.',
  ]

  // Variation 1: First sentence + keyword
  if (sentences[0] && keywords.length > 0) {
    const firstSentence = sentences[0].trim()
    const keyword = keywords[0]
    let desc = `${firstSentence} ${keyword}.`
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 2: Summary of first 2 sentences
  if (sentences.length >= 2) {
    let desc = sentences.slice(0, 2).join('. ').trim() + '.'
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 3: Summary of first 3 sentences (if available)
  if (sentences.length >= 3) {
    let desc = sentences.slice(0, 3).join('. ').trim() + '.'
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 4: Keyword-focused with different CTAs
  if (keywords.length > 0) {
    const keyword = keywords[0]
    const relevantSentence = sentences.find(s => 
      s.toLowerCase().includes(keyword.toLowerCase())
    ) || sentences[0]
    const cta = callToActions[Math.floor(Math.random() * callToActions.length)]
    let desc = `${relevantSentence.trim()} ${cta}`
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 5: First sentence with CTA
  if (sentences[0]) {
    const firstSentence = sentences[0].trim()
    const cta = callToActions[Math.floor(Math.random() * callToActions.length)]
    let desc = `${firstSentence} ${cta}`
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 6: Multiple keywords (if available)
  if (keywords.length >= 2) {
    const firstSentence = sentences[0].trim()
    const keyword1 = keywords[0]
    const keyword2 = keywords[1]
    let desc = `${firstSentence} Explore ${keyword1} and ${keyword2}.`
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 7: Question format
  if (sentences[0] && keywords.length > 0) {
    const keyword = keywords[0]
    const firstSentence = sentences[0].trim()
    let desc = `Looking for ${keyword}? ${firstSentence}`
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Variation 8: Benefit-focused
  if (sentences.length >= 2 && keywords.length > 0) {
    const keyword = keywords[0]
    const secondSentence = sentences[1]?.trim() || sentences[0].trim()
    let desc = `${secondSentence} Perfect for ${keyword}.`
    if (desc.length > maxLength) {
      desc = truncateToLength(desc, maxLength)
    }
    variations.push(desc)
  }

  // Apply tone adjustments
  const toneAdjusted = variations.map(desc => applyTone(desc, tone))
  
  // Remove duplicates
  const unique = Array.from(new Set(toneAdjusted))
  
  // Shuffle to make each regeneration feel different
  return shuffleArray(unique)
}

/**
 * Truncate text to specified length, preserving word boundaries
 */
function truncateToLength(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  
  // Try to cut at word boundary
  const truncated = text.substring(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > maxLength * 0.7) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

/**
 * Apply tone to description
 */
function applyTone(description: string, tone: string): string {
  if (tone === 'formal') {
    // Remove contractions, use more formal language
    return description
      .replace(/\bdon't\b/gi, 'do not')
      .replace(/\bcan't\b/gi, 'cannot')
      .replace(/\bwon't\b/gi, 'will not')
      .replace(/\bit's\b/gi, 'it is')
      .replace(/\bthat's\b/gi, 'that is')
  } else if (tone === 'casual') {
    // Add more casual language
    return description
      .replace(/\bdiscover\b/gi, 'check out')
      .replace(/\blearn more\b/gi, 'find out more')
  } else if (tone === 'friendly') {
    // Keep friendly but professional
    return description
  }
  // Professional - default, no changes needed
  return description
}

/**
 * Calculate readability score (Flesch Reading Ease approximation)
 */
export function calculateReadabilityScore(text: string): number {
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  
  if (words.length === 0 || sentences.length === 0) return 0
  
  const avgSentenceLength = words.length / sentences.length
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length
  
  // Simplified Flesch Reading Ease
  const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgWordLength)
  return Math.max(0, Math.min(100, Math.round(score)))
}

/**
 * Analyze sentiment (simple positive/negative/neutral)
 */
export function analyzeSentiment(text: string): { sentiment: 'positive' | 'neutral' | 'negative'; score: number } {
  const positiveWords = ['great', 'excellent', 'amazing', 'best', 'perfect', 'wonderful', 'fantastic', 'love', 'awesome', 'outstanding']
  const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'poor', 'disappointing', 'frustrating', 'difficult', 'problem']
  
  const words = text.toLowerCase().split(/\s+/)
  let positive = 0
  let negative = 0
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positive++
    if (negativeWords.some(nw => word.includes(nw))) negative++
  })
  
  const total = positive + negative
  if (total === 0) return { sentiment: 'neutral', score: 0 }
  
  const score = ((positive - negative) / total) * 100
  
  if (score > 20) return { sentiment: 'positive', score: Math.round(score) }
  if (score < -20) return { sentiment: 'negative', score: Math.round(score) }
  return { sentiment: 'neutral', score: Math.round(score) }
}

/**
 * Extract keywords from content
 */
export function extractKeywords(content: string, count: number = 5): string[] {
  // Simple keyword extraction - remove common stop words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'
  ])

  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))

  // Count word frequency
  const wordCount: { [key: string]: number } = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })

  // Sort by frequency and return top keywords
  return Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word)
}

