// Communication scenarios for Communication Test

export interface CommunicationScenario {
  id: string
  title: string
  description: string
  emailContent: string
  context: string
  expectedTone: 'professional' | 'friendly' | 'formal' | 'casual'
  keyPoints: string[]
  exampleResponse?: string
  exampleResponseNotes?: string[]
}

export const communicationScenarios: CommunicationScenario[] = [
  {
    id: 'scenario-1',
    title: 'Delayed Project Delivery',
    description: 'Respond to a client concerned about project delays',
    context: 'A client has emailed expressing concern that their project delivery will be delayed. They seem frustrated and need reassurance.',
    emailContent: `Subject: Concern about Project Timeline

Hi Team,

I noticed that the deadline for our project was supposed to be next week, but I haven't received any updates. This is becoming a concern for me as we have a hard deadline on our end.

Could someone please provide an update on the status? I need to know if we're still on track or if there will be delays.

Thanks,
Sarah Johnson`,
    expectedTone: 'professional',
    keyPoints: [
      'Acknowledge the concern',
      'Provide clear status update',
      'Offer solutions or alternatives',
      'Maintain professional and empathetic tone',
    ],
    exampleResponse: `Subject: Re: Concern about Project Timeline

Dear Sarah,

Thank you for reaching out regarding the project timeline. I understand your concern about the upcoming deadline, and I want to assure you that we are taking this matter seriously.

I wanted to provide you with a clear status update. We have encountered some unexpected technical challenges that have caused a slight delay. However, our team is working diligently to resolve these issues and get back on track.

To address your concerns, I would like to propose the following:
- We will provide you with daily status updates until the project is completed
- We are allocating additional resources to expedite the remaining work
- If needed, we can discuss prioritizing specific features to meet your critical deadline

I sincerely apologize for any inconvenience this may cause. Please know that we are committed to delivering a high-quality solution and will do everything possible to minimize the impact on your timeline.

I would appreciate the opportunity to discuss this further with you. Would you be available for a brief call this week to review the current status and next steps?

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Acknowledges the concern immediately',
      'Provides transparent status update',
      'Offers concrete solutions',
      'Maintains professional and empathetic tone',
      'Includes call-to-action for further discussion',
    ],
  },
  {
    id: 'scenario-2',
    title: 'Product Inquiry',
    description: 'Respond to a potential customer asking about product features',
    context: 'A potential customer has sent an inquiry about your company\'s product. They want to know about specific features and pricing.',
    emailContent: `Subject: Product Inquiry

Hello,

I came across your product online and I'm interested in learning more. Specifically, I'd like to know:
- Does it integrate with CRM systems?
- What are the pricing options?
- Is there a free trial available?

I'm looking to implement a solution for my team of about 10 people.

Best regards,
Mike Chen`,
    expectedTone: 'friendly',
    keyPoints: [
      'Answer all questions clearly',
      'Provide helpful information',
      'Encourage further engagement',
      'Use friendly but professional tone',
    ],
    exampleResponse: `Subject: Re: Product Inquiry

Hello Mike,

Thank you for your interest in our product! I'm excited to help you learn more about how it can benefit your team.

To answer your questions:

1. CRM Integration: Yes, our product integrates seamlessly with major CRM systems including Salesforce, HubSpot, and Microsoft Dynamics. We also offer custom integration options if you're using a different platform.

2. Pricing Options: We offer flexible pricing plans based on team size. For a team of 10 people, our Professional plan would be ideal at $99 per user per month. We also have an Enterprise plan with additional features and dedicated support.

3. Free Trial: Absolutely! We offer a 14-day free trial with full access to all features. No credit card required. You can sign up directly on our website or I can help you get started.

I think our solution would be a great fit for your team. Would you like me to schedule a brief demo so you can see it in action? I'm happy to answer any other questions you might have.

Looking forward to hearing from you!

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Answers all three questions clearly and numbered',
      'Provides specific, helpful information',
      'Uses friendly, enthusiastic tone',
      'Encourages further engagement with demo offer',
      'Maintains professional structure',
    ],
  },
  {
    id: 'scenario-3',
    title: 'Follow-up on Meeting Request',
    description: 'Follow up on a meeting request that hasn\'t been responded to',
    context: 'You sent a meeting request a week ago but haven\'t received a response. Follow up professionally.',
    emailContent: `Subject: Following up on Meeting Request

Hi John,

I hope this email finds you well. I wanted to follow up on my previous email from last week regarding a potential collaboration meeting.

I understand you're busy, but I'd love to find a time that works for both of us. Would you be available sometime next week?

Looking forward to hearing from you.

Best,
Lisa Martinez`,
    expectedTone: 'professional',
    keyPoints: [
      'Be polite and understanding',
      'Restate the purpose clearly',
      'Offer flexible options',
      'Keep it brief and professional',
    ],
    exampleResponse: `Subject: Re: Following up on Meeting Request

Dear John,

I hope this email finds you well. I wanted to follow up on my previous message from last week regarding our potential collaboration meeting.

I understand you have a busy schedule, and I want to be respectful of your time. However, I believe this meeting could be valuable for both of us as we explore potential partnership opportunities.

I wanted to offer some flexible options that might work better for you:
- We could schedule a brief 15-minute call instead of a full meeting
- I'm available next week on Tuesday, Wednesday, or Thursday afternoon
- If those times don't work, please let me know what would be more convenient for you

I'm happy to adjust my schedule to find a time that works for you. Please let me know your availability, or if you'd prefer to discuss this via email instead.

Thank you for your consideration, and I look forward to connecting with you soon.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Polite and understanding tone',
      'Clearly restates the purpose',
      'Offers multiple flexible options',
      'Keeps it brief and professional',
      'Provides alternative communication method',
    ],
  },
  {
    id: 'scenario-4',
    title: 'Customer Complaint',
    description: 'Respond to a customer complaint about service quality',
    context: 'A customer has filed a complaint about poor service quality. They are clearly upset and want a resolution.',
    emailContent: `Subject: Poor Service Experience

To Whom It May Concern,

I am writing to express my extreme disappointment with the service I received yesterday. The staff was unhelpful, and I had to wait over an hour for assistance. This is unacceptable.

I am a loyal customer and expect better treatment. I would like to know what you plan to do about this situation.

Sincerely,
Robert Thompson`,
    expectedTone: 'professional',
    keyPoints: [
      'Apologize sincerely',
      'Acknowledge the issue',
      'Explain what went wrong',
      'Offer concrete solutions or compensation',
      'Show commitment to improvement',
    ],
    exampleResponse: `Subject: Re: Poor Service Experience

Dear Mr. Thompson,

Thank you for bringing this matter to our attention. I sincerely apologize for the poor service experience you encountered yesterday. This is not the level of service we strive to provide, and I want to personally address your concerns.

I want to acknowledge the issues you mentioned:
- The unhelpful staff behavior
- The excessive wait time you experienced

This is unacceptable, and I take full responsibility. I have already discussed this incident with our management team, and we are taking immediate action to ensure this does not happen again.

As a gesture of our commitment to making this right, I would like to offer you:
- A full refund for the service you received yesterday
- A complimentary service voucher for your next visit
- A direct line to our customer service manager for any future concerns

I would appreciate the opportunity to speak with you directly to better understand what happened and ensure we can restore your confidence in our service. Would you be available for a brief call this week?

Thank you for being a loyal customer, and I hope we can earn back your trust.

Sincerely,
[Your Name]
Customer Service Manager`,
    exampleResponseNotes: [
      'Sincere apology at the beginning',
      'Acknowledges specific issues mentioned',
      'Takes responsibility',
      'Offers concrete compensation solutions',
      'Shows commitment to improvement',
      'Requests direct communication',
    ],
  },
  {
    id: 'scenario-5',
    title: 'Welcome Email to New Client',
    description: 'Create a welcome email for a new client',
    context: 'A new client has just signed up for your service. Send them a warm welcome email with important information.',
    emailContent: `Subject: Welcome to Our Service!

Hi there,

We're thrilled to have you on board! Thank you for choosing our service.

I wanted to reach out and make sure you have everything you need to get started. Our team is here to support you every step of the way.

Looking forward to working with you!

Best,
Jennifer`,
    expectedTone: 'friendly',
    keyPoints: [
      'Express enthusiasm and gratitude',
      'Provide helpful next steps',
      'Offer support',
      'Set positive expectations',
    ],
    exampleResponse: `Subject: Welcome to Our Service!

Hi there,

Welcome aboard! We're thrilled to have you join our community and excited about the opportunity to work with you.

Thank you for choosing our service. We're committed to providing you with an exceptional experience and helping you achieve your goals.

To help you get started, here are some helpful next steps:
1. Complete your profile setup in your account dashboard
2. Explore our getting started guide, which includes video tutorials
3. Join our community forum to connect with other users
4. Schedule a free onboarding session with one of our team members

Our support team is here to help you every step of the way. If you have any questions or need assistance, please don't hesitate to reach out. You can contact us via email, live chat, or schedule a call at your convenience.

We're looking forward to seeing what you'll accomplish with our service. If there's anything specific you'd like help with, just let us know!

Best regards,
[Your Name]
Customer Success Team`,
    exampleResponseNotes: [
      'Expresses enthusiasm and gratitude',
      'Provides clear, numbered next steps',
      'Offers multiple support channels',
      'Sets positive expectations',
      'Maintains friendly but professional tone',
    ],
  },
  {
    id: 'scenario-6',
    title: 'Internal Team Update',
    description: 'Send an update email to your team about an upcoming change',
    context: 'There\'s an important policy change that affects the team. Communicate this clearly and professionally.',
    emailContent: `Subject: Important Team Update

Team,

I wanted to inform you about an upcoming change to our work schedule policy. Starting next month, we'll be implementing a new flexible hours program.

I know this is short notice, so I'm happy to answer any questions you may have. Please let me know if you'd like to discuss this further.

Thanks,
David Lee`,
    expectedTone: 'professional',
    keyPoints: [
      'Be clear and direct',
      'Explain the change thoroughly',
      'Provide context if needed',
      'Offer to answer questions',
      'Maintain transparency',
    ],
    exampleResponse: `Subject: Re: Important Team Update

Team,

I wanted to follow up on the upcoming change to our work schedule policy that I mentioned earlier. Starting next month, we will be implementing a new flexible hours program.

Here are the key details about this change:
- Core hours will be from 10:00 AM to 3:00 PM, during which all team members should be available
- Outside of core hours, you can choose your start and end times based on what works best for you
- This program is designed to provide better work-life balance while maintaining team collaboration
- All existing work-from-home policies remain in effect

I understand this is short notice, and I want to make sure everyone has the information they need. I'm happy to answer any questions you may have about how this will work, how it affects your specific role, or any concerns you might have.

Please feel free to reach out to me directly, or we can schedule a team meeting to discuss this in more detail. I'm committed to ensuring a smooth transition for everyone.

Thank you for your understanding and flexibility as we implement this change.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Clear and direct communication',
      'Thoroughly explains the change with bullet points',
      'Provides context and rationale',
      'Offers to answer questions',
      'Maintains transparency and openness',
    ],
  },
  {
    id: 'scenario-7',
    title: 'Negotiation Email',
    description: 'Negotiate terms with a potential business partner',
    context: 'You need to negotiate better terms with a potential business partner. They\'ve proposed terms that don\'t quite work for your company.',
    emailContent: `Subject: Partnership Terms Discussion

Hi,

Thank you for the partnership proposal. I've reviewed the terms, and while I'm excited about the potential collaboration, I'd like to discuss a few adjustments.

The proposed revenue share seems a bit high for our initial phase. Would you be open to a tiered structure that increases as we scale?

Looking forward to finding a solution that works for both of us.

Best,
Alex`,
    expectedTone: 'professional',
    keyPoints: [
      'Express interest and appreciation',
      'Clearly state concerns or requests',
      'Propose alternatives or solutions',
      'Maintain collaborative tone',
      'Request discussion or response',
    ],
    exampleResponse: `Subject: Re: Partnership Terms Discussion

Dear [Name],

Thank you for taking the time to put together this partnership proposal. I'm genuinely excited about the potential collaboration between our companies, and I believe we can create significant value together.

After carefully reviewing the proposed terms, I wanted to discuss a few adjustments that would help make this partnership work better for both parties.

Specifically, I'd like to propose a tiered revenue share structure that starts at a lower percentage during our initial phase and gradually increases as we scale together. This approach would allow us to invest more resources upfront while ensuring you benefit proportionally as the partnership grows.

I'm confident we can find terms that work well for both of us. Would you be available for a call this week to discuss these details further? I'm flexible with timing and happy to accommodate your schedule.

I look forward to continuing this conversation and moving forward with our partnership.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Expresses genuine interest and appreciation',
      'Clearly states concerns with specific details',
      'Proposes concrete alternative solution',
      'Maintains collaborative and positive tone',
      'Requests discussion with flexible scheduling',
    ],
  },
  {
    id: 'scenario-8',
    title: 'Conflict Resolution',
    description: 'Resolve a misunderstanding with a colleague',
    context: 'There\'s been a misunderstanding with a colleague that has created tension. You need to address it professionally and find a resolution.',
    emailContent: `Subject: Clearing the Air

Hi,

I wanted to reach out about what happened in yesterday's meeting. I think there may have been some miscommunication, and I'd like to make sure we're on the same page.

I value our working relationship and want to resolve this.

Can we schedule a quick chat?

Thanks,
Jordan`,
    expectedTone: 'professional',
    keyPoints: [
      'Acknowledge the situation',
      'Take responsibility if appropriate',
      'Express desire to resolve',
      'Propose solution or discussion',
      'Maintain respectful tone',
    ],
    exampleResponse: `Subject: Re: Clearing the Air

Dear [Name],

I wanted to reach out regarding yesterday's meeting. I sense there may have been some miscommunication, and I'd like to ensure we're both on the same page moving forward.

I want to acknowledge that my comments may have come across differently than I intended, and I apologize if anything I said caused confusion or frustration. That was certainly not my intention.

I value our working relationship and the contributions you make to our team. I believe we can resolve this quickly and get back to working effectively together.

Would you be available for a brief conversation this week? I'm happy to meet at a time that works for you, whether in person or via video call. I'd like to hear your perspective and ensure we're aligned going forward.

Thank you for your understanding, and I look forward to clearing this up.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Acknowledges the situation directly',
      'Takes responsibility and apologizes if needed',
      'Expresses value for the relationship',
      'Proposes discussion with flexible options',
      'Maintains respectful and professional tone',
    ],
  },
  {
    id: 'scenario-9',
    title: 'Project Proposal',
    description: 'Propose a new project or initiative',
    context: 'You have an idea for a new project that could benefit the company. Write a proposal email to get buy-in from stakeholders.',
    emailContent: `Subject: New Project Proposal

Team,

I've been thinking about a new initiative that I believe could significantly improve our customer satisfaction scores.

The idea involves implementing a proactive customer outreach program. I think this could reduce support tickets by 30% and increase retention.

I'd love to discuss this with the team and get your feedback.

Best,
Morgan`,
    expectedTone: 'professional',
    keyPoints: [
      'Clearly explain the proposal',
      'Highlight benefits and value',
      'Provide supporting data or rationale',
      'Request feedback or discussion',
      'Show enthusiasm appropriately',
    ],
    exampleResponse: `Subject: New Project Proposal: Proactive Customer Outreach Program

Dear Team,

I wanted to share a project proposal that I believe could significantly benefit our organization and improve our customer satisfaction metrics.

I'm proposing the implementation of a proactive customer outreach program. Based on my research and analysis of our current support patterns, I believe this initiative could:
- Reduce support tickets by approximately 30% through proactive issue resolution
- Increase customer retention rates by addressing concerns before they escalate
- Improve overall customer satisfaction scores
- Create opportunities for upselling and cross-selling

The program would involve reaching out to customers at key touchpoints in their journey, offering assistance, gathering feedback, and addressing potential issues before they become problems.

I've prepared a brief presentation with more details, including implementation timeline, resource requirements, and expected ROI. I would appreciate the opportunity to discuss this proposal with the team and gather your valuable feedback.

Would you be available for a meeting next week to review this proposal in detail? I'm happy to adjust the timing to accommodate everyone's schedules.

I'm excited about the potential impact of this initiative and look forward to your thoughts.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Clearly explains the proposal with specific details',
      'Highlights concrete benefits with data points',
      'Provides supporting rationale',
      'Requests feedback and discussion',
      'Shows appropriate enthusiasm and professionalism',
    ],
  },
  {
    id: 'scenario-10',
    title: 'Feedback Request',
    description: 'Request feedback on your work or performance',
    context: 'You\'ve completed a major project and want to request feedback from your manager or team to improve your skills.',
    emailContent: `Subject: Feedback Request

Hi,

I've just wrapped up the Q4 project and I'd really appreciate your feedback on my work.

I'm always looking to improve, so any insights you can share would be valuable.

Thanks,
Taylor`,
    expectedTone: 'professional',
    keyPoints: [
      'Clearly state what you are requesting feedback on',
      'Show openness to improvement',
      'Make it easy for them to respond',
      'Express appreciation',
      'Maintain professional tone',
    ],
    exampleResponse: `Subject: Feedback Request on Q4 Project

Dear [Name],

I've recently completed the Q4 project and would greatly appreciate your feedback on my work and performance.

I'm always looking for opportunities to grow and improve, so any insights, suggestions, or observations you can share would be incredibly valuable to me. I'm particularly interested in feedback on:
- The project management approach I used
- Communication and collaboration with the team
- Areas where I could have been more effective
- Strengths I should continue to build upon

I understand you have a busy schedule, so I'm happy to receive feedback in whatever format works best for you - whether that's a brief email, a quick conversation, or a more structured review.

Thank you for taking the time to consider this request. Your guidance has been instrumental in my professional development, and I truly value your perspective.

I look forward to hearing from you when convenient.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Clearly states what feedback is requested on',
      'Shows openness to improvement with specific areas',
      'Makes it easy to respond with flexible options',
      'Expresses genuine appreciation',
      'Maintains professional and humble tone',
    ],
  },
  {
    id: 'scenario-11',
    title: 'Apology Email',
    description: 'Apologize for a mistake or oversight',
    context: 'You made an error that affected a client or colleague. Write a sincere apology email.',
    emailContent: `Subject: Apology

Hi,

I wanted to reach out and apologize for the mistake in yesterday's report. I know this caused some inconvenience, and I take full responsibility.

I've already corrected the error and sent the updated version. I'll make sure this doesn't happen again.

Sorry again,
Casey`,
    expectedTone: 'professional',
    keyPoints: [
      'Apologize sincerely and specifically',
      'Take responsibility',
      'Explain what went wrong (briefly)',
      'Describe corrective action taken',
      'Commit to prevention',
    ],
    exampleResponse: `Subject: Apology for Error in Yesterday's Report

Dear [Name],

I wanted to reach out personally to apologize for the error in yesterday's report. I understand this caused inconvenience and frustration, and I take full responsibility for the mistake.

I recognize that the incorrect data in the financial summary section may have impacted your decision-making process, and for that, I sincerely apologize.

I've already corrected the error and sent you the updated version with the accurate information. I've also implemented additional review steps to ensure this type of error doesn't occur in the future.

I understand the importance of accuracy in our work, and I'm committed to maintaining the highest standards going forward. If there's anything else I can do to address this situation or if you have any questions about the corrected report, please don't hesitate to reach out.

Thank you for your understanding, and again, I apologize for any inconvenience this may have caused.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Apologizes sincerely and specifically',
      'Takes full responsibility',
      'Briefly explains the impact',
      'Describes corrective action taken',
      'Commits to prevention and improvement',
    ],
  },
  {
    id: 'scenario-12',
    title: 'Thank You Note',
    description: 'Send a thank you email after a meeting or favor',
    context: 'Someone helped you with something important or you had a great meeting. Send a professional thank you note.',
    emailContent: `Subject: Thank You

Hi,

Just wanted to say thanks for your help with the presentation yesterday. Your insights were really helpful.

I appreciate it!

Best,
Riley`,
    expectedTone: 'friendly',
    keyPoints: [
      'Express genuine gratitude',
      'Be specific about what you are thanking them for',
      'Mention the impact or value',
      'Keep it warm but professional',
      'Offer to reciprocate if appropriate',
    ],
    exampleResponse: `Subject: Thank You for Your Help

Dear [Name],

I wanted to take a moment to express my sincere gratitude for your help with yesterday's presentation. Your insights and suggestions were incredibly valuable and made a significant difference in the final outcome.

Specifically, your feedback on the data visualization approach helped me present the information much more clearly, and the client was very impressed with that section. Your expertise and willingness to help are truly appreciated.

I'm grateful to have colleagues like you who are always willing to share their knowledge and support. If there's ever anything I can do to help you in return, please don't hesitate to ask.

Thank you again for your time and assistance. It means a lot to me.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Expresses genuine and specific gratitude',
      'Mentions specific impact or value',
      'Shows appreciation for their expertise',
      'Offers to reciprocate',
      'Maintains warm but professional tone',
    ],
  },
  {
    id: 'scenario-13',
    title: 'Meeting Summary',
    description: 'Send a summary email after an important meeting',
    context: 'You just had an important meeting with multiple stakeholders. Send a clear summary of key points, decisions, and action items.',
    emailContent: `Subject: Meeting Summary

Team,

Thanks everyone for today's meeting. Here's a quick summary:

- We decided to move forward with the new system
- Sarah will handle the implementation
- Next review is scheduled for next month

Let me know if I missed anything.

Thanks,
Sam`,
    expectedTone: 'professional',
    keyPoints: [
      'Provide clear summary of key points',
      'List decisions made',
      'Include action items with owners',
      'Mention next steps or follow-ups',
      'Invite corrections or additions',
    ],
    exampleResponse: `Subject: Meeting Summary - [Meeting Topic] - [Date]

Dear Team,

Thank you all for your participation in today's meeting. I wanted to provide a summary of our discussion and the decisions we made.

Key Points Discussed:
- Review of current project status and timeline
- Discussion of resource allocation for Q2
- Budget approval for the new initiative

Decisions Made:
- We will proceed with implementing the new system, with a target launch date of [date]
- The budget proposal was approved with minor adjustments

Action Items:
- Sarah: Lead the system implementation and provide weekly status updates (Due: [date])
- Mike: Finalize vendor contracts and coordinate delivery timeline (Due: [date])
- All: Review and provide feedback on the implementation plan by [date]

Next Steps:
- Follow-up meeting scheduled for [date] to review progress
- Status update email to be sent every Friday

Please let me know if I've missed anything or if you'd like any clarification on the action items. I'm happy to discuss further if needed.

Thank you again for your valuable contributions today.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Provides clear, organized summary',
      'Lists all key decisions made',
      'Includes specific action items with owners and deadlines',
      'Mentions next steps and follow-ups',
      'Invites corrections and maintains professional tone',
    ],
  },
  {
    id: 'scenario-14',
    title: 'Status Update',
    description: 'Provide a status update on a project or task',
    context: 'You need to send a status update to stakeholders about a project you\'re working on. Keep them informed of progress and any issues.',
    emailContent: `Subject: Project Status Update

Hi,

Quick update on the project:

We're about 60% done. Everything is on track so far. We should be finished by the end of the month as planned.

Let me know if you have questions.

Best,
Jamie`,
    expectedTone: 'professional',
    keyPoints: [
      'Provide clear status (on track, delayed, etc.)',
      'Include progress percentage or milestones',
      'Mention any issues or blockers',
      'Update timeline if needed',
      'Offer to answer questions',
    ],
    exampleResponse: `Subject: Project Status Update - [Project Name]

Dear [Name],

I wanted to provide you with a status update on the [Project Name] project.

Current Status: On Track

Progress:
- We have completed approximately 60% of the project deliverables
- Phase 2 has been successfully completed ahead of schedule
- Phase 3 is currently in progress and proceeding as planned

Key Accomplishments:
- Completed user research and requirements gathering
- Finalized technical architecture
- Begun development of core features

Timeline:
- We remain on track to meet our original deadline of [date]
- No changes to the project timeline are anticipated at this time

Potential Considerations:
- We're monitoring resource availability for the final phase
- Will provide updates if any adjustments are needed

Next Steps:
- Continue with Phase 3 development
- Weekly status updates will continue as scheduled
- Next milestone review scheduled for [date]

Please let me know if you have any questions or concerns. I'm happy to provide additional details or schedule a call to discuss any aspect of the project.

Best regards,
[Your Name]`,
    exampleResponseNotes: [
      'Provides clear status with progress percentage',
      'Includes specific accomplishments and milestones',
      'Updates timeline accurately',
      'Mentions any considerations or potential issues',
      'Offers to answer questions and provide more details',
    ],
  },
]

export function getScenarios(): CommunicationScenario[] {
  return communicationScenarios
}

export function getScenarioById(id: string): CommunicationScenario | undefined {
  return communicationScenarios.find((scenario) => scenario.id === id)
}

export function getScenariosByTone(tone: CommunicationScenario['expectedTone']): CommunicationScenario[] {
  return communicationScenarios.filter((scenario) => scenario.expectedTone === tone)
}

export function getRandomScenario(): CommunicationScenario {
  const randomIndex = Math.floor(Math.random() * communicationScenarios.length)
  return communicationScenarios[randomIndex]
}


