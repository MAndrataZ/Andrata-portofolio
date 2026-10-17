export const projects = [
  {
    slug: 'rag-thesis',
    title: 'RAG [FILL: thesis topic]',
    tagline: '[FILL: problem + method + result in 20 words or fewer]',
    category: 'ai-llm',
    tags: ['RAG', 'NLP'],
    type: 'Thesis',
    year: 2026,
    status: 'shipped',
    featured: true,
    featuredRank: 1,
    role: 'Solo developer',
    cover: 'projects/rag-thesis/cover.webp',
    stack: ['Python', 'LangChain', '[FILL]'],
    metrics: [
      { label: 'Faithfulness', value: '[FILL]' },
      { label: 'Answer relevancy', value: '[FILL]' },
    ],
    links: {
      github: 'https://github.com/[FILL]',
      demo: '',
      video: '',
      paper: '',
    },
    caseStudy: {
      tldr: {
        problem: '[FILL: the problem in one line]',
        approach: '[FILL: the approach in one line]',
        result: '[FILL: the result with a number]',
      },
      problem: '[FILL: who has this problem and why existing answers fall short]',
      data: '[FILL: corpus, domain, size, how it was collected and cleaned]',
      architecture: {
        image: 'projects/rag-thesis/architecture.png',
        caption: '[FILL: one sentence explaining the diagram]',
      },
      decisions: [
        {
          title: 'Chunking strategy',
          why: '[FILL: why this chunk size and overlap]',
          alternative: '[FILL: what you compared it against]',
        },
      ],
      evaluation: {
        summary: '[FILL: what was measured, on how many questions, against which baseline]',
        table: [
          { metric: 'Faithfulness', value: '[FILL]', note: '[FILL]' },
          { metric: 'Answer relevancy', value: '[FILL]', note: '[FILL]' },
        ],
      },
      limitations: '[FILL: at least two real failure cases and why they happen]',
      next: '[FILL: what you would do with more time]',
      gallery: [
        { image: 'projects/rag-thesis/shot-1.png', alt: '[FILL: describe the screenshot]' },
        { image: 'projects/rag-thesis/shot-2.png', alt: '[FILL: describe the screenshot]' },
      ],
      extraSections: [{ heading: 'Extra section', body: '[FILL: anything that does not fit above]' }],
    },
  },
  {
    // sample without caseStudy: its card will link straight to github/demo
    slug: 'radio-site-a',
    title: '[FILL: radio brand A] website',
    tagline: '[FILL: what it is and the result in 20 words or fewer]',
    category: 'web',
    tags: ['Web'],
    type: 'Internship',
    year: 2024, // [FILL]
    status: 'shipped',
    featured: false,
    featuredRank: 2,
    role: 'Web developer intern',
    stack: ['React', '[FILL]'],
    metrics: [],
    links: { github: '', demo: 'https://example.com', video: '', paper: '' },
  },
]