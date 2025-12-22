// Readability metrics calculator

export interface ReadabilityMetrics {
  fleschReadingEase: number
  fleschKincaidGrade: number
  averageSentenceLength: number
  averageWordsPerSentence: number
  totalSentences: number
  totalWords: number
  totalSyllables: number
}

// Count syllables in a word
function countSyllables(word: string): number {
  word = word.toLowerCase()
  if (word.length <= 3) return 1
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, '')
  
  const matches = word.match(/[aeiouy]{1,2}/g)
  return matches ? Math.max(1, matches.length) : 1
}

// Calculate readability metrics
export function calculateReadability(text: string): ReadabilityMetrics {
  if (!text || text.trim().length === 0) {
    return {
      fleschReadingEase: 0,
      fleschKincaidGrade: 0,
      averageSentenceLength: 0,
      averageWordsPerSentence: 0,
      totalSentences: 0,
      totalWords: 0,
      totalSyllables: 0,
    }
  }

  // Split into sentences (simple approach)
  const sentences = text
    .replace(/[!?]/g, '.')
    .split('.')
    .filter(s => s.trim().length > 0)
  
  const totalSentences = sentences.length || 1

  // Split into words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 0)
  
  const totalWords = words.length || 1

  // Count syllables
  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0)

  // Calculate averages
  const averageWordsPerSentence = totalWords / totalSentences
  const averageSentenceLength = totalSyllables / totalSentences
  const averageSyllablesPerWord = totalSyllables / totalWords

  // Flesch Reading Ease Score
  // Score = 206.835 - (1.015 × ASL) - (84.6 × ASW)
  // ASL = average sentence length (in words)
  // ASW = average number of syllables per word
  const fleschReadingEase = 206.835 - (1.015 * averageWordsPerSentence) - (84.6 * averageSyllablesPerWord)
  
  // Flesch-Kincaid Grade Level
  // Score = (0.39 × ASL) + (11.8 × ASW) - 15.59
  const fleschKincaidGrade = (0.39 * averageWordsPerSentence) + (11.8 * averageSyllablesPerWord) - 15.59

  return {
    fleschReadingEase: Math.max(0, Math.min(100, fleschReadingEase)),
    fleschKincaidGrade: Math.max(0, Math.min(20, fleschKincaidGrade)),
    averageSentenceLength,
    averageWordsPerSentence,
    totalSentences,
    totalWords,
    totalSyllables,
  }
}

// Interpret Flesch Reading Ease score
export function interpretFleschReadingEase(score: number): {
  level: string
  description: string
  recommendation: string
} {
  if (score >= 90) {
    return {
      level: 'Very Easy',
      description: 'Very easy to read. Easily understood by an average 11-year-old student.',
      recommendation: 'Consider making it slightly more sophisticated for professional audiences.',
    }
  } else if (score >= 80) {
    return {
      level: 'Easy',
      description: 'Easy to read. Conversational English for consumers.',
      recommendation: 'Good for general audiences. May be too simple for technical or professional contexts.',
    }
  } else if (score >= 70) {
    return {
      level: 'Fairly Easy',
      description: 'Fairly easy to read. Plain English.',
      recommendation: 'Good balance for most professional communications.',
    }
  } else if (score >= 60) {
    return {
      level: 'Standard',
      description: 'Standard reading level. Plain English. Easily understood by 13- to 15-year-old students.',
      recommendation: 'Appropriate for most business communications.',
    }
  } else if (score >= 50) {
    return {
      level: 'Fairly Difficult',
      description: 'Fairly difficult to read. May require some concentration.',
      recommendation: 'Consider simplifying sentence structure and using shorter words.',
    }
  } else if (score >= 30) {
    return {
      level: 'Difficult',
      description: 'Difficult to read. May require college-level education.',
      recommendation: 'Simplify your writing. Use shorter sentences and more common words.',
    }
  } else {
    return {
      level: 'Very Difficult',
      description: 'Very difficult to read. Best understood by university graduates.',
      recommendation: 'Strongly consider simplifying. Break up long sentences and replace complex words with simpler alternatives.',
    }
  }
}

// Get recommendations based on metrics
export function getReadabilityRecommendations(metrics: ReadabilityMetrics): string[] {
  const recommendations: string[] = []
  const interpretation = interpretFleschReadingEase(metrics.fleschReadingEase)

  if (metrics.fleschReadingEase < 60) {
    recommendations.push(interpretation.recommendation)
  }

  if (metrics.averageWordsPerSentence > 20) {
    recommendations.push('Consider breaking up long sentences. Aim for 15-20 words per sentence for better readability.')
  }

  if (metrics.averageWordsPerSentence < 8) {
    recommendations.push('Your sentences are quite short. Consider combining some ideas for better flow.')
  }

  if (metrics.totalWords < 50) {
    recommendations.push('Your response is quite brief. Consider adding more detail to fully address the key points.')
  }

  if (metrics.totalWords > 500) {
    recommendations.push('Your response is quite long. Consider condensing while maintaining key information.')
  }

  if (metrics.fleschKincaidGrade > 12) {
    recommendations.push('The reading level is quite high. Consider using simpler language to improve accessibility.')
  }

  return recommendations
}


