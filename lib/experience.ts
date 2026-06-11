export interface Highlight {
  metric: string;
  label: string;
}

export interface ExperienceRole {
  slug: string;
  company: string;
  role: string;
  dateRange: string;
  url: string;
  displayUrl: string;
  location: string;
  /** Short one-line snippet used on the About SERP. */
  summary: string;
  /** Headline impact metrics rendered as cards. */
  highlights: Highlight[];
  bullets: string[];
  tags: string[];
}

export const experiences: ExperienceRole[] = [
  {
    slug: "nan-fung",
    company: "Nan Fung Group",
    role: "Senior Associate, Data Science",
    dateRange: "Jan 2024 – Present",
    url: "https://www.nanfung.com/",
    displayUrl: "https://www.nanfung.com",
    location: "Hong Kong",
    summary:
      "Drive firm-wide AI implementation, working closely with the Group CEO on AI for the Biotech VC and family-office arms — from autonomous learning loops and an AI investment-agents team to a screening platform that cut underwriting from a day to minutes.",
    highlights: [
      { metric: "1 day → mins", label: "Deal underwriting time" },
      { metric: "+20%", label: "Agentic task success rate" },
      { metric: "70% ↓", label: "Build cycle (weeks → days)" },
      { metric: "4×", label: "Marketing conversion lift" },
    ],
    bullets: [
      "Work closely with the Group CEO on firm-wide AI strategy for the Biotech VC and family-office arms — building autonomous learning loops and an autonomous AI investment-agents team, and driving emerging-technology direction.",
      "Built a multi-agent platform with a centralised knowledge base over internal “skills” and documents, used across investment, leasing, and operations teams.",
      "Shipped a full-cycle AI investment-screening platform that cut asset underwriting from a full day to minutes per deal — now used by the deal team, structurally changing how opportunities are sourced, screened, and pursued.",
      "Built a reusable agent framework with a pluggable memory system powering all production AI agents, lifting agentic task success rates by 20% and cutting end-to-end build cycles by 70% (weeks → days).",
      "Owned full-cycle delivery: React / TypeScript front-ends over Python (FastAPI) backends with ingestion-to-reporting pipelines, deployed as human-in-the-loop AI agent SaaS on AWS EKS via GitHub Actions CI.",
      "Deployed NLP, forecasting, and LLM-based synthetic data generation for valuation signals, comparables, and investment-scenario stress testing.",
      "Applied CART analysis on campaign data to identify high-potential customer segments, driving a 4× conversion lift.",
    ],
    tags: ["Agentic AI", "LLMs", "RAG", "FastAPI", "React / TypeScript", "AWS EKS"],
  },
  {
    slug: "premialab",
    company: "Premialab",
    role: "Fintech Data Scientist",
    dateRange: "Jul 2022 – Jan 2024",
    url: "https://www.premialab.com/",
    displayUrl: "https://www.premialab.com",
    location: "Hong Kong",
    summary:
      "Led the cross-asset risk aggregation engine for QIS strategies — serving leading global investment banks and institutional clients managing US$20tn AUM with 60% faster, reliable pre-T+1 risk.",
    highlights: [
      { metric: "US$20tn", label: "Client AUM served" },
      { metric: "60% ↓", label: "Risk report runtime" },
      { metric: "90% ↓", label: "Query & infra cost" },
    ],
    bullets: [
      "Led development of the cross-asset risk aggregation engine for QIS strategies, combining additive sensitivities (Greeks) and non-additive metrics (Historical VaR) — serving leading global investment banks and institutional clients managing US$20tn AUM with 60% faster reports and reliable pre-T+1 market-open risk.",
      "Collaborated with risk analysts and the CRO on risk validation, back-testing, and benchmarking for QIS derivative strategies.",
      "Designed and deployed a real-time anomaly-detection framework to monitor data quality and trigger escalation alerts, ensuring reliability across client-facing reports.",
      "Rebuilt data-extraction pipelines using asynchronous microservices, cutting processing time and infrastructure costs by 90%.",
      "Optimised SQL processes, cutting query time by 90%.",
    ],
    tags: ["QIS", "Risk Engine", "Historical VaR", "Microservices", "SQL"],
  },
  {
    slug: "hkust",
    company: "HKUST Fintech Research Project",
    role: "Data Analytics Research Assistant",
    dateRange: "Aug 2021 – Jul 2022",
    url: "https://www.hkust.edu.hk/",
    displayUrl: "https://www.hkust.edu.hk",
    location: "Hong Kong",
    summary:
      "Fine-tuned GPT/BERT models on NVIDIA DGX for domain-specific NLP, and led an HKMA industry report and a federated-ML project with SHAP explainability.",
    highlights: [
      { metric: "+10pp", label: "Classification accuracy" },
      { metric: "NVIDIA DGX", label: "Fine-tuning hardware" },
      { metric: "HKMA", label: "Published industry report" },
    ],
    bullets: [
      "Fine-tuned GPT/BERT models on NVIDIA DGX for domain-specific text classification, lifting accuracy by 10 percentage points.",
      "Led an HKMA industry report using hierarchical clustering, from analysis through to publication.",
      "Led a federated machine-learning project for a public entity, using SHAP for model explainability and transparency.",
    ],
    tags: ["NLP", "Fine-tuning", "BERT", "Federated ML", "SHAP"],
  },
  {
    slug: "societe-generale",
    company: "Société Générale",
    role: "Cross-Asset Risk Trainee",
    dateRange: "Aug 2020 – Jul 2021",
    url: "https://www.societegenerale.com/",
    displayUrl: "https://www.societegenerale.com",
    location: "Hong Kong",
    summary:
      "Built market-risk analytics and Power BI dashboards (3 days → 10 minutes, still in use 3+ years later) plus real-time NLP web apps for the cross-asset risk desk.",
    highlights: [
      { metric: "3 days → 10 min", label: "Reporting time" },
      { metric: "3+ yrs", label: "Dashboards still in use" },
      { metric: "BERT", label: "Real-time sentiment apps" },
    ],
    bullets: [
      "Produced daily reports analysing same-day market news and policy changes for group-wide stakeholders.",
      "Joined the Data Science Lab team, independently applying Lasso regression and PCA for global asset movements and cross-asset stress testing.",
      "Built Power BI dashboards cutting report time from 3 days to 10 minutes — still in use 3+ years later.",
      "Built real-time web apps for Twitter streaming and news scraping, leveraging BERT for sentiment analysis.",
    ],
    tags: ["Market Risk", "Power BI", "PCA", "BERT", "NLP"],
  },
  {
    slug: "student-hubs",
    company: "Student Hubs (Bristol Hub)",
    role: "Volunteer Python Tutor",
    dateRange: "Feb 2019 – Apr 2019",
    url: "https://www.studenthubs.org/",
    displayUrl: "https://www.studenthubs.org",
    location: "Bristol, United Kingdom",
    summary:
      "Volunteered as a Python tutor, preparing weekly materials and teaching teenagers the basic concepts of coding in Python.",
    highlights: [
      { metric: "3 mos", label: "Volunteer teaching" },
      { metric: "Weekly", label: "Python sessions" },
      { metric: "Education", label: "Community focus" },
    ],
    bullets: [
      "Attended weekly sessions and prepared material to teach teenagers the basic concepts of coding in Python.",
      "Introduced beginner-friendly Python concepts through practical examples and guided exercises.",
    ],
    tags: ["Volunteering", "Python", "Teaching", "Education", "Bristol Hub"],
  },
];

export function getExperience(slug: string): ExperienceRole | undefined {
  return experiences.find((e) => e.slug === slug);
}
