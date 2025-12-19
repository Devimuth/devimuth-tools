/**
 * Keyword analysis utilities
 */

export interface KeywordResult {
  word: string
  count: number
  density: number
}

export interface AnalysisResult {
  totalWords: number
  uniqueWords: number
  topKeywords: KeywordResult[]
  averageWordLength: number
  averageSentenceLength: number
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

  return {
    totalWords,
    uniqueWords,
    topKeywords,
    averageWordLength: Math.round(averageWordLength * 100) / 100,
    averageSentenceLength: Math.round(averageSentenceLength * 100) / 100,
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

