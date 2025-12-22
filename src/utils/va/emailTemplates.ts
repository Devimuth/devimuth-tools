// Email structure templates and helpers

export interface EmailTemplate {
  subject: string
  greeting: string
  closing: string
  structure: string[]
}

export interface EmailStructureValidation {
  hasSubject: boolean
  hasGreeting: boolean
  hasBody: boolean
  hasClosing: boolean
  hasSignature: boolean
  isValid: boolean
  suggestions: string[]
}

// Professional email templates based on tone
export const emailTemplates: Record<'professional' | 'friendly' | 'formal' | 'casual', EmailTemplate> = {
  professional: {
    subject: 'Re: [Topic]',
    greeting: 'Dear [Name],',
    closing: 'Best regards,\n[Your Name]',
    structure: [
      'Subject line (clear and concise)',
      'Professional greeting',
      'Opening paragraph (purpose)',
      'Body paragraphs (details)',
      'Closing paragraph (next steps)',
      'Professional closing',
      'Signature',
    ],
  },
  friendly: {
    subject: 'Re: [Topic]',
    greeting: 'Hi [Name],',
    closing: 'Best,\n[Your Name]',
    structure: [
      'Subject line',
      'Friendly greeting',
      'Opening (warm and engaging)',
      'Body (conversational)',
      'Closing (positive)',
      'Friendly closing',
      'Signature',
    ],
  },
  formal: {
    subject: 'Re: [Topic]',
    greeting: 'Dear [Title] [Name],',
    closing: 'Sincerely,\n[Your Name]\n[Your Title]',
    structure: [
      'Formal subject line',
      'Formal greeting with title',
      'Opening (respectful)',
      'Body (structured and detailed)',
      'Closing (respectful)',
      'Formal closing',
      'Full signature with title',
    ],
  },
  casual: {
    subject: '[Topic]',
    greeting: 'Hey [Name],',
    closing: 'Thanks,\n[Your Name]',
    structure: [
      'Simple subject',
      'Casual greeting',
      'Direct opening',
      'Body (brief)',
      'Casual closing',
      'Simple signature',
    ],
  },
}

// Get template for a specific tone
export function getTemplateForTone(tone: 'professional' | 'friendly' | 'formal' | 'casual'): EmailTemplate {
  return emailTemplates[tone]
}

// Validate email structure
export function validateEmailStructure(text: string): EmailStructureValidation {
  const lowerText = text.toLowerCase()
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0)
  
  const hasSubject = /^subject\s*:/.test(lowerText) || lines[0]?.toLowerCase().startsWith('subject:')
  const hasGreeting = /\b(dear|hello|hi|greetings|good (morning|afternoon|evening)|hey)\b/i.test(text)
  const hasBody = text.split(/\n\n/).length > 1 || text.length > 100
  const hasClosing = /\b(sincerely|regards|best regards|best|thanks|thank you|yours truly|respectfully|cheers)\b/i.test(text)
  const hasSignature = /^[a-z\s]+$/i.test(lines[lines.length - 1] || '') && lines[lines.length - 1]?.length < 50
  
  const isValid = hasSubject && hasGreeting && hasBody && hasClosing
  
  const suggestions: string[] = []
  if (!hasSubject) {
    suggestions.push('Add a clear subject line at the beginning')
  }
  if (!hasGreeting) {
    suggestions.push('Include a professional greeting (e.g., "Dear [Name]," or "Hello [Name],")')
  }
  if (!hasBody || text.length < 50) {
    suggestions.push('Expand the body of your email with more details')
  }
  if (!hasClosing) {
    suggestions.push('Add a professional closing (e.g., "Best regards," or "Sincerely,")')
  }
  if (!hasSignature) {
    suggestions.push('Include your name or signature at the end')
  }
  
  return {
    hasSubject,
    hasGreeting,
    hasBody,
    hasClosing,
    hasSignature,
    isValid,
    suggestions,
  }
}

// Generate subject line suggestions
export function generateSubjectSuggestions(scenarioTitle: string, tone: 'professional' | 'friendly' | 'formal' | 'casual'): string[] {
  const base = scenarioTitle
  
  const professionalSubjects = [
    `Re: ${base}`,
    `Regarding: ${base}`,
    `Update on ${base}`,
    `${base} - Follow-up`,
  ]
  
  const friendlySubjects = [
    `Re: ${base}`,
    `${base}`,
    `Quick update: ${base}`,
    `About ${base}`,
  ]
  
  const formalSubjects = [
    `Re: ${base}`,
    `Regarding: ${base}`,
    `In Reference To: ${base}`,
    `Formal Inquiry: ${base}`,
  ]
  
  const casualSubjects = [
    `${base}`,
    `Re: ${base}`,
    `Quick note: ${base}`,
  ]
  
  switch (tone) {
    case 'professional':
      return professionalSubjects
    case 'friendly':
      return friendlySubjects
    case 'formal':
      return formalSubjects
    case 'casual':
      return casualSubjects
  }
}

// Generate greeting suggestions
export function generateGreetingSuggestions(tone: 'professional' | 'friendly' | 'formal' | 'casual'): string[] {
  switch (tone) {
    case 'professional':
      return [
        'Dear [Name],',
        'Hello [Name],',
        'Dear Team,',
        'Hello Team,',
      ]
    case 'friendly':
      return [
        'Hi [Name],',
        'Hello [Name],',
        'Hi there,',
        'Hey [Name],',
      ]
    case 'formal':
      return [
        'Dear [Title] [Name],',
        'Dear Sir/Madam,',
        'To Whom It May Concern,',
        'Dear [Name],',
      ]
    case 'casual':
      return [
        'Hey [Name],',
        'Hi [Name],',
        'Hi there,',
      ]
  }
}

// Generate closing suggestions
export function generateClosingSuggestions(tone: 'professional' | 'friendly' | 'formal' | 'casual'): string[] {
  switch (tone) {
    case 'professional':
      return [
        'Best regards,',
        'Sincerely,',
        'Regards,',
        'Best,',
      ]
    case 'friendly':
      return [
        'Best,',
        'Thanks,',
        'Best regards,',
        'Take care,',
      ]
    case 'formal':
      return [
        'Sincerely,',
        'Respectfully,',
        'Yours truly,',
        'Best regards,',
      ]
    case 'casual':
      return [
        'Thanks,',
        'Best,',
        'Cheers,',
      ]
  }
}


