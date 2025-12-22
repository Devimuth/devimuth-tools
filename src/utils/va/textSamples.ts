// Text samples for typing test

export interface TextSample {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  text: string
  category: string
}

export const textSamples: TextSample[] = [
  // Easy samples
  {
    id: 'easy-1',
    title: 'The Quick Brown Fox',
    difficulty: 'easy',
    category: 'general',
    text: 'The quick brown fox jumps over the lazy dog. This is a simple sentence for typing practice. Typing is an important skill for virtual assistants. Practice makes perfect when it comes to typing speed and accuracy.',
  },
  {
    id: 'easy-2',
    title: 'Daily Routine',
    difficulty: 'easy',
    category: 'general',
    text: 'Good morning! I start my day by checking emails and organizing tasks. Breakfast is important for energy. Then I focus on my work schedule. Taking breaks helps me stay productive throughout the day.',
  },
  {
    id: 'easy-3',
    title: 'Friendly Greeting',
    difficulty: 'easy',
    category: 'business',
    text: 'Hello! Thank you for reaching out. I am happy to help you with your request. Please let me know if you need any additional information. I look forward to working with you.',
  },
  // Medium samples
  {
    id: 'medium-1',
    title: 'Email Follow-up',
    difficulty: 'medium',
    category: 'business',
    text: 'I am writing to follow up on our previous conversation regarding the project timeline. As discussed, we need to complete the initial phase by the end of this month. Could you please confirm if this deadline is still feasible? I would appreciate your response by Friday so we can adjust our schedule accordingly.',
  },
  {
    id: 'medium-2',
    title: 'Project Update',
    difficulty: 'medium',
    category: 'business',
    text: 'Here is an update on the current project status. We have completed approximately sixty percent of the assigned tasks. The team is making excellent progress despite some unexpected challenges. We anticipate finishing ahead of schedule if everything continues smoothly.',
  },
  {
    id: 'medium-3',
    title: 'Customer Service',
    difficulty: 'medium',
    category: 'business',
    text: 'Thank you for contacting our support team. I understand your concern about the recent order and apologize for any inconvenience caused. We are currently investigating the issue and will provide you with a resolution within twenty-four hours. Your satisfaction is our top priority.',
  },
  {
    id: 'medium-4',
    title: 'Meeting Invitation',
    difficulty: 'medium',
    category: 'business',
    text: 'You are invited to attend our quarterly business review meeting scheduled for next Tuesday at three o clock in the afternoon. The agenda includes budget discussions, team performance reviews, and strategic planning for the upcoming quarter. Please confirm your attendance by this Friday.',
  },
  // Hard samples
  {
    id: 'hard-1',
    title: 'Technical Documentation',
    difficulty: 'hard',
    category: 'technical',
    text: 'The application programming interface requires authentication using OAuth 2.0 protocol. Developers must obtain an access token through the authorization server before making API requests. The token expires after three hundred and sixty seconds, requiring periodic refresh. Error handling should include appropriate HTTP status codes and meaningful error messages for debugging purposes.',
  },
  {
    id: 'hard-2',
    title: 'Legal Notice',
    difficulty: 'hard',
    category: 'business',
    text: 'Pursuant to the terms and conditions outlined in our service agreement, any modifications to the existing contract must be submitted in writing at least thirty days prior to the proposed effective date. Both parties are required to acknowledge receipt and approval of such modifications before implementation can commence.',
  },
  {
    id: 'hard-3',
    title: 'Financial Report',
    difficulty: 'hard',
    category: 'business',
    text: 'The quarterly financial analysis indicates a significant increase in revenue compared to the previous period. Operating expenses remained relatively stable despite inflationary pressures. The net profit margin improved by approximately twelve percent. We recommend continuing the current strategic initiatives to maintain this positive trajectory.',
  },
  {
    id: 'hard-4',
    title: 'Research Summary',
    difficulty: 'hard',
    category: 'general',
    text: 'The comprehensive research study examined various factors influencing consumer behavior in the digital marketplace. Key findings suggest that user experience, pricing strategies, and brand reputation significantly impact purchasing decisions. The methodology involved surveys, interviews, and data analysis across multiple demographic segments.',
  },
  {
    id: 'hard-5',
    title: 'Professional Development',
    difficulty: 'hard',
    category: 'business',
    text: 'Continuous learning and professional development are essential for maintaining competitiveness in today\'s rapidly evolving business environment. Organizations should invest in employee training programs that align with strategic objectives while fostering innovation and adaptability. Regular skills assessments help identify areas for improvement and ensure workforce readiness.',
  },
]

export function getTextSamples(): TextSample[] {
  return textSamples
}

export function getTextSampleById(id: string): TextSample | undefined {
  return textSamples.find((sample) => sample.id === id)
}

export function getTextSamplesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): TextSample[] {
  return textSamples.filter((sample) => sample.difficulty === difficulty)
}

export function getTextSamplesByCategory(category: string): TextSample[] {
  return textSamples.filter((sample) => sample.category === category)
}

export function getRandomSample(difficulty?: 'easy' | 'medium' | 'hard'): TextSample {
  const filtered = difficulty 
    ? getTextSamplesByDifficulty(difficulty)
    : textSamples
  const randomIndex = Math.floor(Math.random() * filtered.length)
  return filtered[randomIndex]
}

// Random word generator for typing test
const commonWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their',
  'what', 'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go',
  'me', 'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
  'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think',
  'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well',
  'way', 'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most',
  'us', 'is', 'are', 'was', 'were', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must',
  'can', 'cannot', 'shall', 'ought', 'need', 'dare', 'used', 'try', 'tried', 'tries',
  'go', 'goes', 'went', 'gone', 'get', 'gets', 'got', 'gotten', 'make', 'makes',
  'made', 'take', 'takes', 'took', 'taken', 'come', 'comes', 'came', 'see', 'sees',
  'saw', 'seen', 'know', 'knows', 'knew', 'known', 'think', 'thinks', 'thought',
  'look', 'looks', 'looked', 'want', 'wants', 'wanted', 'give', 'gives', 'gave', 'given',
  'use', 'uses', 'used', 'find', 'finds', 'found', 'tell', 'tells', 'told', 'ask',
  'asks', 'asked', 'work', 'works', 'worked', 'seem', 'seems', 'seemed', 'feel', 'feels',
  'felt', 'try', 'tries', 'tried', 'leave', 'leaves', 'left', 'call', 'calls', 'called',
  'show', 'shows', 'showed', 'shown', 'move', 'moves', 'moved', 'live', 'lives', 'lived',
  'believe', 'believes', 'believed', 'bring', 'brings', 'brought', 'happen', 'happens', 'happened',
  'write', 'writes', 'wrote', 'written', 'sit', 'sits', 'sat', 'stand', 'stands', 'stood',
  'lose', 'loses', 'lost', 'pay', 'pays', 'paid', 'meet', 'meets', 'met', 'include',
  'includes', 'included', 'continue', 'continues', 'continued', 'set', 'sets', 'learn', 'learns',
  'learned', 'change', 'changes', 'changed', 'lead', 'leads', 'led', 'understand', 'understands',
  'understood', 'watch', 'watches', 'watched', 'follow', 'follows', 'followed', 'stop', 'stops',
  'stopped', 'create', 'creates', 'created', 'speak', 'speaks', 'spoke', 'spoken', 'read', 'reads',
  'allow', 'allows', 'allowed', 'add', 'adds', 'added', 'spend', 'spends', 'spent', 'grow',
  'grows', 'grew', 'grown', 'open', 'opens', 'opened', 'walk', 'walks', 'walked', 'win',
  'wins', 'won', 'offer', 'offers', 'offered', 'remember', 'remembers', 'remembered', 'love',
  'loves', 'loved', 'consider', 'considers', 'considered', 'appear', 'appears', 'appeared', 'buy',
  'buys', 'bought', 'wait', 'waits', 'waited', 'serve', 'serves', 'served', 'die', 'dies',
  'died', 'send', 'sends', 'sent', 'build', 'builds', 'built', 'stay', 'stays', 'stayed',
  'fall', 'falls', 'fell', 'fallen', 'cut', 'cuts', 'reach', 'reaches', 'reached', 'kill',
  'kills', 'killed', 'raise', 'raises', 'raised', 'pass', 'passes', 'passed', 'sell', 'sells',
  'sold', 'decide', 'decides', 'decided', 'return', 'returns', 'returned', 'explain', 'explains',
  'explained', 'wish', 'wishes', 'wished', 'fight', 'fights', 'fought', 'save', 'saves', 'saved',
]

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const punctuation = ['.', ',', '!', '?', ';', ':', '-', '(', ')', '[', ']', '{', '}', '"', "'", '/', '\\', '@', '#', '$', '%', '^', '&', '*', '+', '=']

export interface RandomWordOptions {
  wordCount: number
  includeNumbers: boolean
  includePunctuation: boolean
}

export function generateRandomWords(options: RandomWordOptions): string {
  const { wordCount, includeNumbers, includePunctuation } = options
  const words: string[] = []
  
  for (let i = 0; i < wordCount; i++) {
    // Get random word
    const randomIndex = Math.floor(Math.random() * commonWords.length)
    let word = commonWords[randomIndex]
    
    // Add number at random position (before, after, or replace character)
    if (includeNumbers && Math.random() < 0.3) {
      const num = numbers[Math.floor(Math.random() * numbers.length)]
      const position = Math.floor(Math.random() * 3)
      if (position === 0) {
        word = num + word
      } else if (position === 1) {
        word = word + num
      } else {
        const charIndex = Math.floor(Math.random() * word.length)
        word = word.slice(0, charIndex) + num + word.slice(charIndex + 1)
      }
    }
    
    // Add punctuation at end (30% chance)
    if (includePunctuation && Math.random() < 0.3) {
      const punct = punctuation[Math.floor(Math.random() * punctuation.length)]
      word = word + punct
    }
    
    words.push(word)
  }
  
  return words.join(' ')
}

export function getRandomWord(wordList?: string[]): string {
  const list = wordList || commonWords
  return list[Math.floor(Math.random() * list.length)]
}

// Quotes for typing test
export interface Quote {
  id: string
  text: string
  author?: string
  category?: string
}

export const quotes: Quote[] = [
  // Short quotes (1-10 words)
  {
    id: 'quote-1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'inspirational',
  },
  {
    id: 'quote-2',
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'business',
  },
  {
    id: 'quote-3',
    text: 'Life is what happens to you while you\'re busy making other plans.',
    author: 'John Lennon',
    category: 'life',
  },
  {
    id: 'quote-4',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'inspirational',
  },
  {
    id: 'quote-5',
    text: 'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle',
    category: 'philosophy',
  },
  {
    id: 'quote-6',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'motivational',
  },
  {
    id: 'quote-7',
    text: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    category: 'action',
  },
  {
    id: 'quote-8',
    text: 'Don\'t let yesterday take up too much of today.',
    author: 'Will Rogers',
    category: 'wisdom',
  },
  {
    id: 'quote-9',
    text: 'You become what you believe.',
    author: 'Oprah Winfrey',
    category: 'motivational',
  },
  {
    id: 'quote-10',
    text: 'Creativity is intelligence having fun.',
    author: 'Albert Einstein',
    category: 'creativity',
  },
  {
    id: 'quote-11',
    text: 'Whether you think you can or you think you can\'t, you\'re right.',
    author: 'Henry Ford',
    category: 'motivational',
  },
  {
    id: 'quote-12',
    text: 'A person who never made a mistake never tried anything new.',
    author: 'Albert Einstein',
    category: 'wisdom',
  },
  {
    id: 'quote-13',
    text: 'There are no traffic jams along the extra mile.',
    author: 'Roger Staubach',
    category: 'motivational',
  },
  {
    id: 'quote-14',
    text: 'It is never too late to be what you might have been.',
    author: 'George Eliot',
    category: 'inspirational',
  },
  {
    id: 'quote-15',
    text: 'I would rather die of passion than of boredom.',
    author: 'Vincent van Gogh',
    category: 'passion',
  },
  // Medium quotes (11-20 words)
  {
    id: 'quote-16',
    text: 'You learn more from failure than from success. Don\'t let it stop you. Failure builds character.',
    author: 'Unknown',
    category: 'motivational',
  },
  {
    id: 'quote-17',
    text: 'If you are working on something exciting that you really care about, you don\'t have to be pushed. The vision pulls you.',
    author: 'Steve Jobs',
    category: 'business',
  },
  {
    id: 'quote-18',
    text: 'People who are crazy enough to think they can change the world, are the ones who do.',
    author: 'Rob Siltanen',
    category: 'inspirational',
  },
  {
    id: 'quote-19',
    text: 'Failure will never overtake me if my determination to succeed is strong enough.',
    author: 'Og Mandino',
    category: 'motivational',
  },
  {
    id: 'quote-20',
    text: 'We may encounter many defeats but we must not be defeated.',
    author: 'Maya Angelou',
    category: 'inspirational',
  },
  {
    id: 'quote-21',
    text: 'Knowing is not enough; we must apply. Wishing is not enough; we must do.',
    author: 'Johann Wolfgang von Goethe',
    category: 'action',
  },
  {
    id: 'quote-22',
    text: 'The only limit to our realization of tomorrow will be our doubts of today.',
    author: 'Franklin D. Roosevelt',
    category: 'inspirational',
  },
  {
    id: 'quote-23',
    text: 'The person who says it cannot be done should not interrupt the person who is doing it.',
    author: 'Chinese Proverb',
    category: 'wisdom',
  },
  {
    id: 'quote-24',
    text: 'The two most important days in your life are the day you are born and the day you find out why.',
    author: 'Mark Twain',
    category: 'philosophy',
  },
  {
    id: 'quote-25',
    text: 'Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That\'s the classic entrepreneur.',
    author: 'Mohanbir Sawhney',
    category: 'business',
  },
  // Long quotes (21+ words)
  {
    id: 'quote-26',
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall. Life is full of challenges and obstacles, but it is our response to these difficulties that truly defines who we are as individuals.',
    author: 'Nelson Mandela',
    category: 'inspirational',
  },
  {
    id: 'quote-27',
    text: 'In the end, we will remember not the words of our enemies, but the silence of our friends. True friendship requires courage and the willingness to speak up when it matters most, even when it is difficult or uncomfortable.',
    author: 'Martin Luther King Jr.',
    category: 'wisdom',
  },
  {
    id: 'quote-28',
    text: 'The only person you are destined to become is the person you decide to be. Your future is not predetermined by your past or your circumstances, but rather by the choices you make today and the actions you take to create the life you want.',
    author: 'Ralph Waldo Emerson',
    category: 'philosophy',
  },
  {
    id: 'quote-29',
    text: 'Success is not just about making money or achieving fame. It is about finding fulfillment in what you do, making a positive impact on others, and living a life that is true to your values and passions. Real success comes from within.',
    author: 'Zig Ziglar',
    category: 'motivational',
  },
  {
    id: 'quote-30',
    text: 'The way to get started is to quit talking and begin doing. Many people spend too much time planning and discussing their goals without ever taking action. The most successful people are those who take the first step, even when they are not fully prepared.',
    author: 'Walt Disney',
    category: 'action',
  },
  {
    id: 'quote-31',
    text: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven\'t found it yet, keep looking.',
    author: 'Steve Jobs',
    category: 'business',
  },
  {
    id: 'quote-32',
    text: 'The future belongs to those who believe in the beauty of their dreams. Dreams are not just fantasies or wishful thinking; they are the blueprints for our future. When we believe in our dreams and take consistent action toward them, we create the life we truly desire.',
    author: 'Eleanor Roosevelt',
    category: 'inspirational',
  },
  {
    id: 'quote-33',
    text: 'It is during our darkest moments that we must focus to see the light. Adversity and challenges are not signs of failure, but rather opportunities for growth and transformation. When we face difficulties with courage and determination, we discover strengths we never knew we had.',
    author: 'Aristotle',
    category: 'philosophy',
  },
  {
    id: 'quote-34',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts. Every great achievement in history has been preceded by countless failures and setbacks. What separates successful people from others is their ability to persist in the face of adversity.',
    author: 'Winston Churchill',
    category: 'motivational',
  },
  {
    id: 'quote-35',
    text: 'The only way to do great work is to love what you do. When you are passionate about your work, it no longer feels like work. You wake up excited about the day ahead, and you find yourself constantly thinking about how to improve and innovate in your field.',
    author: 'Steve Jobs',
    category: 'business',
  },
  {
    id: 'quote-36',
    text: 'Innovation distinguishes between a leader and a follower. In today\'s rapidly changing world, those who are willing to think differently and challenge the status quo are the ones who create lasting impact. True leaders are not afraid to take risks and try new approaches.',
    author: 'Steve Jobs',
    category: 'business',
  },
  {
    id: 'quote-37',
    text: 'Life is what happens to you while you\'re busy making other plans. We often get so caught up in planning for the future that we forget to live in the present moment. The most meaningful experiences often come from unexpected places and unplanned moments.',
    author: 'John Lennon',
    category: 'life',
  },
  {
    id: 'quote-38',
    text: 'The greatest mistake you can make in life is to be continually fearing you will make one. Fear of failure often prevents us from taking the very actions that could lead to our greatest successes. We must learn to embrace failure as a teacher and stepping stone.',
    author: 'Elbert Hubbard',
    category: 'wisdom',
  },
  {
    id: 'quote-39',
    text: 'Don\'t let yesterday take up too much of today. The past is gone and cannot be changed, but the present moment is full of possibilities. Focus your energy on what you can do today to create a better tomorrow, rather than dwelling on what has already happened.',
    author: 'Will Rogers',
    category: 'wisdom',
  },
  {
    id: 'quote-40',
    text: 'People who are crazy enough to think they can change the world, are the ones who do. History is filled with individuals who were told their ideas were impossible, yet they persisted and achieved remarkable things. Never underestimate the power of determination and belief.',
    author: 'Rob Siltanen',
    category: 'inspirational',
  },
  {
    id: 'quote-41',
    text: 'Failure will never overtake me if my determination to succeed is strong enough. Success is not about never failing; it is about never giving up. Every failure brings you one step closer to success if you learn from it and keep moving forward with renewed determination.',
    author: 'Og Mandino',
    category: 'motivational',
  },
  {
    id: 'quote-42',
    text: 'We may encounter many defeats but we must not be defeated. Setbacks and challenges are inevitable in life, but they do not define us. What matters is how we respond to these difficulties and whether we have the resilience to get back up and continue moving forward.',
    author: 'Maya Angelou',
    category: 'inspirational',
  },
  {
    id: 'quote-43',
    text: 'Knowing is not enough; we must apply. Wishing is not enough; we must do. Knowledge without action is meaningless, and dreams without effort remain fantasies. The gap between where you are and where you want to be can only be bridged by taking consistent, purposeful action.',
    author: 'Johann Wolfgang von Goethe',
    category: 'action',
  },
  {
    id: 'quote-44',
    text: 'The only limit to our realization of tomorrow will be our doubts of today. Our beliefs and mindset shape our reality more than we often realize. When we let go of limiting beliefs and embrace possibility, we open ourselves up to opportunities and achievements we never thought possible.',
    author: 'Franklin D. Roosevelt',
    category: 'inspirational',
  },
  {
    id: 'quote-45',
    text: 'The person who says it cannot be done should not interrupt the person who is doing it. Negative voices and naysayers will always exist, but they should never stop you from pursuing your goals. Focus on your own progress and let your actions speak louder than words.',
    author: 'Chinese Proverb',
    category: 'wisdom',
  },
  {
    id: 'quote-46',
    text: 'There are no traffic jams along the extra mile. Going above and beyond what is expected is what separates good from great. When you consistently put in extra effort and exceed expectations, you create opportunities and build a reputation that opens doors others cannot access.',
    author: 'Roger Staubach',
    category: 'motivational',
  },
  {
    id: 'quote-47',
    text: 'It is never too late to be what you might have been. Age, circumstances, and past mistakes do not determine your future. Every day is a new opportunity to make different choices, take different actions, and become the person you have always wanted to be.',
    author: 'George Eliot',
    category: 'inspirational',
  },
  {
    id: 'quote-48',
    text: 'A person who never made a mistake never tried anything new. Mistakes are not failures; they are learning opportunities. The most successful people in history have made countless mistakes, but they used those mistakes as stepping stones to greater understanding and achievement.',
    author: 'Albert Einstein',
    category: 'wisdom',
  },
  {
    id: 'quote-49',
    text: 'The two most important days in your life are the day you are born and the day you find out why. Discovering your purpose gives meaning to everything you do. When you understand why you are here and what you are meant to contribute, every action becomes more intentional and fulfilling.',
    author: 'Mark Twain',
    category: 'philosophy',
  },
  {
    id: 'quote-50',
    text: 'Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That\'s the classic entrepreneur. Successful entrepreneurs understand that risk cannot be eliminated, but it can be managed through careful planning, market research, and the ability to adapt quickly to changing circumstances.',
    author: 'Mohanbir Sawhney',
    category: 'business',
  },
]

export function getQuotes(): Quote[] {
  return quotes
}

export type QuoteLength = 'short' | 'medium' | 'long' | 'all'

export function getQuotesByLength(length: QuoteLength): Quote[] {
  if (length === 'all') {
    return quotes
  }
  
  return quotes.filter((quote) => {
    const wordCount = quote.text.trim().split(/\s+/).filter(w => w.length > 0).length
    if (length === 'short') {
      return wordCount >= 1 && wordCount <= 10
    } else if (length === 'medium') {
      return wordCount >= 11 && wordCount <= 20
    } else if (length === 'long') {
      return wordCount >= 21
    }
    return false
  })
}

export function getRandomQuote(length?: QuoteLength): Quote {
  const filtered = length ? getQuotesByLength(length) : quotes
  if (filtered.length === 0) {
    // Fallback to all quotes if filtered list is empty
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return quotes[randomIndex]
  }
  const randomIndex = Math.floor(Math.random() * filtered.length)
  return filtered[randomIndex]
}

export function getQuoteById(id: string): Quote | undefined {
  return quotes.find((quote) => quote.id === id)
}


