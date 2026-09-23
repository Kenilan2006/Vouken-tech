export type Service = {
  slug: string
  number: string
  name: string
  summary: string
  outcomes: string[]
}

export type PublicContentItem = {
  id: string
  slug: string
  title: string
  summary?: string
  updatedAt?: string
  number?: string
  outcomes?: string[]
}

/**
 * Static launch services — the fallback content for the admin-managed
 * `Services` collection. Slugs are stable identifiers: detail routes,
 * `serviceMeta` and admin records resolve through them, so they must not
 * change once published.
 */
export const services: Service[] = [
  {
    slug: 'ai-workflow-automation',
    number: '01',
    name: 'AI & Workflow Automation',
    summary: 'Automate repetitive operations and connect the systems your business already uses.',
    outcomes: [
      'Workflow automation',
      'AI-assisted operations',
      'Tool integrations',
    ],
  },
  {
    slug: 'ai-agents',
    number: '02',
    name: 'AI Agents',
    summary: 'Deploy AI agents that reason, act and assist across the processes your team runs every day.',
    outcomes: [
      'Agent design',
      'Reasoning workflows',
      'Assistant integrations',
    ],
  },
  {
    slug: 'digital-products',
    number: '03',
    name: 'Digital Products',
    summary: 'Design and engineer the websites, web applications and digital platforms your business depends on.',
    outcomes: [
      'Web applications',
      'Digital platforms',
      'Product engineering',
    ],
  },
  {
    slug: 'branding-experience',
    number: '04',
    name: 'Branding & Digital Experience',
    summary: 'Create visual identities and modern digital experiences that make ambitious brands memorable.',
    outcomes: [
      'Visual identity',
      'Websites',
      'Experience design',
    ],
  },
  {
    slug: 'cloud-engineering',
    number: '05',
    name: 'Cloud & Engineering',
    summary: 'Build scalable cloud infrastructure, integrations and reliable engineering foundations.',
    outcomes: [
      'Cloud infrastructure',
      'Integrations',
      'Reliable foundations',
    ],
  },
]

export const serviceContent: PublicContentItem[] = services.map((service) => ({
  id: service.slug,
  slug: service.slug,
  title: service.name,
  summary: service.summary,
  number: service.number,
  outcomes: service.outcomes,
}))

/** Positioning pillars — used by the homepage ticker and header metadata. */
export const brandPillars = [
  'AI systems',
  'Digital products',
  'Automation',
  'Brand identity',
  'Product engineering',
  'Experience design',
  'Cloud platforms',
]

/** Where digital programmes stall. Framed as observation, never as client outcomes. */
export const terrainProblems = [
  {
    index: '01',
    title: 'Direction arrives late',
    text: 'Work begins before the destination, constraints, and decision owners are agreed—so delivery speed outruns clarity.',
  },
  {
    index: '02',
    title: 'Tooling outpaces architecture',
    text: 'Platforms, integrations, and dashboards accumulate faster than the system meant to hold them together.',
  },
  {
    index: '03',
    title: 'Technology drifts from operations',
    text: 'The software works in isolation while the people it serves keep working around it.',
  },
]

/** The route Vouken takes. Approach statements — not performance claims. */
export const terrainRoutes = [
  {
    index: '01',
    title: 'Route before build',
    text: 'We agree the destination, the trade-offs, and the next decision before committing engineering effort.',
  },
  {
    index: '02',
    title: 'One accountable team',
    text: 'Strategy, experience design, and engineering stay in the same conversation from first sketch to release.',
  },
  {
    index: '03',
    title: 'Systems that explain themselves',
    text: 'Documented architecture and legible interfaces, so your team can operate and extend the work with confidence.',
  },
]

/** Four-stage delivery narrative shared across the marketing pages. */
export const processSteps = [
  {
    index: '01',
    title: 'Conversation',
    text: 'Understand the business, problem and opportunity.',
    output: 'Shared context, priorities, success criteria',
  },
  {
    index: '02',
    title: 'Design',
    text: 'Define the experience, architecture and solution.',
    output: 'Experience, architecture, delivery plan',
  },
  {
    index: '03',
    title: 'Build',
    text: 'Engineer, integrate, test and launch.',
    output: 'Working platform, integrations, tests',
  },
  {
    index: '04',
    title: 'Evolve',
    text: 'Measure, improve and support the system as it grows.',
    output: 'Documentation, telemetry, next roadmap',
  },
]

/**
 * Capability areas Vouken designs and builds in. Deliberately directional:
 * specific platforms are chosen per engagement, so this is not a fixed stack.
 */
export const capabilityGroups = [
  {
    label: 'AI & automation',
    items: ['Applied AI', 'Decision support', 'Automation flows', 'Data pipelines'],
  },
  {
    label: 'Digital products',
    items: ['Web platforms', 'Business applications', 'Internal tools', 'Design systems'],
  },
  {
    label: 'Brand & experience',
    items: ['Brand systems', 'Interface design', 'Content structure', 'Prototyping'],
  },
  {
    label: 'Engineering',
    items: ['Architecture', 'APIs & integration', 'Cloud delivery', 'Quality engineering'],
  },
]

/**
 * Technology clusters for the "Built for the next move" section. Broad working
 * areas rather than a fixed stack — specific platforms are chosen per engagement.
 */
export const capabilityClusters = [
  {
    key: 'ai',
    label: 'AI',
    items: ['AI agents', 'Workflow automation', 'Intelligent assistants', 'LLM integrations'],
  },
  {
    key: 'digital',
    label: 'Digital',
    items: ['Websites', 'Web applications', 'Dashboards', 'Digital platforms'],
  },
  {
    key: 'engineering',
    label: 'Engineering',
    items: ['Cloud', 'APIs', 'Integrations', 'Scalable architecture'],
  },
  {
    key: 'design',
    label: 'Design',
    items: ['UX/UI', 'Design systems', 'Visual identity', 'Digital experiences'],
  },
]

/** Partnership principles used on the homepage and about page. */
export const partnershipReasons = [
  {
    index: '01',
    title: 'Route before rush',
    text: 'Align the destination, the constraints, and the decision owners before increasing delivery speed.',
  },
  {
    index: '02',
    title: 'Engineering with context',
    text: 'Every technical decision is connected to real operations, not abstract output.',
  },
  {
    index: '03',
    title: 'Exploration with accountability',
    text: 'Investigate what is next while respecting what is live today.',
  },
  {
    index: '04',
    title: 'A visible working relationship',
    text: 'Clear trade-offs, visible progress, and an explicit next step at every stage.',
  },
]

/**
 * Presentation metadata keyed by service slug. Static launch services and
 * admin-managed records alike resolve through it, with graceful fallbacks.
 */
export const serviceMeta: Record<string, { focus: string[]; note: string }> = {
  'ai-workflow-automation': {
    focus: [
      'Process mapping',
      'Workflow automation',
      'Tool integration',
    ],
    note: 'Give repetitive work back to the people it distracts.',
  },
  'ai-agents': {
    focus: [
      'Agent design',
      'Reasoning workflows',
      'Assistant integration',
    ],
    note: 'Assistance that acts, not just answers.',
  },
  'digital-products': {
    focus: [
      'Web applications',
      'Digital platforms',
      'Product engineering',
    ],
    note: 'Build the system the route requires.',
  },
  'branding-experience': {
    focus: [
      'Visual identity',
      'Websites',
      'Experience design',
    ],
    note: 'Make complex technology legible and memorable.',
  },
  'cloud-engineering': {
    focus: [
      'Cloud infrastructure',
      'Integrations',
      'Reliable foundations',
    ],
    note: 'Foundations built to carry weight.',
  },
}

/**
 * Primary navigation. Deliberately limited to the four highest-value routes so
 * the header stays uncluttered — Solutions, Innovation, Future Technology and
 * Careers remain reachable from the footer directory.
 */
export const navigation = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/projects' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
]

export const adminCollections = [
  'Services',
  'Projects',
  'Products',
  'Innovation & R&D',
  'Articles',
  'Team',
  'Enquiries',
  'Media',
  'Website Settings',
  'Administrators',
] as const

export type AdminCollection = typeof adminCollections[number]
