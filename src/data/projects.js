export const projects = [
  {
    slug: 'rag-thesis',
    title: 'Stunting QA with RAG and Qwen 2.5 7B',
    tagline:
      'Indonesian RAG system answering stunting questions from policy documents and journals; 0.85 faithfulness on 80 validated questions.',
    category: 'ai-llm',
    tags: ['RAG', 'LLM', 'NLP'],
    type: 'Thesis',
    year: 2026,
    status: 'shipped',
    featured: true,
    featuredRank: 1,
    role: 'Thesis author',
    stack: ['Python', 'LangChain', 'Qwen 2.5 7B Instruct', 'multilingual-e5-base', 'FAISS', 'RAGAS', 'Gradio'],
    metrics: [
      { label: 'Faithfulness', value: '0.85' },
      { label: 'Answer relevancy', value: '0.90' },
      { label: 'Context precision', value: '0.94' },
      { label: 'Retrieval MRR', value: '0.95' },
    ],
    links: { github: '', demo: '', video: '', paper: '' }, // [FILL]
    caseStudy: {
      tldr: {
        problem: 'Answering stunting questions in Indonesian from policy documents and scientific journals, with answers grounded in those sources.',
        approach: 'RAG pipeline with multilingual-e5-base embeddings, a FAISS index, and Qwen 2.5 7B Instruct as generator, evaluated with RAGAS on an 80-question set.',
        result: 'Context precision 0.94, answer relevancy 0.90, faithfulness 0.85, retrieval MRR 0.95; weakest on numerical questions (faithfulness 0.69).',
      },
      problem: '',
      data: 'Test set of 80 question-answer pairs across 6 question types, validated by two evaluators together with a nutrition expert (human-in-the-loop).',
      architecture: { image: 'projects/rag-thesis/architecture.webp', caption: '' },
      decisions: [],
      evaluation: {
        summary: 'RAGAS metrics on the 80-question set plus retrieval MRR. A per-question analysis shows where the system is weakest.',
        table: [
          { metric: 'Context precision', value: '0.94', note: '' },
          { metric: 'Answer relevancy', value: '0.90', note: '' },
          { metric: 'Faithfulness', value: '0.85', note: '' },
          { metric: 'Retrieval MRR', value: '0.95', note: '' },
          { metric: 'Faithfulness, numerical questions', value: '0.69', note: 'Weakest question type' },
        ],
      },
      limitations: 'Faithfulness drops to 0.69 on numerical questions, the weakest type found in the per-question analysis.',
      next: '',
      gallery: [],
      extraSections: [],
    },
  },
  {
    slug: 'jumbo-sentiment-analysis',
    title: 'Sentiment Analysis of the Film Jumbo on Twitter (X)',
    tagline:
      'Three-class Indonesian tweet sentiment pipeline; negative-class recall raised from 0.12 to 0.58 despite a 5.4% class share.',
    category: 'data-science',
    tags: ['NLP', 'Sentiment analysis', 'Imbalanced data'],
    year: 2025,
    status: 'shipped',
    featured: true,
    featuredRank: 2,
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Sastrawi', 'NLTK', 'imbalanced-learn'],
    metrics: [
      { label: 'Accuracy', value: '69%' },
      { label: 'Macro-F1', value: '0.63' },
      { label: 'Negative recall', value: '0.58' },
    ],
    links: { github: '', demo: '', video: '', paper: '' }, // [FILL]
    caseStudy: {
      tldr: {
        problem: 'Only 5.4% of 5,302 Indonesian tweets are negative, so a plain classifier detects them poorly (recall 0.12).',
        approach: 'CRISP-DM pipeline: slang normalization, Sastrawi stemming, negation handling, TF-IDF unigram-bigram features, Logistic Regression with class weights, SMOTE, RandomOverSampler, and 5-fold GridSearchCV.',
        result: 'Negative-class recall rose from 0.12 to 0.58, with 69% accuracy and macro-F1 0.63 on the test set.',
      },
      data: '5,302 Indonesian-language tweets about the film Jumbo, three sentiment classes; the negative class is 5.4% of the data.',
      evaluation: {
        summary: 'Test-set results after handling class imbalance.',
        table: [
          { metric: 'Accuracy', value: '69%', note: '' },
          { metric: 'Macro-F1', value: '0.63', note: '' },
          { metric: 'Negative-class recall', value: '0.58', note: 'Up from 0.12 before imbalance handling' },
        ],
      },
    },
  },
  {
    slug: 'face-classification-resnet50',
    title: 'Face Image Classification with ResNet50',
    tagline:
      'Three-class face classifier on 86,744 images; fine-tuned ResNet50 reaches 85.76% validation accuracy and 0.85 macro-F1.',
    category: 'data-science',
    tags: ['Computer vision', 'CNN', 'Deep learning'],
    year: 2025,
    status: 'shipped',
    featured: true,
    featuredRank: 3,
    stack: ['Python', 'PyTorch', 'OpenCV', 'Scikit-learn'],
    metrics: [
      { label: 'Validation accuracy', value: '85.76%' },
      { label: 'Macro-F1', value: '0.85' },
    ],
    links: { github: '', demo: '', video: '', paper: '' }, // [FILL]
    caseStudy: {
      tldr: {
        problem: 'A raw set of 86,744 face images with blurry samples and imbalanced classes.',
        approach: 'Laplacian-variance blur filter, Haar Cascade face detection and cropping, augmentation, WeightedRandomSampler, and two-stage fine-tuning of an ImageNet-pretrained ResNet50.',
        result: '85.76% validation accuracy and 0.85 macro-F1, about 18 points above training the final layer only.',
      },
      data: '86,744 images in three classes; 32,648 remained after blur filtering with Laplacian variance.',
      evaluation: {
        summary: 'Validation results of the two-stage fine-tuned model.',
        table: [
          { metric: 'Validation accuracy', value: '85.76%', note: '' },
          { metric: 'Macro-F1', value: '0.85', note: 'About 18 points higher than training the final layer only' },
        ],
      },
    },
  },
  {
    slug: 'heart-disease-detection',
    title: 'Early Detection of Heart Disease',
    tagline:
      'Classifier on 908 patient records with SHAP feature selection; a depth-3 decision tree reached 84.1% accuracy and 87.5% recall.',
    category: 'data-science',
    tags: ['Classification', 'SHAP', 'AutoML'],
    year: 2026,
    status: 'shipped',
    featured: false,
    featuredRank: 4,
    stack: ['Python', 'XGBoost', 'SHAP', 'MLJAR AutoML'],
    metrics: [
      { label: 'Accuracy', value: '84.1%' },
      { label: 'Recall', value: '87.5%' },
    ],
    links: { github: '', demo: '', video: '', paper: '' }, // [FILL]
    caseStudy: {
      tldr: {
        problem: 'Early detection of heart disease from 908 patient records with 11 features.',
        approach: 'SHAP-based feature selection, then Decision Tree, Random Forest, Logistic Regression, and AutoML compared.',
        result: 'Decision Tree (max_depth=3) performed best: 84.1% accuracy and 87.5% recall on the test set.',
      },
      data: '908 patient records with 11 features.',
      evaluation: {
        summary: 'Best model on the test set.',
        table: [
          { metric: 'Accuracy', value: '84.1%', note: 'Decision Tree, max_depth=3' },
          { metric: 'Recall', value: '87.5%', note: '' },
        ],
      },
    },
  },
  {
    slug: 'stunting-status-classification',
    title: 'Child Stunting Status Classification',
    tagline:
      'Four-class classifier on 92,692 records; I flag the near-perfect Random Forest score as an artifact of rule-derived labels.',
    category: 'data-science',
    tags: ['Classification', 'Health data'],
    year: 2026,
    status: 'shipped',
    featured: false,
    featuredRank: 5,
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn'],
    metrics: [
      { label: 'LogReg macro-F1', value: '0.58' },
      { label: 'RF macro-F1', value: '≈1.00' },
    ],
    links: { github: '', demo: '', video: '', paper: '' }, // [FILL]
    caseStudy: {
      tldr: {
        problem: 'Classify stunting status (four classes) for children aged 0-24 months from four basic anthropometric variables.',
        approach: 'Compared Logistic Regression and Random Forest on 92,692 records.',
        result: 'Logistic Regression macro-F1 0.58; Random Forest about 1.00, which I treat as an artifact of labels derived from z-score rules on a synthetic dataset.',
      },
      data: '92,692 records of children aged 0-24 months. The dataset is synthetic and its labels come from z-score rules.',
      evaluation: {
        summary: 'The near-perfect score is not evidence of a strong model.',
        table: [
          { metric: 'Logistic Regression, macro-F1', value: '0.58', note: '' },
          { metric: 'Random Forest, macro-F1', value: 'about 1.00', note: 'Inflated: labels derive from the same rules as the features' },
        ],
      },
      limitations: 'Because labels were derived from z-score rules on a synthetic dataset, a near-perfect score mostly shows the model recovering the rule, not generalizing to real children.',
    },
  },
]