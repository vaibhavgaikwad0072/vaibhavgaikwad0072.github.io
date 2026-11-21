import type { SiteContent } from './types';

export const GITHUB = 'https://github.com/vaibhavgaikwad0072';

export const defaultContent: SiteContent = {
  version: 1,
  updatedAt: '2026-11-19T00:00:00.000Z',
  settings: {
    name: 'Vaibhav Gaikwad',
    shortName: 'VG',
    roles: ['AI Engineer', 'Generative AI Developer', 'Python Developer', 'Machine Learning Engineer'],
    availability: 'Open to full-time roles & select freelance work',
    location: 'Pune, India',
    email: 'vaibhavgaikwad7968@gmail.com',
    github: GITHUB,
    portfolio: 'https://vaibhavgaikwad0072.github.io',
    linkedin: 'https://www.linkedin.com/in/vaibhav-gaikwad-50a1b4257/',
    resumeUrl: '/Vaibhav_Gaikwad_Resume.pdf',
    photoUrl: '/assets/vaibhav.png',
    heroIntro: "Hello, I'm Vaibhav Gaikwad",
    heroHeading: 'Building Intelligent Digital Experiences.',
    heroDescription:
      'AI and Data Science engineer turning complex problems into practical, intelligent products — with Python, machine learning, LLMs, RAG pipelines and production-minded APIs.',
    aboutParagraph:
      "I'm Vaibhav Gaikwad, an Artificial Intelligence and Data Science graduate passionate about building practical AI-powered applications. I work with Python, Machine Learning, Generative AI, LLMs, RAG systems and API development. I enjoy transforming complex problems into useful, intelligent solutions.",
    aboutSecondary:
      "My work sits at the meeting point of data engineering and applied AI: clean data in, grounded retrieval and measurable model behaviour out. I care about systems that can explain themselves, and I document limitations instead of hiding them.",
    education: [
      {
        institution: 'Dr. D. Y. Patil Institute of Technology',
        qualification: 'B.E. in Artificial Intelligence and Data Science',
        period: 'Nov 2022 — May 2026',
        detail: 'Pune · CGPA 8.45 / 10',
      },
    ],
    certifications: [
      'AWS Cloud Practitioner Essentials · 2025',
      'Full Stack Generative & Agentic AI with Python · Udemy · 2026',
      'Data Science · CodeWithHarry · 2026',
      'SQL · Tutedude · 2026',
    ],
  },

  projects: [
    {
      id: 'healthlens',
      slug: 'healthlens',
      title: 'HealthLens',
      tagline: 'AI health risk prediction with a guideline-grounded RAG advisor.',
      summary:
        'A full-stack health risk platform covering heart disease, diabetes and cardiovascular risk, paired with a retrieval-augmented assistant that answers from 27 medical guidelines.',
      category: 'Healthcare AI',
      year: '2025 — 2026',
      status: 'Shipped',
      accent: 'rose',
      tech: ['Python', 'XGBoost', 'FastAPI', 'React', 'MongoDB', 'FAISS', 'FLAN-T5', 'Scikit-learn'],
      links: {
        github: 'https://github.com/vaibhavgaikwad0072/HealthLens---AI-Health-Prediction-RAG-Advisory-System',
      },
      problem:
        'Heart disease, diabetes and cardiovascular risk are often invisible until symptoms appear. Standalone risk calculators give a number with no explanation, while general-purpose chatbots give confident answers with no grounding in clinical guidance.',
      solution:
        'HealthLens scores user vitals with models benchmarked across four datasets, then explains risk in context with a RAG assistant whose answers are retrieved from curated medical guidelines — combining quantitative prediction with traceable guidance.',
      architecture: [
        'React front end captures vitals and renders risk results and the advisory chat.',
        'FastAPI service runs XGBoost inference and orchestrates retrieval requests.',
        'MongoDB stores user profiles, vitals snapshots and prediction history.',
        'Guideline documents are chunked, embedded and indexed in a FAISS vector store.',
        'FLAN-T5 generates an answer constrained to the retrieved guideline context.',
      ],
      features: [
        'Risk prediction for heart disease, diabetes and cardiovascular conditions.',
        'Model comparison across Logistic Regression, Random Forest and XGBoost on four datasets.',
        'XGBoost selected with SMOTE to handle class imbalance.',
        'RAG advisory chat grounded in 27 medical guidelines.',
        'Full-stack flow from vitals input to explained result.',
      ],
      outcomes: [
        { value: '0.792', label: 'Average F1 score', note: 'Across benchmarked datasets' },
        { value: '0.830', label: 'ROC-AUC', note: 'Selected XGBoost model' },
        { value: '27', label: 'Medical guidelines', note: 'Indexed for retrieval' },
      ],
      screenshots: [],
      disclaimer:
        'Educational project. Model scores come from project datasets and have not been clinically validated. HealthLens is not a medical device and does not replace professional diagnosis.',
    },
    {
      id: 'rag-teaching-assistant',
      slug: 'rag-teaching-assistant',
      title: 'RAG Teaching Assistant',
      tagline: 'Semantic search and timestamped answers across lecture video.',
      summary:
        'An AI teaching assistant that indexes lecture recordings, retrieves the most relevant segments and answers questions with the exact timestamps a student can jump to.',
      category: 'Generative AI',
      year: '2025 — 2026',
      status: 'Shipped',
      accent: 'electric',
      tech: ['Python', 'FFmpeg', 'Whisper', 'Ollama', 'bge-m3', 'llama3.2:1b', 'FAISS', 'LangChain'],
      links: {
        github: 'https://github.com/vaibhavgaikwad0072/RAG-Based-AI-Teaching-Assistant',
      },
      problem:
        'Students cannot search a two-hour lecture recording. Finding one explanation means scrubbing a timeline, and generic video summaries lose the exact moment a topic was covered.',
      solution:
        'Convert lectures into timestamped transcripts, embed them with a multilingual model, and retrieve only the segments relevant to a question. Answers cite the source timestamp so the student can verify and watch the explanation in context.',
      architecture: [
        'FFmpeg extracts audio from uploaded lecture video.',
        'Speech is transcribed into text with timestamp segments.',
        'Segments are embedded with Ollama bge-m3 and stored in a FAISS index.',
        'A LangChain retrieval flow finds the top matching lecture segments.',
        'llama3.2:1b generates a grounded answer plus the source timestamps.',
      ],
      features: [
        'Automatic audio extraction and transcription pipeline.',
        'Multilingual embeddings for semantic lecture search.',
        'Timestamped answers that link back to the exact video segment.',
        'Topic-specific summaries instead of full-lecture summarisation.',
        'Runs locally through Ollama — no external inference API required.',
      ],
      outcomes: [],
      screenshots: [],
    },
    {
      id: 'text-to-sql',
      slug: 'text-to-sql',
      title: 'Text-to-SQL Query System',
      tagline: 'Ask a database a question. Get a verified query and a straight answer.',
      summary:
        'A conversational interface that turns natural-language questions into SQL, validates and executes them, then returns structured results without the user writing a line of SQL.',
      category: 'Generative AI',
      year: '2025 — 2026',
      status: 'Shipped',
      accent: 'cyan',
      tech: ['Python', 'LangChain', 'LangGraph', 'Gemini API', 'Ollama', 'SQLite', 'MySQL', 'RAGAS'],
      links: {
        github: 'https://github.com/vaibhavgaikwad0072/Text-To-SQL',
      },
      problem:
        'Business users depend on engineers for basic database questions. Text-to-SQL demos look impressive until they hallucinate a column name, return multiple statements or quietly query the wrong table.',
      solution:
        'A schema-aware conversational pipeline that inspects the database, generates SQL, checks it before execution and explains the result. Conversation state is managed explicitly so follow-up questions keep their context.',
      architecture: [
        'Schema introspection gives the model table and column context.',
        'LangGraph coordinates intent detection, SQL generation and repair.',
        'Generated SQL is validated before it is allowed to execute.',
        'Query results are formatted into a readable, structured answer.',
        'Conversation state carries context across follow-up questions.',
      ],
      features: [
        'Natural-language to SQL across SQLite and MySQL databases.',
        'Schema-aware prompt construction for accurate table references.',
        'Validation and repair loop before query execution.',
        'Conversational follow-ups with retained context.',
        'Local Ollama and hosted Gemini modes.',
      ],
      outcomes: [
        {
          value: '~91%',
          label: 'Query accuracy',
          note: 'Self-reported during project testing — not an independent benchmark',
        },
      ],
      screenshots: [],
    },
    {
      id: 'dataguard-ai',
      slug: 'dataguard-ai',
      title: 'DataGuard AI',
      tagline: 'Data quality that explains itself, with a full audit trail.',
      summary:
        'A data-quality pipeline that profiles retail transaction data, detects missing values, duplicates and pricing anomalies, tracks recurring issues over time and uses an LLM to explain them in structured form.',
      category: 'Data Engineering',
      year: '2026',
      status: 'Shipped',
      accent: 'emerald',
      tech: ['Python', 'Pandas', 'SQLAlchemy', 'SQLite', 'LangChain', 'Groq API', 'Pydantic', 'Streamlit'],
      links: {
        github: 'https://github.com/vaibhavgaikwad0072/DataGuard-AI',
        demo: 'https://dataguard-ai-0072.streamlit.app/',
      },
      problem:
        'Bad data rarely announces itself. Missing quantities, duplicated records and pricing anomalies propagate into dashboards and models, and a one-off cleaning script destroys the evidence needed to fix the source.',
      solution:
        'Profile and validate data without mutating the raw source, persist every detected issue, measure drift between runs, and generate structured, evidence-based explanations so the team can act on findings rather than guess.',
      architecture: [
        'Retail transaction data is ingested and profiled with Pandas.',
        'Validation rules detect missing values, duplicates, invalid quantities and price anomalies.',
        'SQLAlchemy persists issues and history to SQLite while raw data stays intact.',
        'Drift detection compares quality signals across runs.',
        'Groq-powered analysis returns Pydantic-validated explanations and recommendations.',
      ],
      features: [
        'Reusable profiling and validation checks for retail transaction data.',
        'Missing-value, duplicate, invalid-quantity and pricing-anomaly detection.',
        'Raw data preserved with a separate issue history in SQLite.',
        'Automated drift detection across data-quality runs.',
        'LLM-generated explanations constrained to structured output.',
        'Streamlit interface for reviewing issues and history.',
      ],
      outcomes: [],
      screenshots: [],
    },
    {
      id: 'contextforge-ai',
      slug: 'contextforge-ai',
      title: 'ContextForge AI',
      tagline: 'Adaptive retrieval for questions a single search pass cannot answer.',
      summary:
        'An adaptive Retrieval-Augmented Generation system focused on improving contextual retrieval and response quality when queries need more than one retrieval pass.',
      category: 'RAG Research',
      year: '2026',
      status: 'In development',
      accent: 'amber',
      tech: ['RAG', 'Context Engineering', 'LLM', 'Retrieval'],
      links: {},
      problem:
        'Fixed retrieval pipelines treat every question the same way. Ambiguous, comparative or multi-hop questions fail because one similarity search cannot gather the context the answer needs.',
      solution:
        'ContextForge adapts retrieval to the query: analyse what is being asked, choose an appropriate retrieval strategy, gather and assemble context, then evaluate whether the response was actually supported by it.',
      architecture: [
        'Query analysis to classify intent and context requirements.',
        'Adaptive strategy selection per query instead of a fixed retrieval depth.',
        'Context assembly with source tracking for traceability.',
        'Response-quality evaluation against retrieved evidence.',
      ],
      features: [
        'Query-aware retrieval planning.',
        'Multi-pass context gathering for complex questions.',
        'Source traceability for assembled context.',
        'Evaluation loop for grounded response quality.',
      ],
      outcomes: [],
      screenshots: [],
      disclaimer:
        'This project is actively in development. The capabilities shown are the design direction, not shipped benchmarks.',
    },
    {
      id: 'transaction-risk-investigation',
      slug: 'transaction-risk-investigation',
      title: 'Transaction Risk Investigation',
      tagline: 'A reproducible flight simulator for transaction-fraud risk.',
      summary:
        'An end-to-end research system that generates synthetic banking data, injects known fraud patterns, validates the ledger, trains a pre-decision risk model and exposes everything in a read-only investigation dashboard.',
      category: 'Applied ML · Risk',
      year: '2026',
      status: 'Research',
      accent: 'violet',
      tech: ['Python', 'Pandas', 'scikit-learn', 'SQLite', 'Streamlit', 'pytest'],
      links: {},
      problem:
        'Real transaction data is private and regulated, confirmed fraud labels are rare, and public fraud datasets lack the account, device and transfer context needed to test a risk system honestly. Missing fraud is expensive; too many false alerts burn analyst time.',
      solution:
        'Build a safe simulator: reproducible synthetic customers, accounts and transactions; four injected fraud patterns with ground-truth labels; ledger-grade validation; a model that only sees information available before a transaction posts; and time-aware, scenario-grouped evaluation to avoid leakage.',
      architecture: [
        'Seeded generators create 100 customers, 150 accounts, 50 merchants and 200 devices.',
        'Baseline transactions and ordinary transfers establish normal ledger activity.',
        'Four labelled scenarios are injected: high-value, velocity, rapid transfer and dormant reactivation.',
        'Transaction, balance, transfer-link and label audits validate the dataset.',
        'A nine-feature scikit-learn baseline scores transactions before posting, using earlier history only.',
        'Chronological and scenario-grouped validation feed a six-page read-only Streamlit dashboard.',
      ],
      features: [
        'Reproducible synthetic data from configuration and seed.',
        'Four injected fraud patterns with auditable labels kept separate from features.',
        'Ledger reconciliation, transaction, transfer and label validation.',
        'Pre-decision scoring — no future information in features.',
        'Time-based and scenario-grouped evaluation plus independent-seed experiments.',
        'Dormant-account blind spot identified and addressed through experiments.',
        'Six-page Streamlit dashboard for transactions, alerts, model performance and system health.',
      ],
      outcomes: [
        { value: '1,090', label: 'Synthetic transactions', note: 'Verified seed dataset' },
        { value: '70', label: 'Scenario labels', note: 'Across four fraud patterns' },
        { value: '107', label: 'Tests passing', note: 'Unit and workflow suite' },
      ],
      screenshots: [],
      disclaimer:
        'Development and research system, not a production fraud platform. All evaluation is on synthetic data; results do not establish real-world performance.',
    },
  ],

  skillGroups: [
    {
      id: 'programming',
      title: 'Programming',
      blurb: 'The languages I reach for daily.',
      items: [{ name: 'Python' }, { name: 'SQL' }, { name: 'JavaScript' }, { name: 'TypeScript' }],
    },
    {
      id: 'ai-ml',
      title: 'AI / ML',
      blurb: 'Modelling, evaluation and the unglamorous data work.',
      items: [
        { name: 'Machine Learning' },
        { name: 'Scikit-learn' },
        { name: 'XGBoost' },
        { name: 'Pandas' },
        { name: 'NumPy' },
        { name: 'Deep Learning' },
      ],
    },
    {
      id: 'genai',
      title: 'Generative AI',
      blurb: 'Retrieval, orchestration and grounded generation.',
      items: [
        { name: 'LangChain' },
        { name: 'LangGraph' },
        { name: 'RAG' },
        { name: 'LLMs' },
        { name: 'Prompt Engineering' },
        { name: 'FAISS' },
        { name: 'Ollama' },
        { name: 'Gemini API' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & Data',
      blurb: 'APIs and the places data actually lives.',
      items: [
        { name: 'FastAPI' },
        { name: 'REST APIs' },
        { name: 'MySQL' },
        { name: 'SQLite' },
        { name: 'PostgreSQL' },
        { name: 'SQLAlchemy' },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & Platforms',
      blurb: 'Shipping, visualising and collaborating.',
      items: [
        { name: 'Git' },
        { name: 'GitHub' },
        { name: 'Power BI' },
        { name: 'Tableau' },
        { name: 'Streamlit' },
        { name: 'AWS', note: 'Foundational · certified' },
      ],
    },
  ],

  experience: [
    {
      id: 'itroots',
      role: 'Data Science Intern',
      org: 'ITROOTS Pvt. Ltd.',
      period: 'Feb 2026 — Jul 2026',
      location: 'Pune, India',
      mode: 'On-site · Training & internship',
      summary:
        'A six-month data science internship focused on applied machine learning, analytics and dashboard delivery — with real datasets, model evaluation and business-facing reporting.',
      bullets: [
        'Developed and deployed three Python-based machine learning models for classification and regression, reaching up to 87% prediction accuracy through preprocessing, feature engineering and validation.',
        'Built five interactive Power BI dashboards with Power Query transformations, reducing manual reporting effort by around 40%.',
        'Worked with Python, SQL, Scikit-learn, XGBoost and deep learning techniques to analyse datasets and improve model workflows.',
        'Collaborated on data preparation and validation to keep analysis reproducible and reporting trustworthy.',
      ],
      tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'Power BI', 'SQL', 'Tableau', 'OpenCV', 'TensorFlow'],
    },
  ],

  services: [
    {
      id: 'ai-chatbots',
      title: 'AI Chatbot Development',
      description:
        'Task-focused assistants that answer from your knowledge, keep context and hand off cleanly when they are not confident.',
      tech: ['Python', 'LangChain', 'LLMs', 'FastAPI'],
      icon: 'chatbot',
    },
    {
      id: 'rag-apps',
      title: 'RAG Application Development',
      description:
        'Retrieval pipelines over documents, video or databases — with chunking, embeddings, source citations and evaluation built in.',
      tech: ['FAISS', 'LangChain', 'Ollama', 'Gemini'],
      icon: 'rag',
    },
    {
      id: 'llm-integration',
      title: 'LLM Integration',
      description:
        'Add reliable language-model features to an existing product: structured outputs, guardrails, prompt design and cost-aware routing.',
      tech: ['OpenAI-compatible APIs', 'Gemini', 'Pydantic', 'Python'],
      icon: 'llm',
    },
    {
      id: 'python-automation',
      title: 'Python Automation',
      description:
        'Replace repetitive data and reporting work with scripts and pipelines that run on schedule and fail loudly when they should.',
      tech: ['Python', 'Pandas', 'REST APIs', 'SQL'],
      icon: 'automation',
    },
    {
      id: 'ml-solutions',
      title: 'Machine Learning Solutions',
      description:
        'From problem framing and data preparation to model comparison, honest validation and a deployable prediction service.',
      tech: ['Scikit-learn', 'XGBoost', 'Pandas', 'FastAPI'],
      icon: 'ml',
    },
    {
      id: 'analytics-dashboards',
      title: 'Data Analytics Dashboards',
      description:
        'Dashboards that answer specific questions: clean models, useful visuals and a clear path from raw data to decision.',
      tech: ['Power BI', 'Tableau', 'Streamlit', 'SQL'],
      icon: 'dashboard',
    },
    {
      id: 'fastapi-backend',
      title: 'FastAPI Backend Development',
      description:
        'Typed, documented APIs for AI features — authentication boundaries, validation, sensible errors and clear contracts.',
      tech: ['FastAPI', 'Pydantic', 'PostgreSQL', 'SQLAlchemy'],
      icon: 'backend',
    },
    {
      id: 'text-to-sql',
      title: 'Text-to-SQL Applications',
      description:
        'Natural-language interfaces over your database with schema awareness, query validation and readable result summaries.',
      tech: ['LangGraph', 'LangChain', 'MySQL', 'SQLite'],
      icon: 'database',
    },
  ],
};
