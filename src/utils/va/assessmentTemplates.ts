// Assessment templates and question types for Skills Assessment Generator

export type QuestionType = 'multiple-choice' | 'text' | 'rating' | 'yes-no'

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: string[] // for multiple-choice
  required: boolean
  ratingScale?: 5 | 10 // for rating questions
}

export interface Assessment {
  id: string
  title: string
  description: string
  questions: Question[]
  createdAt?: string
  updatedAt?: string
}

export function createEmptyAssessment(): Assessment {
  return {
    id: generateId(),
    title: 'Untitled Assessment',
    description: '',
    questions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function createQuestion(
  type: QuestionType,
  question: string,
  required: boolean = true,
  options?: string[],
  ratingScale?: 5 | 10
): Question {
  return {
    id: generateId(),
    type,
    question,
    required,
    options: type === 'multiple-choice' ? options || ['Option 1', 'Option 2'] : undefined,
    ratingScale: type === 'rating' ? ratingScale || 5 : undefined,
  }
}

// Question templates for common VA skills
export const questionTemplates: Record<string, Question[]> = {
  'general-va-skills': [
    createQuestion('rating', 'Rate your typing speed (words per minute)', true, undefined, 10),
    createQuestion('yes-no', 'Are you comfortable working with time-sensitive deadlines?', true),
    createQuestion('multiple-choice', 'Which communication tools are you most familiar with?', true, [
      'Email only',
      'Email and Slack',
      'Email, Slack, and Teams',
      'All major platforms',
    ]),
    createQuestion('text', 'Describe your experience with customer service', true),
    createQuestion('rating', 'How would you rate your attention to detail?', true, undefined, 5),
  ],
  'data-entry': [
    createQuestion('rating', 'Rate your accuracy in data entry tasks', true, undefined, 10),
    createQuestion('yes-no', 'Have you worked with spreadsheets (Excel, Google Sheets)?', true),
    createQuestion('multiple-choice', 'Which data entry tools have you used?', true, [
      'Excel/Google Sheets',
      'CRM systems',
      'Database systems',
      'All of the above',
    ]),
    createQuestion('text', 'Describe your process for ensuring data accuracy', true),
  ],
  'email-management': [
    createQuestion('rating', 'Rate your experience with email management', true, undefined, 5),
    createQuestion('yes-no', 'Are you comfortable handling confidential information?', true),
    createQuestion('multiple-choice', 'What is your approach to email prioritization?', true, [
      'First come, first served',
      'By urgency and importance',
      'By sender priority',
      'Custom filtering system',
    ]),
    createQuestion('text', 'Describe how you handle email responses professionally', true),
  ],
  'social-media': [
    createQuestion('rating', 'Rate your experience with social media management', true, undefined, 10),
    createQuestion('yes-no', 'Have you managed business social media accounts?', true),
    createQuestion('multiple-choice', 'Which platforms are you most familiar with?', true, [
      'Facebook and Instagram',
      'LinkedIn and Twitter',
      'All major platforms',
      'Specialized platforms only',
    ]),
    createQuestion('text', 'Describe your approach to creating engaging social media content', true),
  ],
}

export function getTemplates(): Record<string, Question[]> {
  return questionTemplates
}

export function getTemplate(name: string): Question[] | undefined {
  return questionTemplates[name]
}

export function getTemplateNames(): string[] {
  return Object.keys(questionTemplates)
}

function generateId(): string {
  return `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}


