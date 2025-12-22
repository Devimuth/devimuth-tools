// Basic client-side grammar checking utilities

export interface GrammarError {
  type: 'spelling' | 'grammar' | 'punctuation' | 'capitalization'
  message: string
  position?: number
  suggestion?: string
}

interface GrammarRule {
  pattern: RegExp
  type: 'spelling' | 'grammar' | 'punctuation' | 'capitalization'
  message: string
  fix: (text: string) => string
  shouldCheck?: (text: string, match: string, position: number) => boolean
}

export interface ToneAnalysis {
  tone: 'professional' | 'friendly' | 'formal' | 'casual' | 'mixed'
  score: number
  keywords: string[]
  suggestions: string[]
}

// Common spelling mistakes (basic dictionary)
const commonWords = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
  'email', 'please', 'thank', 'you', 'hello', 'hi', 'regards', 'sincerely',
])

// Basic grammar rules (regex patterns)
const grammarRules: GrammarRule[] = [
  {
    // Check for lowercase "I" as pronoun (exclude abbreviations like "i.e.")
    pattern: /\bi\s+[a-z]/g,
    type: 'capitalization' as const,
    message: 'Pronoun "I" should be capitalized',
    fix: (text: string) => text.replace(/\bi\s+([a-z])/g, 'I $1'),
  },
  {
    // Check for lowercase after period, but exclude:
    // - Email addresses (contains @)
    // - URLs (www. or http://)
    // - Decimal numbers (digits before and after)
    // - Common abbreviations (e.g., i.e., etc.)
    pattern: /\.\s*[a-z]/g,
    type: 'capitalization' as const,
    message: 'First letter after period should be capitalized',
    fix: (text: string) => text.replace(/\.\s*([a-z])/g, (_match, letter) => `. ${letter.toUpperCase()}`),
    // Additional check function to exclude false positives
    shouldCheck: (text: string, match: string, position: number): boolean => {
      const before = text.substring(Math.max(0, position - 10), position)
      const after = text.substring(position, Math.min(text.length, position + match.length + 10))
      const context = before + match + after
      
      // Exclude email addresses
      if (context.includes('@')) return false
      // Exclude URLs
      if (context.includes('www.') || context.includes('http://') || context.includes('https://')) return false
      // Exclude decimal numbers
      if (/\d\.\s*\d/.test(context)) return false
      // Exclude common abbreviations
      if (/\b(e\.g\.|i\.e\.|etc\.|vs\.|Mr\.|Mrs\.|Dr\.|Prof\.)/i.test(context)) return false
      
      return true
    },
  },
  {
    // Match 2+ consecutive spaces/tabs but exclude newlines to avoid flagging email line breaks
    pattern: /[^\S\n]{2,}/g,
    type: 'punctuation' as const,
    message: 'Multiple spaces found',
    fix: (text: string) => text.replace(/[^\S\n]{2,}/g, ' '),
  },
  {
    // Space before punctuation (exclude colons in time formats like "3:30")
    pattern: /\s+([,.!?;:])/g,
    type: 'punctuation' as const,
    message: 'Space before punctuation',
    fix: (text: string) => text.replace(/\s+([,.!?;:])/g, '$1'),
    shouldCheck: (text: string, match: string, position: number): boolean => {
      // Allow space before colon in certain contexts (e.g., "at 3:30" is fine)
      if (match.includes(':')) {
        const before = text.substring(Math.max(0, position - 5), position)
        // Allow if it's a time format (digit before colon)
        if (/\d\s*:$/.test(before + match)) return false
      }
      return true
    },
  },
  {
    // Missing space after punctuation (exclude email addresses and URLs)
    pattern: /([,.!?;:])([a-zA-Z])/g,
    type: 'punctuation' as const,
    message: 'Missing space after punctuation',
    fix: (text: string) => text.replace(/([,.!?;:])([a-zA-Z])/g, '$1 $2'),
    shouldCheck: (text: string, match: string, position: number): boolean => {
      const before = text.substring(Math.max(0, position - 10), position)
      const after = text.substring(position, Math.min(text.length, position + match.length + 10))
      const context = before + match + after
      
      // Exclude email addresses
      if (context.includes('@')) return false
      // Exclude URLs
      if (context.includes('www.') || context.includes('http://') || context.includes('https://')) return false
      // Exclude time formats (e.g., "3:30pm")
      if (/\d:\d+[a-z]/i.test(context)) return false
      
      return true
    },
  },
]

export function checkGrammar(text: string): GrammarError[] {
  const errors: GrammarError[] = []
  
  if (!text || text.trim().length === 0) {
    return errors
  }

  // Check grammar rules
  grammarRules.forEach((rule) => {
    // Use exec to find all matches with positions
    let match: RegExpExecArray | null
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags)
    const processedPositions = new Set<number>()
    
    while ((match = regex.exec(text)) !== null) {
      const position = match.index
      const matchText = match[0]
      
      // Skip if we've already processed this position (avoid duplicates)
      if (processedPositions.has(position)) {
        continue
      }
      processedPositions.add(position)
      
      // Use shouldCheck if available to filter false positives
      if (rule.shouldCheck && !rule.shouldCheck(text, matchText, position)) {
        continue
      }
      
      errors.push({
        type: rule.type,
        message: rule.message,
        position,
        suggestion: rule.fix(text).substring(Math.max(0, position - 10), position + matchText.length + 10),
      })
    }
  })

  // Basic spelling check (simple word matching - very basic)
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter((w) => w.length > 0)
  words.forEach((word) => {
    // Only check words longer than 2 characters that aren't in common words
    if (word.length > 2 && !commonWords.has(word) && !word.match(/^\d+$/)) {
      // This is a very basic check - in a real implementation, you'd use a proper dictionary
      // For now, we'll skip this or flag only obvious issues
    }
  })

  return errors
}

export function checkSpelling(text: string): GrammarError[] {
  // This is a placeholder - real spelling check would require a dictionary
  // For client-side, you could bundle a small dictionary or use heuristics
  const errors: GrammarError[] = []
  
  // Very basic spelling heuristics
  const words = text.split(/\s+/)
  for (const word of words) {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '')
    
    // Check for common typos (very limited)
    const commonTypos: Record<string, string> = {
      'teh': 'the',
      'adn': 'and',
      'taht': 'that',
      'recieve': 'receive',
      'seperate': 'separate',
      'occured': 'occurred',
    }
    
    if (commonTypos[cleanWord]) {
      errors.push({
        type: 'spelling',
        message: `Possible typo: "${word}" should be "${commonTypos[cleanWord]}"`,
        position: text.indexOf(word),
        suggestion: commonTypos[cleanWord],
      })
    }
  }
  
  return errors
}

export function analyzeTone(text: string): ToneAnalysis {
  const lowerText = text.toLowerCase()
  
  // Professional structure indicators (40% weight)
  const professionalIndicators = {
    // Formal greetings
    formalGreetings: /\b(dear|hello|greetings|good (morning|afternoon|evening))\b/i,
    // Formal closings
    formalClosings: /\b(sincerely|regards|best regards|respectfully|yours truly|yours sincerely)\b/i,
    // Email structure patterns
    emailStructure: /subject:|dear|hello|greetings|to whom it may concern/i,
    // Professional phrases
    professionalPhrases: /\b(i wanted to|i would like to|please let me|i hope this|i am writing|i wanted to inform|please let me know|i would appreciate)\b/i,
    // Structured format (has greeting and closing)
    hasStructure: /(dear|hello|greetings|to whom).*?(sincerely|regards|best|thanks|thank you)/is,
  }
  
  // Calculate professional structure score (40% weight)
  let professionalStructureScore = 0
  if (professionalIndicators.formalGreetings.test(text)) professionalStructureScore += 3
  if (professionalIndicators.formalClosings.test(text)) professionalStructureScore += 3
  if (professionalIndicators.emailStructure.test(text)) professionalStructureScore += 2
  if (professionalIndicators.professionalPhrases.test(text)) professionalStructureScore += 2
  if (professionalIndicators.hasStructure.test(text)) professionalStructureScore += 2
  
  // Keywords for different tones (40% weight)
  const professionalKeywords = ['respectfully', 'sincerely', 'regards', 'appreciate', 'pleased', 'confirm', 'acknowledge', 'inform', 'discuss']
  const friendlyKeywords = ['happy', 'excited', 'thrilled', 'great', 'wonderful', 'awesome', 'thanks', 'hi', 'hello']
  const formalKeywords = ['pursuant', 'hereby', 'whereas', 'therefore', 'henceforth', 'aforementioned']
  const casualKeywords = ['hey', 'yeah', 'gonna', 'wanna', 'gotta', 'cool', 'nice']
  
  let professionalKeywordScore = 0
  let friendlyKeywordScore = 0
  let formalKeywordScore = 0
  let casualKeywordScore = 0
  
  const foundKeywords: string[] = []
  
  // Context-aware keyword detection
  professionalKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      professionalKeywordScore += 2
      foundKeywords.push(keyword)
    }
  })
  
  // Check for friendly keywords in professional context
  friendlyKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      // Check if keyword appears in professional phrases
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'i')
      const matches = text.match(keywordRegex)
      
      if (matches) {
        // Check context around the keyword
        const contextBefore = lowerText.substring(Math.max(0, lowerText.indexOf(keyword) - 20), lowerText.indexOf(keyword))
        const contextAfter = lowerText.substring(lowerText.indexOf(keyword) + keyword.length, Math.min(lowerText.length, lowerText.indexOf(keyword) + keyword.length + 20))
        
        // Professional phrases that contain friendly words
        const professionalContexts = [
          'happy to', 'happy to answer', 'happy to help', 'happy to discuss',
          'thanks for', 'thanks in advance', 'thank you for',
          'great to', 'great to hear', 'great opportunity',
        ]
        
        const isInProfessionalContext = professionalContexts.some(ctx => 
          contextBefore.includes(ctx) || contextAfter.includes(ctx) || 
          lowerText.includes(ctx)
        )
        
        if (isInProfessionalContext && professionalStructureScore >= 5) {
          // Reduce friendly score when in professional context
          friendlyKeywordScore += 0.5
          professionalKeywordScore += 1 // Boost professional instead
        } else {
          friendlyKeywordScore += 2
        }
      } else {
        friendlyKeywordScore += 2
      }
      
      foundKeywords.push(keyword)
    }
  })
  
  formalKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      formalKeywordScore += 3
      foundKeywords.push(keyword)
    }
  })
  
  casualKeywords.forEach((keyword) => {
    if (lowerText.includes(keyword)) {
      casualKeywordScore += 2
      foundKeywords.push(keyword)
    }
  })
  
  // Other indicators (20% weight)
  let otherIndicatorsProfessional = 0
  let otherIndicatorsFriendly = 0
  let otherIndicatorsFormal = 0
  let otherIndicatorsCasual = 0
  
  // Check for contractions (more casual)
  if (/\b(won't|don't|can't|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't)\b/.test(lowerText)) {
    otherIndicatorsCasual += 1
  } else if (/\b(will not|do not|cannot|is not|are not)\b/.test(lowerText)) {
    otherIndicatorsFormal += 1
  }
  
  // Check for exclamation marks (more friendly/casual, but less weight if structure is professional)
  const exclamationCount = (text.match(/!/g) || []).length
  if (exclamationCount > 2) {
    if (professionalStructureScore >= 5) {
      // Reduce impact if structure is professional
      otherIndicatorsFriendly += Math.min(exclamationCount, 2)
    } else {
      otherIndicatorsFriendly += exclamationCount
    }
  }
  
  // Weighted scoring: structure (40%), keywords (40%), other indicators (20%)
  const professionalScore = (professionalStructureScore * 0.4) + (professionalKeywordScore * 0.4) + (otherIndicatorsProfessional * 0.2)
  const friendlyScore = (friendlyKeywordScore * 0.4) + (otherIndicatorsFriendly * 0.2)
  const formalScore = (formalKeywordScore * 0.4) + (otherIndicatorsFormal * 0.2)
  const casualScore = (casualKeywordScore * 0.4) + (otherIndicatorsCasual * 0.2)
  
  // Determine dominant tone
  const scores = [
    { tone: 'professional' as const, score: professionalScore },
    { tone: 'friendly' as const, score: friendlyScore },
    { tone: 'formal' as const, score: formalScore },
    { tone: 'casual' as const, score: casualScore },
  ]
  
  scores.sort((a, b) => b.score - a.score)
  
  const dominantTone = scores[0].score > 0 ? scores[0].tone : 'professional'
  const maxScore = Math.max(...scores.map((s) => s.score), 1)
  const hasMultipleHighScores = scores.filter((s) => s.score >= maxScore * 0.7).length > 1
  
  const suggestions: string[] = []
  
  if (dominantTone === 'casual' && text.length > 100) {
    suggestions.push('Consider using a more professional tone for business communications')
  }
  
  if (lowerText.includes('u ') || lowerText.includes(' ur ') || lowerText.includes(' lol ')) {
    suggestions.push('Avoid text message abbreviations in professional emails')
  }
  
  if (exclamationCount > 3 && professionalStructureScore < 5) {
    suggestions.push('Consider reducing the number of exclamation marks for a more professional tone')
  }
  
  return {
    tone: hasMultipleHighScores ? 'mixed' : dominantTone,
    score: maxScore,
    keywords: foundKeywords,
    suggestions,
  }
}

export function checkGrammarAndSpelling(text: string): GrammarError[] {
  return [...checkGrammar(text), ...checkSpelling(text)]
}

