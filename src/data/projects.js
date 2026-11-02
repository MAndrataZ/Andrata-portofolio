export const projects = [
  {
    slug: 'rag-thesis',
    title: 'Stunting QA with RAG and Qwen 2.5 7B Instruct',
    tagline:
      'Indonesian RAG system answering stunting policy and health questions from official documents; 0.90 faithfulness, 0.95 retrieval MRR.',
    category: 'ai-llm',
    tags: ['RAG', 'LLM', 'NLP', 'Vector Search', 'Qwen 2.5', 'Health AI', 'LangChain', 'FAISS'],
    type: 'Thesis',
    year: 2026,
    status: 'shipped',
    featured: true,
    featuredRank: 1,
    role: 'Thesis author',
    stack: [ 'Python', 'LangChain', 'Qwen 2.5 7B Instruct', 'multilingual-e5-base', 'FAISS', 'RAGAS', 'bitsandbytes (NF4)', 'PyTorch', 'Gradio', 'OpenAI (GPT-4o-mini as Judge)', ],
    metrics: [
      { label: 'Retrieval MRR', value: '0.95' }, { label: 'Context Precision', value: '0.96' }, { label: 'Answer Relevancy', value: '0.92' }, { label: 'Faithfulness', value: '0.90' }, { label: 'Context Recall', value: '0.87' }, { label: 'Answer Correctness', value: '0.73' },
    ],
    links: { github: 'https://github.com/MAndrataZ/RAG-Stuntbot', demo: '', video: '', paper: '' }, // [FILL]
    caseStudy: {
      tldr: {
        problem: 'Indonesia faces a 19.8% national stunting prevalence in 2024, yet public health literacy remains critically low at 1.7%. Generic LLMs fail in medical QA due to severe hallucinations and lack of access to domain-specific Indonesian health policies and numerical survey data.',
        approach: 'Engineered an end-to-end RAG architecture compiling 60 official government documents and journals into 12,558 vectorized chunks via FAISS and \`multilingual-e5-base\`. Integrated NF4 4-bit quantized Qwen 2.5 7B Instruct as the generator with MMR retrieval and strict 6-block ChatML prompt constraints.',
        result: 'Evaluated on an 80-question Gold Standard dataset validated by a nutrition expert: 0.95 Retrieval MRR, 0.96 Context Precision, 0.92 Answer Relevancy, and 0.90 Faithfulness. On numerical questions, answer relevancy rose from 0.00 without retrieval to 0.94 with RAG, while faithfulness on those questions stayed the weakest at 0.69.',
      },
      problem: 'Stunting is a chronic nutritional disorder in Indonesia with a national prevalence of 19.8% (SSGI 2024). Despite heavy government intervention (Perpres No. 72/2021), public awareness is dangerously low: only 1.7% of citizens demonstrate good knowledge and attitudes regarding stunting. While Large Language Models (LLMs) offer an interactive medium to bridge this information gap, off-the-shelf generative AI models exhibit severe hallucination risks, lack temporal awareness, and struggle with low-resource Indonesian medical terminology. In health communications, hallucinated statistics or unverified medical advice can lead to real-world harm. A grounded, domain-specific retrieval-augmented system was necessary to deliver verified, evidence-based answers.',
      data: 'The Knowledge Base consists of 60 official, heterogeneous documents (PDFs, Markdown, DOCX) spanning national regulations (Perpres, Permenkes), technical guidelines (BKKBN, Kemenkes), provincial survey reports, and peer-reviewed journals across 5 credibility tiers. To benchmark performance, a Gold Standard Evaluation Dataset of 80 QA pairs was generated via Synthetic Data Generation (GPT-4o-mini) and filtered through a 2-stage Human-in-the-Loop (HITL) protocol involving a researcher and a domain expert (nutritionist) across 6 query categories: Factual (30%), Causal (22%), Procedural (18%), Multi-context (12%), Numerical (10%), and Policy (8%).',
      architecture: { image: 'projects/rag-thesis/architecture.webp', caption: '' },
      decisions: [{ title: 'NF4 4-Bit Quantization for Edge/GPU Efficiency', why: 'Quantized Qwen 2.5 7B Instruct using NormalFloat4 (NF4) 4-bit precision via bitsandbytes. This reduced the model footprint by 64.3% (from 14.2 GB FP16 to 5.1 GB) and capped peak VRAM at ~5.4 GB, allowing high-throughput local inference on a budget NVIDIA Tesla T4 GPU (16 GB VRAM) without degradation in response quality.', }, { title: 'Format-Aware Preprocessing & Row-Based Table Serialization', why: 'Raw tabular data in PDF/Excel files frequently causes vector boundary ruptures and hallucinated figures. Tabular data was converted into structured declarative narrative blocks (\`[Context: Table Header] Column: Value\`), while text was chunked using RecursiveCharacterTextSplitter (1,000 chars, 200 overlap). A 7-stage post-chunking filter (deduplication, list-context injection, short-chunk merge) yielded 12,558 clean chunks.', }, { title: 'Symmetric Prefixing & Multilingual Vector Indexing', why: 'Selected \`intfloat/multilingual-e5-base\` (768 dimensions) over monolingual models for superior Indonesian semantic coverage (MIRACL nDCG@10: 62.3). Applied strict symmetric instruction formatting (\`passage: \` for indexing, \`query: \` for retrieval) and normalized vectors in FAISS (\`IndexFlatL2\`), ensuring L2 Euclidean distances mathematically mapped to true Cosine Similarity.', }, { title: 'Maximal Marginal Relevance (MMR) Retrieval Strategy', why: 'Replaced naive k-NN search with MMR (\`k=5\`, \`fetch_k=30\`, \`lambda_mult=0.85\`). This eliminated redundant context blocks from multi-page government reports, feeding diverse and non-overlapping context windows to the generator.', }, { title: 'Strict 6-Block ChatML Prompt System Controls', why: 'Engineered a deterministic 6-block prompt enforcing strict domain boundaries, explicit temporal rules (prohibiting ambiguous phrases like "currently" or "latest"), mandatory parameter disambiguation prior to quoting numbers, and impersonal paraphrasing to prevent self-referential hallucination.', },],
      evaluation: {
        summary: 'Evaluated across 80 validated QA test cases using a hybrid framework: algorithmic MRR for retrieval accuracy and RAGAS (with GPT-4o-mini as LLM-as-a-Judge) across 5 core dimensions. Comparative analysis against a baseline generator without retrieval (No-RAG) demonstrated massive performance leaps.',
        table: [
          { metric: 'Retrieval MRR', value: '0.9469', note: '100% top-5 hit rate (90% at rank 1)' }, { metric: 'Context Precision', value: '0.9565', note: 'Minimal noise in retrieved chunks' }, { metric: 'Context Recall', value: '0.8731', note: 'High coverage of ground truth claims' }, { metric: 'Answer Relevancy (RAG)', value: '0.9223', note: 'Directly addresses user intent' }, { metric: 'Faithfulness (RAG)', value: '0.8988', note: 'Highly grounded in document context' }, { metric: 'Answer Correctness (RAG)', value: '0.7295', note: '+19.47% improvement over No-RAG' }, { metric: 'Answer Relevancy (No-RAG)', value: '0.7304', note: '20% of queries completely failed (0%)' }, { metric: 'Numerical Answer Relevancy (No-RAG)', value: '0.0000', note: 'Total failure without retrieval' }, { metric: 'Numerical Answer Relevancy (RAG)', value: '0.9442', note: 'Drastic jump from 0% to 94.42%' }, { metric: 'Faithfulness, Numerical Queries (RAG)', value: '0.6875', note: 'Primary weakness area' },
        ],
      },
      limitations: 'While RAG boosted numerical relevance from 0% to 94.42%, Faithfulness dropped to 0.6875 on numerical/statistical queries (with 2 complete failures). MMR filtering occasionally pruned short serialized table chunks, leaving context recall gaps that led the LLM to fall back on parametric knowledge for exact figures. Additionally, evaluation was limited to synthetic QA pairs and did not execute ablation or adversarial negation tests.',
      next: 'Future iterations will integrate Hybrid Search (dense vector + sparse BM25) and cross-encoder re-ranking to improve multi-context recall. Table parsing will be upgraded to Vision-Language Models (VLMs) to process complex nested tables, followed by real-world field trials with community health workers (kader posyandu).',
      gallery: [],
      extraSections: [
        {
          heading: 'Thesis title',
          body: 'Implementation of Retrieval-Augmented Generation (RAG) with the Qwen 2.5 7B Instruct generator in a stunting question-answering system.',
        },
      ],
    },
  },
  {
    slug: 'rama-fm-website',
    title: 'Rama FM Website',
    tagline:
      'New version of the station website with improved UI/UX, a better content admin panel, company-requested features, and audience analytics.',
    category: 'web',
    tags: ['Web', 'Laravel', 'React'],
    type: 'Internship',
    year: 2025,
    status: 'shipped',
    featured: true,
    featuredRank: 2,
    role: 'Lead developer (internship)',
    cover: 'projects/rama-fm/cover.png',
    coverStyle: 'browser',
    stack: ['Laravel', 'Inertia', 'React'],
    metrics: [],
    links: { github: '', demo: 'https://ramafm.com/', video: '', paper: '' },
    caseStudy: {
      tldr: {
        problem: 'The company needed a new version of its radio website: better UI/UX, easier content management in the admin panel, and features the previous version did not have.',
        approach: 'Led development in Laravel, Inertia, and React: system architecture, UI/UX improvements, admin content management, the sections and features the company requested, and an analytics panel.',
        result: 'Live at ramafm.com, with an analytics panel showing visitors and radio listeners per period and the views of every published article.',
      },
      extraSections: [
        {
          heading: 'What changed from the previous version',
          body: 'UI and UX: a refreshed interface and navigation.\n\nContent management: an improved admin panel so the team can publish and manage content more easily.\n\nNew features and sections: the additions the company asked for that the previous version did not have.\n\nAnalytics: a panel showing website visitors and radio listeners over a chosen period, plus the number of views on each published article.',
        },
        {
          heading: 'My role',
          body: 'I led development and was the main technical liaison for stakeholders: I coordinated the development team, managed schedules, translated business requirements into technical solutions, and took part in client meetings. I also worked with the marketing division to position the site as a promotion and branding channel.',
        },
      ],
    },
  },
  {
    slug: 'paramuda-radio-website',
    title: 'Paramuda Radio Website',
    tagline:
      'New version of the station website with improved UI/UX, a better content admin panel, company-requested features, and audience analytics.',
    category: 'web',
    tags: ['Web', 'Laravel', 'React'],
    type: 'Internship',
    year: 2025,
    status: 'shipped',
    featured: false,
    featuredRank: 3,
    role: 'Lead developer (internship)',
    cover: 'projects/paramuda-radio/cover.png',
    coverStyle: 'browser',
    stack: ['Laravel', 'Inertia', 'React'],
    metrics: [],
    links: { github: '', demo: 'https://www.paramudaradio.com/', video: '', paper: '' },
    caseStudy: {
      tldr: {
        problem: 'The company needed a new version of its radio website: better UI/UX, easier content management in the admin panel, and features the previous version did not have.',
        approach: 'Led development in Laravel, Inertia, and React: system architecture, UI/UX improvements, admin content management, the sections and features the company requested, and an analytics panel.',
        result: 'Live at paramudaradio.com, with an analytics panel showing visitors and radio listeners per period and the views of every published article.',
      },
      extraSections: [
        {
          heading: 'What changed from the previous version',
          body: 'UI and UX: a refreshed interface and navigation.\n\nContent management: an improved admin panel so the team can publish and manage content more easily.\n\nNew features and sections: the additions the company asked for that the previous version did not have.\n\nAnalytics: a panel showing website visitors and radio listeners over a chosen period, plus the number of views on each published article.',
        },
        {
          heading: 'My role',
          body: 'I led development and was the main technical liaison for stakeholders: I coordinated the development team, managed schedules, translated business requirements into technical solutions, and took part in client meetings. I also worked with the marketing division to position the site as a promotion and branding channel.',
        },
      ],
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
    links: { github: 'https://github.com/MAndrataZ/analisis_sentimen_jumbo_twitter', demo: '', video: '', paper: '' }, // [FILL]
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
    featured: false,
    featuredRank: 3,
    stack: ['Python', 'PyTorch', 'OpenCV', 'Scikit-learn'],
    metrics: [
      { label: 'Validation accuracy', value: '85.76%' },
      { label: 'Macro-F1', value: '0.85' },
    ],
    links: { github: 'https://github.com/MAndrataZ/FE_Klasifikasi_Ras', demo: '', video: '', paper: '' }, // [FILL]
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
    links: { github: 'https://github.com/MAndrataZ/deteksi-dini-penyakit-jantung', demo: '', video: '', paper: '' }, // [FILL]
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
    links: { github: 'https://github.com/MAndrataZ/stunting-classification', demo: '', video: '', paper: '' },
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
  {
    slug: 'credit-approval-bnsp',
    title: 'Credit Approval: Customer Credit Status Prediction',
    tagline:
      'Binary classifier (performing vs. non-performing) on 766 loans; CatBoost reaches 0.974 test accuracy, and an ablation shows it depends almost entirely on arrears columns.',
    category: 'data-science',
    tags: ['Classification', 'AutoML', 'Credit risk', 'Banking'],
    type: 'Certification project',
    year: 2026,
    status: 'shipped',
    featured: true,
    featuredRank: 3,
    role: 'Data scientist (BNSP Associate Data Scientist exam)',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'mljar-supervised', 'CatBoost', 'Matplotlib', 'Seaborn'],
    metrics: [
      { label: 'Test accuracy', value: '0.974' },
      { label: 'Recall (non-performing)', value: '0.982' },
      { label: 'AUC', value: '0.988' },
    ],
    links: { github: 'https://github.com/MAndrataZ/credit_approval_BNSP', demo: '', video: '', paper: '' }, // [FILL] demo
    caseStudy: {
      tldr: {
        problem: 'Classify 766 bank customers as LANCAR (performing) or MACET (non-performing) from a deliberately dirty dataset, and find out how much of the model score comes from genuinely predictive signal.',
        approach: 'Cleaned the raw data (number formats, inconsistent categories, impossible ages, outliers), split train/test before any preprocessing, selected features by correlation with the target, and trained models with mljar-supervised AutoML. Then ran an ablation removing the arrears columns.',
        result: 'CatBoost, chosen automatically by AutoML, scored 0.974 accuracy, 0.982 recall on the non-performing class, and 0.988 AUC on 154 held-out customers (majority-class baseline: 0.727). Without the arrears columns, accuracy falls to 0.766, so the model recognizes loans already in arrears rather than predicting future ones.',
      },
      problem: 'The project comes from the BNSP Associate Data Scientist competency exam, done within a few hours. The task is to classify each customer as performing or non-performing. I later rebuilt the notebook with a correct processing order and added an ablation test, because a high score alone does not show what the model is actually using. For a bank, a missed non-performing loan means lost principal and under-provisioned reserves, which is why recall on the non-performing class is the metric I prioritize.',
      data: '766 customers with 16 columns (names anonymized). 556 customers (72.6%) are non-performing and 210 (27.4%) performing, so always guessing non-performing already gives 0.727 accuracy, which I use as the baseline. The data is intentionally messy: five money columns were read as text because of comma decimals, gender had six spellings for two categories, 27 ages fell outside 17-80 (from -7,162 to 1,043), a few columns had missing values, loan amounts reached 228.7 million against a median of 1.5 million, and 3 balances were negative. The customer name (an ID) and the loan type column (constant at 100) were dropped. The split is 612 train and 154 test rows, stratified with random_state=42.',
      decisions: [
        {
          title: 'Split first, then preprocess',
          why: 'In the original exam notebook, imputation, capping, feature selection, and scaling happened before the split, which leaks test information. In the rebuilt version, the data is split first, and every statistic (medians, modes, IQR bounds, feature list, scaler parameters) is computed on the training set only and then applied to the test set. The customer name column, which had been encoded and even selected as a feature, was also removed.',
        },
        {
          title: 'Rule-based cleaning for impossible values',
          why: 'Ages outside 17-80 were blanked and imputed with the training median instead of being clipped, since clipping an age of -7,162 to a boundary would invent data. Missing numeric values use the median and codes use the mode. Extreme amounts and negative balances are capped at the IQR bounds of the training data.',
        },
        {
          title: 'Correlation-based feature selection',
          why: 'Kept features with an absolute correlation of at least 0.1 with the target, which reduced 13 features to 8. Principal arrears has the strongest correlation with non-performing status (0.52), followed by interest arrears, guarantor class, and the col column (0.31 to 0.34). Loan amount and monthly installment correlate weakly and negatively (about -0.25 and -0.28).',
        },
        {
          title: 'AutoML with mljar-supervised',
          why: 'Used Explain mode with a 300-second budget and accuracy as the metric. Validation accuracy: CatBoost and Ensemble 0.987, XGBoost and Random Forest 0.967, Linear 0.961, Decision Tree and Extra Trees 0.954, Neural Network 0.941, Nearest Neighbors 0.935, baseline 0.725. CatBoost and Ensemble tied, and mljar picked CatBoost. LightGBM failed during training on my machine, so it is not in the comparison.',
        },
        {
          title: 'Ablation on the arrears columns',
          why: 'Ran Random Forest on three scenarios: all 8 selected features (accuracy 0.974, AUC 0.992), without col (0.974, 0.995), and without col plus both arrears columns (0.766, 0.826). Removing col changes nothing, so it carries no information beyond arrears. Removing both arrears columns leaves the model only about four points above the 0.727 baseline.',
        },
      ],
      evaluation: {
        summary: 'Test-set results on 154 held-out customers; 4 were misclassified (2 performing flagged as non-performing, 2 non-performing missed). Train-test gaps are small, so overfitting is limited.',
        table: [
          { metric: 'Accuracy', value: '0.974', note: 'Train 0.987; majority-class baseline 0.727' },
          { metric: 'Precision (non-performing)', value: '0.982', note: 'Train 0.987' },
          { metric: 'Recall (non-performing)', value: '0.982', note: 'Train 0.996; primary metric for the bank use case' },
          { metric: 'F1 (non-performing)', value: '0.982', note: 'Train 0.991' },
          { metric: 'AUC', value: '0.988', note: 'Train 0.995' },
          { metric: 'Recall (performing)', value: '0.95', note: '40 of 42 performing customers not wrongly flagged' },
          { metric: 'Accuracy without arrears columns', value: '0.766', note: 'Only about 4 points above the 0.727 baseline; AUC drops from 0.992 to 0.826' },
        ],
      },
      limitations: 'The dataset has only 766 rows from a single source and is evaluated with one train-test split, so the numbers are better read as a range. The high score mostly reflects recognizing loans that are already in arrears; arrears appear after a loan is running, so this model is not suited to approving new credit. The ablation uses one comparison model and does not separate principal arrears from interest arrears. The age range (17-80) and the treatment of negative balances are my own simple rules, and the meaning of coded columns such as col and guarantor class was not confirmed with the data owner. All findings are statistical associations, not causal effects.',
      next: 'Lower the decision threshold below 0.5 and measure how much precision is traded for recall, since the cost of a missed non-performing loan is higher than an extra review. For an actual approval model, add application-time features such as income, occupation, credit history, and installment-to-income ratio, and validate with cross-validation instead of a single split.',
      extraSections: [
        {
          heading: 'Reading the metrics from the bank side',
          body: 'Accuracy alone is misleading here because 72.7% of customers are non-performing. Precision (0.982) means that of 100 customers flagged as non-performing, about 98 truly are, so few good customers get unnecessary collection or provisioning. Recall (0.982) means about 98 of 100 non-performing loans are caught. I prioritize recall on the non-performing class because a missed bad loan costs principal and reserves, while a false flag usually costs an extra review. This rests on an assumption about relative costs; the real figures would have to come from the bank.',
        },
        {
          heading: 'What I would tell a bank',
          body: 'Arrears monitoring is the clearest early-warning signal in this data. The loan characteristics alone (amount, installment, balance, guarantor, age) are too weak to assess new applicants. The 72.6% non-performing share should be checked: either the sample was filtered to problem cases, or the portfolio itself has a serious issue. Input validation at the source (impossible ages, six spellings of gender, negative balances, mixed number formats) would remove most of the manual cleaning.',
        },
        {
          heading: 'Differences from the original exam notebook',
          body: 'Customer name removed instead of encoded as a feature. Data split before imputation, capping, selection, and scaling. Impossible ages blanked and imputed instead of IQR-clipped. Stratified split instead of a random one. Added the ablation without arrears columns. Test accuracy moved from 0.9675 to 0.974, which equals one prediction out of 154 on a different split, so I do not count it as a model improvement; what changed is how the result was obtained.',
        },
      ],
    },
  },
]