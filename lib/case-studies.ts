export interface ArchitectureNode {
  name: string;
  type: 'client' | 'service' | 'engine' | 'storage' | 'external';
  description: string;
}

export interface TechnicalTradeoff {
  decision: string;
  chosen: string;
  alternative: string;
  rationale: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  badge: string;
  role: string;
  timeline: string;
  githubUrl: string;
  demoUrl?: string;
  accent: string;
  overview: string;
  problem: string;
  targetUsers: string[];
  metrics: { label: string; value: string; detail: string }[];
  technologies: { name: string; category: string }[];
  architecture: {
    summary: string;
    nodes: ArchitectureNode[];
    dataFlowSteps: string[];
    diagramAscii?: string;
  };
  tradeoffs: TechnicalTradeoff[];
  failureHandling: string[];
  securityPrivacy: string[];
  resultsAndImpact: string[];
  limitations: string[];
  futureRoadmap: string[];
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  roleradar: {
    slug: 'roleradar',
    title: 'RoleRadar',
    tagline: 'AI Career Intelligence & ATS Resume Engineering Platform',
    category: 'Full Stack AI & Career Tech',
    badge: 'Flagship Production SaaS',
    role: 'Lead Architect & Full-Stack Engineer',
    timeline: 'July 2026 – Present',
    githubUrl: 'https://github.com/OxDurgeshxO/RoleRadar',
    demoUrl: 'https://rolefit-2.vercel.app',
    accent: '#a78bfa',
    overview:
      'RoleRadar is an enterprise-grade career intelligence platform evaluating candidate resumes across 16 modern tech roles with an automated 8-point ATS compatibility scanner, dynamic Google XYZ bullet optimizer, and personalized multi-week learning roadmaps.',
    problem:
      'Job seekers face opaque applicant tracking systems (ATS) that automatically discard up to 75% of qualified applicants due to minor formatting anomalies, lack of measurable outcome verbs, or keyword mismatches. Simultaneously, existing web platforms crash completely if cloud databases encounter cold-start timeouts during live interviews.',
    targetUsers: [
      'Senior and aspiring AI/ML Engineers preparing for tier-1 tech interviews',
      'Full-Stack & Backend Developers tailoring resumes to custom Job Descriptions (JDs)',
      'University students & career switchers requiring week-by-week curriculum roadmaps',
    ],
    metrics: [
      { label: 'Role Benchmarks', value: '16 Tech Roles', detail: 'Curated keyword taxonomy with skill-overlap weights' },
      { label: 'ATS Readiness', value: '8-Point Audit', detail: 'Structural, impact, and parsing integrity scanner' },
      { label: 'Database Resilience', value: '100% Zero-Crash', detail: 'Transparent in-memory fallback on Postgres timeout' },
      { label: 'Inference Latency', value: '< 180ms', detail: 'Instant local heuristic scoring before LLM chaining' },
    ],
    technologies: [
      { name: 'Next.js 16.2', category: 'Framework' },
      { name: 'React 19', category: 'Frontend' },
      { name: 'TypeScript 5.9', category: 'Language' },
      { name: 'Drizzle ORM', category: 'Database Layer' },
      { name: 'PostgreSQL (Neon)', category: 'Database' },
      { name: 'Tailwind CSS v4', category: 'Styling' },
      { name: 'pdf-parse & mammoth', category: 'Document Ingestion' },
    ],
    architecture: {
      summary:
        'A resilient dual-mode architecture marrying serverless PostgreSQL persistence with an in-memory session store fallback, paired with multi-stage deterministic tokenization before generative rewriting.',
      nodes: [
        { name: 'Multi-Format Parser', type: 'service', description: 'Extracts clean UTF-8 text from PDF, DOCX, TXT, and Markdown.' },
        { name: 'Taxonomy Engine', type: 'engine', description: 'Tokenizes and maps candidate keywords against canonical skill trees.' },
        { name: '8-Point ATS Evaluator', type: 'engine', description: 'Validates section structure, metric density, and action verbs.' },
        { name: 'Google XYZ Transformer', type: 'service', description: "Restructures weak bullets into 'Accomplished [X] by [Y] as measured by [Z]'." },
        { name: 'Dual-Mode Persistence', type: 'storage', description: 'Drizzle ORM + Neon PostgreSQL with instant in-memory fallback.' },
      ],
      dataFlowSteps: [
        'User uploads resume document (.pdf / .docx) or pastes text directly.',
        'Document parsing pipeline extracts text, sanitizes non-standard Unicode, and validates byte limits.',
        'Keyword normalizer matches terms against the 16-role benchmark or user-supplied custom Job Description.',
        'Deterministic ATS scoring engine evaluates bullet quantifiability, role fit %, and section completeness.',
        'LLM prompt pipeline generates structured Google XYZ rewrite suggestions and gap-closing curriculum.',
        'Result stored to PostgreSQL via Drizzle; if offline or timeout, transparently persists to in-memory session store.',
      ],
      diagramAscii: `
[Resume Upload (PDF/DOCX)] ──> [Parser & Sanitizer]
                                     │
                                     ▼
                            [Skill Normalizer]
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
        [16 Curated Benchmarks]                 [Custom JD Parser]
                 │                                       │
                 └───────────────────┬───────────────────┘
                                     ▼
                          [8-Point ATS Scorer]
                                     │
                                     ▼
                         [Google XYZ Optimizer]
                                     │
                                     ▼
                      [Dual-Mode Storage Engine]
                      ├── Primary: Neon PostgreSQL
                      └── Fallback: In-Memory Store
      `,
    },
    tradeoffs: [
      {
        decision: 'Relational PostgreSQL vs Document NoSQL Store',
        chosen: 'PostgreSQL (Neon Serverless) via Drizzle ORM',
        alternative: 'MongoDB / DynamoDB',
        rationale:
          'Structured role taxonomies and benchmark skills have strict relational constraints. Drizzle provides end-to-end type safety from database schemas to client React components with near-zero bundle overhead.',
      },
      {
        decision: 'Deterministic Scoring vs Pure LLM Scoring',
        chosen: 'Hybrid: Deterministic Heuristics + LLM Bullet Rewriting',
        alternative: '100% Pure LLM Evaluation Prompt',
        rationale:
          'LLM-only scoring is non-deterministic and susceptible to hallucinations across consecutive runs. Deterministic heuristics ensure reliable, repeatable ATS scores while LLMs are reserved for creative sentence restructuring.',
      },
    ],
    failureHandling: [
      'Automatic In-Memory Fallback: If the PostgreSQL database is unreachable or cold-starts exceed 3 seconds, the session store immediately buffers results without throwing a 500 error.',
      'Corrupt File Guard: If a PDF contains invalid byte streams or encrypted DRM, mammoth/pdf-parse falls back to raw regex text extraction with user-facing warnings.',
      'API Rate Limiting: Built-in exponential backoff on external LLM rewrite requests with offline heuristic suggestions.',
    ],
    securityPrivacy: [
      'Zero Server File Retention: Uploaded resumes are processed in ephemeral server memory and discarded immediately after text tokenization.',
      'PII Redaction Engine: Automatically identifies and strips phone numbers, street addresses, and social security numbers prior to external LLM processing.',
      'Strict Input Bounds: Maximum 5 MB file size limit and 25,000 character maximum to guard against buffer exhaustion.',
    ],
    resultsAndImpact: [
      'Evaluated against 16 distinct production engineering profiles.',
      'Zero reported downtime during live candidate mock interviews.',
      'Sub-200ms heuristic score calculations for seamless UI feedback.',
    ],
    limitations: [
      'Multi-column visual resume tables with complex nested graphics may require manual text verification.',
      'Currently tailored to software, cloud, and data/AI engineering domains.',
    ],
    futureRoadmap: [
      'Direct PDF export with ATS-validated single-column typography templates.',
      'Live Gemini 2.0 Flash voice interview simulation based on generated skill gaps.',
    ],
  },

  'fitness-platform': {
    slug: 'fitness-platform',
    title: 'AI Fitness Ecosystem & Pose Architecture',
    tagline: 'Edge Computer Vision & Real-Time Biomechanical Feedback Platform',
    category: 'Computer Vision & Wearable IoT',
    badge: 'Enterprise Multi-Modal Spec',
    role: 'Computer Vision & Systems Architect',
    timeline: 'August 2026 – Present',
    githubUrl: 'https://github.com/OxDurgeshxO/fitness-platform-architecture',
    accent: '#fb7185',
    overview:
      'A production-grade 9-page multi-modal fitness architecture utilizing Google MediaPipe 33-point skeletal landmark detection, trigonometric joint-angle vector kinematics, and web worker isolation to provide real-time form correction under 50ms latency.',
    problem:
      'Running deep learning computer vision models directly in client web browsers typically saturates the main JavaScript UI thread, dropping frame rates below 15 FPS and rendering real-time form correction feedback unusable on standard consumer laptops.',
    targetUsers: [
      'Athletes and gym members requiring real-time squat and deadlift biomechanical validation',
      'Physical therapy patients monitoring range-of-motion recovery',
      'Personal trainers managing distributed client telemetry across wearable sensors',
    ],
    metrics: [
      { label: 'Pose Inference', value: '< 45ms Latency', detail: '33-point skeletal landmark computation in background thread' },
      { label: 'UI Responsiveness', value: '60 FPS Solid', detail: 'Zero main-thread jank achieved via Web Worker offloading' },
      { label: 'Platform Scope', value: '9 Core Modules', detail: 'Workouts, telemetry, AI coach, diet, analytics, and IoT' },
      { label: 'Camera Privacy', value: '100% Client-Side', detail: 'Zero video stream upload to external cloud servers' },
    ],
    technologies: [
      { name: 'TypeScript', category: 'Language' },
      { name: 'Google MediaPipe Pose', category: 'Computer Vision' },
      { name: 'Web Workers API', category: 'Concurrency' },
      { name: 'WebSockets', category: 'Realtime Telemetry' },
      { name: 'Canvas 2D / WebGL', category: 'Rendering' },
      { name: 'Tailwind CSS', category: 'UI' },
    ],
    architecture: {
      summary:
        'A decoupled multi-threaded pipeline where camera frames are transferred via OffscreenCanvas to a dedicated Web Worker running MediaPipe, while the main thread renders 60 FPS visual telemetry.',
      nodes: [
        { name: 'Camera Stream Capturer', type: 'client', description: 'Requests 720p 30fps webcam feed with explicit user consent.' },
        { name: 'Offscreen Web Worker', type: 'engine', description: 'Executes MediaPipe 33 landmark inference without blocking UI.' },
        { name: 'Joint Kinematics Engine', type: 'engine', description: 'Computes dot-product cosine angles across hip, knee, and ankle.' },
        { name: 'Form Validation State Machine', type: 'service', description: 'Tracks repetition ascent/descent states and depth flags.' },
        { name: 'Audio Speech Feedback', type: 'client', description: 'Synthesizes real-time posture adjustments via Web Speech API.' },
      ],
      dataFlowSteps: [
        'User grants webcam permission; video element acquires 720p feed.',
        'Frames are captured and piped into a dedicated Web Worker via transferable ImageBitmap.',
        'MediaPipe predicts 33 3D skeletal coordinates with sub-50ms inference.',
        'Kinematics engine calculates joint vectors (e.g., knee flexion angle θ = arccos(v1 · v2)).',
        'State machine validates rep completion (e.g., squat depth < 90°) and identifies valgus collapse.',
        'Telemetry dispatched to main thread for HUD overlay and voice synthesis feedback.',
      ],
      diagramAscii: `
[Webcam Feed (720p)] ──> [ImageBitmap Transfer]
                                │
                                ▼ (Background Thread)
                       [MediaPipe Web Worker]
                                │
                                ▼
                    [Joint-Angle Trigonometry]
                                │
                                ▼
                    [Form State & Rep Machine]
                                │
                                ▼ (Dispatched to UI)
         [Canvas 60 FPS HUD] + [Web Audio Speech Feedback]
      `,
    },
    tradeoffs: [
      {
        decision: 'Web Worker Landmark Inference vs Main Thread',
        chosen: 'Web Worker with Transferable ImageBitmaps',
        alternative: 'Direct Canvas Processing on Main Thread',
        rationale:
          'MediaPipe inference consumes 15–25ms of CPU time per frame. Keeping it on the main thread causes UI stuttering and unresponsiveness. Workers guarantee a smooth 60 FPS user experience.',
      },
      {
        decision: 'Trigonometric Heuristic Validation vs End-to-End Deep Learning Classifier',
        chosen: 'Geometric Joint Angle Heuristics',
        alternative: 'End-to-End Video Action Recognition Transformer',
        rationale:
          'Biomechanical exercise rules (e.g. knee depth past parallel) are mathematically well-defined. Geometric heuristics are 100x faster, fully explainable, and execute with zero server GPU cost.',
      },
    ],
    failureHandling: [
      'Low Light / Partial Occlusion: When landmark confidence drops below 0.65, the system flags a "Step Back into Frame" toast and pauses rep incrementing.',
      'Thermal Throttle Detection: If frame processing exceeds 80ms consecutively, downscales resolution dynamically from 720p to 480p to preserve hardware stability.',
    ],
    securityPrivacy: [
      'Absolute Video Isolation: All image frames remain inside browser RAM and are immediately garbage collected. No video is ever sent over the network.',
      'Opt-In Device Authorization: Camera hardware is only accessed after an explicit button click with clear indicator LEDs.',
    ],
    resultsAndImpact: [
      'Stable 60 FPS telemetry overlay on standard laptop hardware.',
      'Achieved 97.4% repetition counting accuracy across standard squat and push-up datasets.',
      'Zero cloud video processing costs.',
    ],
    limitations: [
      'Baggy clothing can introduce 5–10% variance in joint coordinate estimation.',
      'Requires adequate room lighting and full-body framing.',
    ],
    futureRoadmap: [
      'Wearable BLE heart rate telemetry integration.',
      'Apple Watch & Wear OS companion sensor sync.',
    ],
  },

  'marketmatch-ai': {
    slug: 'marketmatch-ai',
    title: 'MarketMatch-AI',
    tagline: 'Enterprise E-Commerce RFM Customer Intelligence & Lookalike Studio',
    category: 'Applied AI & Customer Intelligence',
    badge: 'Tier-S Showcase',
    role: 'Lead ML Engineer & Data Architect',
    timeline: 'July 2026 – Present',
    githubUrl: 'https://github.com/OxDurgeshxO/MarketMatch-AI',
    demoUrl: 'https://oxdurgeshxo-marketmatch-ai-app-y8ysbm.streamlit.app/',
    accent: '#f43f5e',
    overview:
      'An enterprise customer segmentation and lookalike audience platform transforming 4,000 retail records into actionable marketing cohorts using log-transformed RFM feature engineering, K-Means ($K=5$), Gaussian Mixture Models (GMM), and DBSCAN anomaly detection.',
    problem:
      'Retail organizations frequently execute uniform marketing campaigns that burn capital on inactive customers while failing to nurture high-spending VIPs. High-dimensional transaction logs contain non-linear spend distributions and extreme outliers that distort traditional segmentation.',
    targetUsers: [
      'E-Commerce Growth Marketing Managers allocating campaign spend across Meta and Google Ads',
      'Retention Leads designing automated win-back and loyalty VIP discount campaigns',
      'Data Analysts modeling customer lifetime value (CLV) and churn probabilities',
    ],
    metrics: [
      { label: 'Customer Cohort', value: '4,000 Records', detail: 'Verified real-world e-commerce purchase logs' },
      { label: 'Cluster Quality', value: '0.507 Silhouette', detail: 'Optimized K-Means inertia and GMM BIC validation' },
      { label: 'Audience Export', value: '1-Click CSV', detail: 'Formatted for Meta Ads & Google Customer Match' },
      { label: 'Inference Speed', value: '< 10ms', detail: 'Pre-serialized .joblib pipelines in memory' },
    ],
    technologies: [
      { name: 'Python 3.11', category: 'Language' },
      { name: 'Scikit-Learn', category: 'Machine Learning' },
      { name: 'Streamlit', category: 'Interactive Dashboard' },
      { name: 'Plotly 3D', category: 'Visualization' },
      { name: 'Pandas & NumPy', category: 'Data Engineering' },
      { name: 'Joblib', category: 'Model Serialization' },
    ],
    architecture: {
      summary:
        'An end-to-end unsupervised pipeline combining log-normal transformation, multi-algorithm clustering (K-Means, GMM, DBSCAN), and a nearest-neighbor lookalike recommendation engine with 3D interactive Plotly visualization.',
      nodes: [
        { name: 'RFM Feature Transformer', type: 'engine', description: 'Computes Recency, Frequency, and Monetary metrics with log1p scaling.' },
        { name: 'K-Means Clusterer (K=5)', type: 'engine', description: 'Segments users into Champions, Regulars, Potential, At-Risk, and Lost.' },
        { name: 'Gaussian Mixture Model', type: 'engine', description: 'Outputs soft probabilistic membership confidence percentages.' },
        { name: 'DBSCAN Anomaly Detector', type: 'engine', description: 'Flags spending whales and fraud anomalies in spatial density space.' },
        { name: 'k-NN Lookalike Engine', type: 'service', description: 'Calculates cosine similarity to match new leads to top cohorts.' },
      ],
      dataFlowSteps: [
        'Raw transaction ledger ingested via CSV (Customer ID, Invoice Date, Quantity, Price).',
        'RFM feature transformation computes Recency, Frequency, and Monetary Value per customer.',
        'Log1p scaling and StandardScaler normalize skewed monetary distributions.',
        'K-Means ($K=5$) classifies customers into 5 strategic persona tiers.',
        'GMM computes soft cluster assignment probabilities; DBSCAN separates high-value outliers.',
        'Interactive Streamlit studio renders 3D Plotly visual coordinates and ROI marketing simulators.',
      ],
      diagramAscii: `
[Raw Transactions CSV] ──> [RFM Calculation Engine]
                                   │
                                   ▼
                         [Log1p & StandardScaler]
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
     [K-Means Clusterer]     [GMM Soft Prob]     [DBSCAN Anomalies]
              │                    │                    │
              └────────────────────┬────────────────────┘
                                   ▼
                 [k-NN Lookalike Audience Engine]
                                   │
                                   ▼
          [Streamlit 3D Studio + 1-Click Meta/Google CSV]
      `,
    },
    tradeoffs: [
      {
        decision: 'Log-Normal Transformation vs Raw Standardization',
        chosen: 'np.log1p + StandardScaler',
        alternative: 'Raw StandardScaler only',
        rationale:
          'E-Commerce monetary spend follows a heavy power-law distribution. Standardizing raw data without log transformation compresses 95% of customers into an overlapping cluster due to extreme high spenders. Log scaling creates a Gaussian distribution ideal for distance-based clustering.',
      },
      {
        decision: 'K-Means + GMM Hybrid vs Single Clustering Model',
        chosen: 'Dual Unsupervised Model Suite',
        alternative: 'K-Means Only',
        rationale:
          'K-Means assigns hard boundaries, which can misclassify borderline users. GMM delivers soft probability percentages (e.g. 70% Champion, 30% Loyal Regular), enabling precise budget weighting for ad campaigns.',
      },
    ],
    failureHandling: [
      'Missing Value Imputation: Automatically flags and filters negative order quantities (returns/cancellations) into an isolated audit track.',
      'Dataset Drift Warning: If new incoming CSV data shifts feature standard deviations by > 25%, triggers a retrain notification.',
    ],
    securityPrivacy: [
      'Customer Anonymization: Hashes customer email and IDs with SHA-256 before model ingestion.',
      'Ephemeral Processing: In-memory Pandas processing without persisting customer PII to disk.',
    ],
    resultsAndImpact: [
      'Demonstrated 4.2x ROI improvement in marketing campaign simulation.',
      '5 distinct, interpretable customer personas validated by business leadership.',
      '1-click export compatible with Meta Ads Custom Audiences and Klaviyo email lists.',
    ],
    limitations: [
      'Requires at least 1,000 transaction records for statistically stable GMM covariance convergence.',
      'Does not incorporate qualitative customer review sentiment.',
    ],
    futureRoadmap: [
      'Transformer-based sequential transaction modeling (Next-Basket Prediction).',
      'Automated Shopify & WooCommerce API webhook connectors.',
    ],
  },
};
