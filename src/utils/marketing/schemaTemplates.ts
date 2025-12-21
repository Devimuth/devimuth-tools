/**
 * Schema.org JSON-LD templates
 */

export type SchemaType = 
  | 'Article'
  | 'Organization'
  | 'Product'
  | 'LocalBusiness'
  | 'FAQ'
  | 'BreadcrumbList'
  | 'Event'
  | 'Review'
  | 'VideoObject'
  | 'Recipe'
  | 'HowTo'
  | 'Course'
  | 'SoftwareApplication'

export interface SchemaField {
  key: string
  label: string
  type: 'text' | 'url' | 'email' | 'date' | 'number' | 'textarea'
  required?: boolean
  placeholder?: string
  help?: string
}

export const schemaFields: Record<SchemaType, SchemaField[]> = {
  Article: [
    { key: 'headline', label: 'Headline', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'author.name', label: 'Author Name', type: 'text', required: true },
    { key: 'author.url', label: 'Author URL', type: 'url' },
    { key: 'datePublished', label: 'Date Published', type: 'date', required: true },
    { key: 'dateModified', label: 'Date Modified', type: 'date' },
    { key: 'image', label: 'Image URL', type: 'url' },
    { key: 'publisher.name', label: 'Publisher Name', type: 'text' },
    { key: 'publisher.logo.url', label: 'Publisher Logo URL', type: 'url' },
  ],
  Organization: [
    { key: 'name', label: 'Organization Name', type: 'text', required: true },
    { key: 'url', label: 'Website URL', type: 'url' },
    { key: 'logo', label: 'Logo URL', type: 'url' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'address.streetAddress', label: 'Street Address', type: 'text' },
    { key: 'address.addressLocality', label: 'City', type: 'text' },
    { key: 'address.addressRegion', label: 'State/Region', type: 'text' },
    { key: 'address.postalCode', label: 'Postal Code', type: 'text' },
    { key: 'address.addressCountry', label: 'Country', type: 'text' },
    { key: 'contactPoint.telephone', label: 'Phone', type: 'text' },
    { key: 'contactPoint.email', label: 'Email', type: 'email' },
  ],
  Product: [
    { key: 'name', label: 'Product Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'image', label: 'Image URL', type: 'url' },
    { key: 'brand.name', label: 'Brand Name', type: 'text' },
    { key: 'offers.price', label: 'Price', type: 'number' },
    { key: 'offers.priceCurrency', label: 'Currency', type: 'text', placeholder: 'USD' },
    { key: 'offers.availability', label: 'Availability', type: 'text', placeholder: 'InStock' },
    { key: 'aggregateRating.ratingValue', label: 'Rating', type: 'number' },
    { key: 'aggregateRating.reviewCount', label: 'Review Count', type: 'number' },
  ],
  LocalBusiness: [
    { key: 'name', label: 'Business Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image URL', type: 'url' },
    { key: 'address.streetAddress', label: 'Street Address', type: 'text', required: true },
    { key: 'address.addressLocality', label: 'City', type: 'text', required: true },
    { key: 'address.addressRegion', label: 'State/Region', type: 'text' },
    { key: 'address.postalCode', label: 'Postal Code', type: 'text' },
    { key: 'address.addressCountry', label: 'Country', type: 'text', required: true },
    { key: 'telephone', label: 'Phone', type: 'text' },
    { key: 'priceRange', label: 'Price Range', type: 'text', placeholder: '$$' },
  ],
  FAQ: [
    { key: 'questions', label: 'Questions (one per line)', type: 'textarea', required: true, help: 'Enter questions, one per line' },
    { key: 'answers', label: 'Answers (one per line)', type: 'textarea', required: true, help: 'Enter answers, one per line' },
  ],
  BreadcrumbList: [
    { key: 'items', label: 'Breadcrumb Items (one per line, format: Name|URL)', type: 'textarea', required: true, help: 'Format: Name|URL, one per line' },
  ],
  Event: [
    { key: 'name', label: 'Event Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'endDate', label: 'End Date', type: 'date' },
    { key: 'location.name', label: 'Location Name', type: 'text' },
    { key: 'location.address.streetAddress', label: 'Street Address', type: 'text' },
    { key: 'location.address.addressLocality', label: 'City', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'url' },
  ],
  Review: [
    { key: 'itemReviewed.name', label: 'Item Name', type: 'text', required: true },
    { key: 'reviewRating.ratingValue', label: 'Rating', type: 'number', required: true, placeholder: '1-5' },
    { key: 'reviewBody', label: 'Review Text', type: 'textarea', required: true },
    { key: 'author.name', label: 'Author Name', type: 'text', required: true },
    { key: 'datePublished', label: 'Date Published', type: 'date' },
  ],
  VideoObject: [
    { key: 'name', label: 'Video Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url', required: true },
    { key: 'uploadDate', label: 'Upload Date', type: 'date', required: true },
    { key: 'contentUrl', label: 'Video URL', type: 'url', required: true },
    { key: 'duration', label: 'Duration (ISO 8601)', type: 'text', placeholder: 'PT1H30M' },
    { key: 'embedUrl', label: 'Embed URL', type: 'url' },
  ],
  Recipe: [
    { key: 'name', label: 'Recipe Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'image', label: 'Image URL', type: 'url' },
    { key: 'prepTime', label: 'Prep Time (ISO 8601)', type: 'text', placeholder: 'PT30M' },
    { key: 'cookTime', label: 'Cook Time (ISO 8601)', type: 'text', placeholder: 'PT1H' },
    { key: 'totalTime', label: 'Total Time (ISO 8601)', type: 'text', placeholder: 'PT1H30M' },
    { key: 'recipeYield', label: 'Servings', type: 'text', placeholder: '4' },
    { key: 'recipeIngredient', label: 'Ingredients (one per line)', type: 'textarea', required: true },
    { key: 'recipeInstructions', label: 'Instructions (one per line)', type: 'textarea', required: true },
    { key: 'nutrition.calories', label: 'Calories', type: 'text' },
  ],
  HowTo: [
    { key: 'name', label: 'How-To Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'step', label: 'Steps (one per line, format: Step description)', type: 'textarea', required: true, help: 'Enter each step on a new line' },
    { key: 'totalTime', label: 'Total Time (ISO 8601)', type: 'text', placeholder: 'PT1H30M' },
    { key: 'image', label: 'Image URL', type: 'url' },
  ],
  Course: [
    { key: 'name', label: 'Course Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'provider.name', label: 'Provider Name', type: 'text', required: true },
    { key: 'provider.url', label: 'Provider URL', type: 'url' },
    { key: 'courseCode', label: 'Course Code', type: 'text' },
    { key: 'educationalCredentialAwarded', label: 'Credential Awarded', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'url' },
  ],
  SoftwareApplication: [
    { key: 'name', label: 'Application Name', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'applicationCategory', label: 'Category', type: 'text', placeholder: 'Game, BusinessApplication, etc.' },
    { key: 'operatingSystem', label: 'Operating System', type: 'text', placeholder: 'Windows, macOS, iOS, Android' },
    { key: 'offers.price', label: 'Price', type: 'number' },
    { key: 'offers.priceCurrency', label: 'Currency', type: 'text', placeholder: 'USD' },
    { key: 'aggregateRating.ratingValue', label: 'Rating', type: 'number' },
    { key: 'aggregateRating.reviewCount', label: 'Review Count', type: 'number' },
    { key: 'screenshot', label: 'Screenshot URL', type: 'url' },
  ],
}

/**
 * Generate JSON-LD schema from form data
 */
export function generateSchemaMarkup(
  type: SchemaType,
  formData: Record<string, any>
): string {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  // Handle special cases
  if (type === 'FAQ') {
    const questions = formData.questions?.split('\n').filter((q: string) => q.trim()) || []
    const answers = formData.answers?.split('\n').filter((a: string) => a.trim()) || []
    
    schema.mainEntity = questions.map((question: string, index: number) => ({
      '@type': 'Question',
      name: question.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: answers[index]?.trim() || '',
      },
    }))
  } else if (type === 'BreadcrumbList') {
    const items = formData.items?.split('\n').filter((i: string) => i.trim()) || []
    schema.itemListElement = items.map((item: string, index: number) => {
      const [name, url] = item.split('|').map(s => s.trim())
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: name || item,
        item: url || '',
      }
    })
  } else if (type === 'Recipe') {
    // Handle recipe ingredients and instructions as arrays
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        if (key === 'recipeIngredient') {
          schema.recipeIngredient = value.toString().split('\n').filter((v: string) => v.trim()).map((v: string) => v.trim())
        } else if (key === 'recipeInstructions') {
          schema.recipeInstructions = value.toString().split('\n').filter((v: string) => v.trim()).map((step: string, index: number) => ({
            '@type': 'HowToStep',
            position: index + 1,
            text: step.trim(),
          }))
        } else {
          setNestedValue(schema, key, value)
        }
      }
    })
  } else if (type === 'HowTo') {
    // Handle HowTo steps
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        if (key === 'step') {
          schema.step = value.toString().split('\n').filter((v: string) => v.trim()).map((step: string, index: number) => ({
            '@type': 'HowToStep',
            position: index + 1,
            text: step.trim(),
          }))
        } else {
          setNestedValue(schema, key, value)
        }
      }
    })
  } else {
    // Handle nested fields (e.g., author.name, address.streetAddress)
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        setNestedValue(schema, key, value)
      }
    })
  }

  return JSON.stringify(schema, null, 2)
}

/**
 * Set nested object value using dot notation
 */
function setNestedValue(obj: any, path: string, value: any): void {
  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
}

/**
 * Validate JSON-LD schema
 */
export function validateSchema(schemaJson: string): { valid: boolean; error?: string; warnings?: string[] } {
  const warnings: string[] = []
  
  try {
    const schema = JSON.parse(schemaJson)
    
    if (!schema['@context']) {
      return { valid: false, error: 'Missing @context property' }
    }
    
    if (!schema['@type']) {
      return { valid: false, error: 'Missing @type property' }
    }

    if (schema['@context'] !== 'https://schema.org') {
      return { valid: false, error: '@context must be "https://schema.org"' }
    }

    // Check for required fields based on schema type
    const requiredFields = schemaFields[schema['@type'] as SchemaType]?.filter(f => f.required) || []
    const missingFields: string[] = []
    
    requiredFields.forEach(field => {
      const value = getNestedValue(schema, field.key)
      if (!value || (typeof value === 'string' && !value.trim())) {
        missingFields.push(field.label)
      }
    })
    
    if (missingFields.length > 0) {
      warnings.push(`Missing required fields: ${missingFields.join(', ')}`)
    }

    // Validate URLs
    Object.entries(schema).forEach(([key, value]) => {
      if (typeof value === 'string' && (key.includes('url') || key.includes('Url') || key.includes('image'))) {
        try {
          new URL(value)
        } catch {
          if (value.trim()) {
            warnings.push(`Invalid URL format for ${key}: ${value}`)
          }
        }
      }
    })

    return { 
      valid: true, 
      warnings: warnings.length > 0 ? warnings : undefined 
    }
  } catch (error) {
    return { 
      valid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON' 
    }
  }
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): any {
  const keys = path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }
  
  return current
}

