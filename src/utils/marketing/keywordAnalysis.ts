/**
 * Keyword analysis utilities
 */

export interface KeywordResult {
  word: string
  count: number
  density: number
}

export interface ReadabilityMetrics {
  fleschKincaid: number
  fleschReadingEase: number
  smogIndex: number
  colemanLiau: number
  automatedReadability: number
}

export interface AnalysisResult {
  totalWords: number
  uniqueWords: number
  topKeywords: KeywordResult[]
  averageWordLength: number
  averageSentenceLength: number
  readability?: ReadabilityMetrics
  seoScore?: number
  keywordSuggestions?: string[]
}

/**
 * Analyze keyword density in text
 */
export function analyzeKeywordDensity(
  text: string,
  options: {
    removeStopWords?: boolean
    minWordLength?: number
    topN?: number
  } = {}
): AnalysisResult {
  const {
    removeStopWords = false,
    minWordLength = 3,
    topN = 20,
  } = options

  // Tokenize text
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= minWordLength)

  const totalWords = words.length

  if (totalWords === 0) {
    return {
      totalWords: 0,
      uniqueWords: 0,
      topKeywords: [],
      averageWordLength: 0,
      averageSentenceLength: 0,
    }
  }

  // Remove stop words if requested
  const filteredWords = removeStopWords
    ? words.filter(word => !isStopWord(word))
    : words

  // Count word frequency
  const wordCount: { [key: string]: number } = {}
  filteredWords.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })

  // Calculate density and create results
  const uniqueWords = Object.keys(wordCount).length
  const topKeywords: KeywordResult[] = Object.entries(wordCount)
    .map(([word, count]) => ({
      word,
      count,
      density: (count / totalWords) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)

  // Calculate averages
  const totalWordLength = words.reduce((sum, word) => sum + word.length, 0)
  const averageWordLength = totalWordLength / totalWords

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const totalSentenceLength = sentences.reduce((sum, s) => {
    const words = s.trim().split(/\s+/).length
    return sum + words
  }, 0)
  const averageSentenceLength = sentences.length > 0
    ? totalSentenceLength / sentences.length
    : 0

  // Calculate readability metrics
  const readability = calculateReadability(text, sentences.length, totalWords)
  
  // Calculate SEO score
  const seoScore = calculateSEOScore({
    totalWords,
    uniqueWords,
    averageSentenceLength,
    readability,
    topKeywords,
  })
  
  // Generate keyword suggestions
  const keywordSuggestions = generateKeywordSuggestions(text, topKeywords)

  return {
    totalWords,
    uniqueWords,
    topKeywords,
    averageWordLength: Math.round(averageWordLength * 100) / 100,
    averageSentenceLength: Math.round(averageSentenceLength * 100) / 100,
    readability,
    seoScore,
    keywordSuggestions,
  }
}

/**
 * Check if word is a stop word
 */
function isStopWord(word: string): boolean {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
    'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
    'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this',
    'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
    'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
  ])
  return stopWords.has(word.toLowerCase())
}

/**
 * Analyze n-grams (bigrams, trigrams)
 */
export function analyzeNGrams(text: string, n: number = 2, topN: number = 10): KeywordResult[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0)

  const ngrams: { [key: string]: number } = {}

  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(' ')
    ngrams[ngram] = (ngrams[ngram] || 0) + 1
  }

  const totalNgrams = Object.values(ngrams).reduce((sum, count) => sum + count, 0)

  return Object.entries(ngrams)
    .map(([phrase, count]) => ({
      word: phrase,
      count,
      density: (count / totalNgrams) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)
}

/**
 * Count syllables in a word
 */
function countSyllables(word: string): number {
  word = word.toLowerCase()
  if (word.length <= 3) return 1
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  const matches = word.match(/[aeiouy]{1,2}/g)
  return matches ? Math.max(1, matches.length) : 1
}

/**
 * Count total syllables in text
 */
function countTotalSyllables(text: string): number {
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 0)
  return words.reduce((sum, word) => sum + countSyllables(word), 0)
}

/**
 * Calculate readability metrics
 */
function calculateReadability(text: string, sentences: number, words: number): ReadabilityMetrics {
  if (sentences === 0 || words === 0) {
    return {
      fleschKincaid: 0,
      fleschReadingEase: 0,
      smogIndex: 0,
      colemanLiau: 0,
      automatedReadability: 0,
    }
  }

  const syllables = countTotalSyllables(text)
  const characters = text.replace(/\s/g, '').length

  // Flesch Reading Ease
  const fleschReadingEase = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words))

  // Flesch-Kincaid Grade Level
  const fleschKincaid = (0.39 * (words / sentences)) + (11.8 * (syllables / words)) - 15.59

  // SMOG Index
  const complexWords = text.split(/\s+/).filter(word => countSyllables(word) >= 3).length
  const smogIndex = 1.043 * Math.sqrt(complexWords * (30 / sentences)) + 3.1291

  // Coleman-Liau Index
  const avgSentenceLength = words / sentences
  const avgCharsPerWord = characters / words
  const colemanLiau = (0.0588 * avgCharsPerWord * 100) - (0.296 * (100 / avgSentenceLength)) - 15.8

  // Automated Readability Index
  const automatedReadability = (4.71 * (characters / words)) + (0.5 * (words / sentences)) - 21.43

  return {
    fleschKincaid: Math.round(fleschKincaid * 10) / 10,
    fleschReadingEase: Math.round(fleschReadingEase * 10) / 10,
    smogIndex: Math.round(smogIndex * 10) / 10,
    colemanLiau: Math.round(colemanLiau * 10) / 10,
    automatedReadability: Math.round(automatedReadability * 10) / 10,
  }
}

/**
 * Calculate SEO score (0-100)
 */
function calculateSEOScore(data: {
  totalWords: number
  uniqueWords: number
  averageSentenceLength: number
  readability?: ReadabilityMetrics
  topKeywords: KeywordResult[]
}): number {
  let score = 0
  let factors = 0

  // Word count (optimal: 300-2000 words)
  if (data.totalWords >= 300 && data.totalWords <= 2000) {
    score += 20
  } else if (data.totalWords >= 200 && data.totalWords < 300) {
    score += 15
  } else if (data.totalWords > 2000 && data.totalWords <= 3000) {
    score += 15
  } else {
    score += 5
  }
  factors++

  // Keyword diversity (unique words / total words)
  const diversity = data.uniqueWords / data.totalWords
  if (diversity >= 0.5) {
    score += 20
  } else if (diversity >= 0.3) {
    score += 15
  } else {
    score += 10
  }
  factors++

  // Sentence length (optimal: 15-20 words)
  if (data.averageSentenceLength >= 15 && data.averageSentenceLength <= 20) {
    score += 20
  } else if (data.averageSentenceLength >= 10 && data.averageSentenceLength < 15) {
    score += 15
  } else if (data.averageSentenceLength > 20 && data.averageSentenceLength <= 25) {
    score += 15
  } else {
    score += 10
  }
  factors++

  // Readability (Flesch Reading Ease: 60-70 is ideal)
  if (data.readability) {
    if (data.readability.fleschReadingEase >= 60 && data.readability.fleschReadingEase <= 70) {
      score += 20
    } else if (data.readability.fleschReadingEase >= 50 && data.readability.fleschReadingEase < 60) {
      score += 15
    } else if (data.readability.fleschReadingEase > 70 && data.readability.fleschReadingEase <= 80) {
      score += 15
    } else {
      score += 10
    }
    factors++
  }

  // Keyword density (optimal: 1-2% for primary keyword)
  if (data.topKeywords.length > 0) {
    const primaryDensity = data.topKeywords[0].density
    if (primaryDensity >= 1 && primaryDensity <= 2) {
      score += 20
    } else if (primaryDensity >= 0.5 && primaryDensity < 1) {
      score += 15
    } else if (primaryDensity > 2 && primaryDensity <= 3) {
      score += 15
    } else {
      score += 10
    }
    factors++
  }

  return Math.round((score / factors))
}

/**
 * Generate keyword suggestions based on content
 */
export function generateKeywordSuggestions(text: string, topKeywords: KeywordResult[]): string[] {
  const suggestions: string[] = []
  
  // Extract potential LSI keywords (words that appear with top keywords)
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 4 && !isStopWord(w))
  const wordCooccurrence: { [key: string]: number } = {}
  
  topKeywords.slice(0, 5).forEach(keyword => {
    const keywordIndex = words.indexOf(keyword.word)
    if (keywordIndex !== -1) {
      // Look at surrounding words
      for (let i = Math.max(0, keywordIndex - 3); i < Math.min(words.length, keywordIndex + 4); i++) {
        if (i !== keywordIndex && !topKeywords.some(k => k.word === words[i])) {
          wordCooccurrence[words[i]] = (wordCooccurrence[words[i]] || 0) + 1
        }
      }
    }
  })
  
  // Get top co-occurring words
  const lsiKeywords = Object.entries(wordCooccurrence)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => word)
  
  suggestions.push(...lsiKeywords)
  
  // Add related terms based on common patterns
  topKeywords.slice(0, 3).forEach(keyword => {
    // Suggest plural/singular variations
    if (!keyword.word.endsWith('s')) {
      suggestions.push(keyword.word + 's')
    }
    if (keyword.word.endsWith('s') && keyword.word.length > 3) {
      suggestions.push(keyword.word.slice(0, -1))
    }
  })
  
  return [...new Set(suggestions)].slice(0, 10)
}

