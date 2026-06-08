export interface OverviewLink {
  label: string;
  url: string;
}

export interface OverviewIntent {
  id: string;
  keywords: string[];
  /** Paragraphs of the answer. First paragraph is the lede. */
  paragraphs: string[];
  related: OverviewLink[];
}

/**
 * Pre-written "AI Overview" answers. There is NO live model here: a query is
 * matched to the best intent purely by keyword overlap. This is deliberate —
 * a static site cannot hold an API key safely, and canned answers cannot be
 * prompt-injected or made to leak anything. The user's query is only ever
 * echoed back as escaped text (see sanitizeQuery), never executed.
 */
export const intents: OverviewIntent[] = [
  {
    id: "identity",
    keywords: ["who is", "who's", "alan", "wong", "bio", "yourself", "tak hei", "your background", "about you", "about alan", "about him"],
    paragraphs: [
      "Alan Wong is a data scientist with around five years leading full-cycle AI and quantitative projects across investment analytics, QIS risk, and agentic AI.",
      "He currently works closely with the Group CEO at Nan Fung on firm-wide AI for the Biotech VC and family-office arms — building autonomous learning loops, an autonomous AI investment-agents team, and LLM-powered tools that influence how deals are screened and pursued.",
    ],
    related: [
      { label: "About", url: "/about" },
      { label: "Experience at Nan Fung", url: "/experience/nan-fung" },
    ],
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech", "stack", "technologies", "languages", "tools", "good at", "expertise", "python", "llm", "rag"],
    paragraphs: [
      "Alan's core toolkit is Python and SQL, with TypeScript on the front end. On the AI side he works across LLMs, RAG, and agentic workflows (LangChain, eval frameworks), plus PyTorch, scikit-learn, fine-tuning, NLP, and forecasting.",
      "For delivery he uses FastAPI, Docker, AWS (EKS, S3), and GitHub Actions to ship ingestion-to-reporting pipelines and human-in-the-loop AI agents.",
    ],
    related: [
      { label: "About", url: "/about" },
      { label: "Résumé (PDF)", url: "/resume.pdf" },
    ],
  },
  {
    id: "ai-work",
    keywords: ["ai", "agent", "agents", "agentic", "llm", "gen ai", "generative", "machine learning", "automation", "learning loop"],
    paragraphs: [
      "Alan builds production agentic AI. At Nan Fung he created a reusable agent framework with a pluggable memory system that powers all production agents — lifting agentic task-success rates by 20% and cutting build cycles by 70% (weeks to days).",
      "He also shipped a full-cycle AI investment-screening platform that cut asset underwriting from a full day to minutes per deal, and a multi-agent platform with a centralised knowledge base used across investment, leasing, and operations teams.",
    ],
    related: [
      { label: "Experience at Nan Fung", url: "/experience/nan-fung" },
      { label: "Projects", url: "/projects" },
    ],
  },
  {
    id: "experience",
    keywords: ["experience", "work", "worked", "job", "career", "history", "companies", "where", "employer", "premialab", "societe", "generale", "hkust"],
    paragraphs: [
      "Alan is a Senior Associate, Data Science at Nan Fung (2024–present). Before that he was a Fintech Data Scientist at Premialab, where he led the cross-asset risk aggregation engine serving global banks and clients managing US$20tn AUM.",
      "Earlier roles include a Data Analytics Research Assistant at HKUST (fine-tuning GPT/BERT on NVIDIA DGX) and a Cross-Asset Risk Trainee at Société Générale (Power BI dashboards still in use 3+ years later).",
    ],
    related: [
      { label: "Nan Fung", url: "/experience/nan-fung" },
      { label: "Premialab", url: "/experience/premialab" },
      { label: "Société Générale", url: "/experience/societe-generale" },
    ],
  },
  {
    id: "achievements",
    keywords: ["achievement", "achievements", "award", "awards", "champion", "win", "won", "winner", "judge", "judging", "hackathon", "recognition", "certifications", "certificate"],
    paragraphs: [
      "Alan was the Champion of the AWS AI League Hong Kong (2025), winning a live, real-time model fine-tuning competition at AWS TechFest.",
      "He has also served as a judging panellist for the HKU Hack4SGD hackathon (2024), and holds certifications across Microsoft Azure (Fundamentals & AI), DeepLearning.AI TensorFlow Developer, and IBM Data Science.",
    ],
    related: [
      { label: "Achievements", url: "/achievements" },
    ],
  },
  {
    id: "education",
    keywords: ["education", "study", "studied", "degree", "university", "school", "georgia tech", "bath", "bristol", "msc", "gpa", "analytics"],
    paragraphs: [
      "Alan is completing an MSc in Analytics at the Georgia Institute of Technology with a 4.0 GPA (part-time, 2024–present).",
      "He holds an MSc in Computer Science from the University of Bath (Distinction) and a BSc in Economics from the University of Bristol.",
    ],
    related: [
      { label: "About", url: "/about" },
    ],
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "hire", "connect", "linkedin", "message", "touch", "available", "phone"],
    paragraphs: [
      "You can reach Alan by email at thw.alanwong@gmail.com or connect on LinkedIn (linkedin.com/in/alanwth). He's based in Hong Kong.",
    ],
    related: [
      { label: "Contact", url: "/contact" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/alanwth/" },
    ],
  },
  {
    id: "projects",
    keywords: ["project", "projects", "portfolio", "built", "build", "sp500", "s&p", "clustering", "dashboard", "reinforcement", "recommendation", "demo"],
    paragraphs: [
      "Alan's project portfolio spans applied ML and data products: an S&P 500 sector-discovery study using text analytics and unsupervised learning (Georgia Tech ISYE 6740, 85.9% cross-validated accuracy), a deep-RL agent that plays the Chrome T-Rex game, Power BI and Streamlit market dashboards, and a Yelp recommender.",
    ],
    related: [
      { label: "Projects", url: "/projects" },
    ],
  },
];

/** Generic fallback when nothing matches well. */
export const fallbackOverview: { paragraphs: string[]; related: OverviewLink[] } = {
  paragraphs: [
    "This is Alan Wong's portfolio — a data scientist and AI engineer based in Hong Kong. Try searching for his experience, projects, skills, achievements, or how to get in touch.",
  ],
  related: [
    { label: "About", url: "/about" },
    { label: "Projects", url: "/projects" },
    { label: "Achievements", url: "/achievements" },
  ],
};

/** Clean a raw query for safe display. Never executed — purely cosmetic. */
export function sanitizeQuery(raw: string): string {
  return raw
    .replace(/[\u0000-\u001F\u007F]/g, " ") // strip control chars
    .replace(/[<>]/g, " ") // drop angle brackets defensively
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

/** Score every intent by keyword overlap and return the best match, or null. */
export function matchOverview(raw: string): OverviewIntent | null {
  const q = sanitizeQuery(raw).toLowerCase();
  if (!q) return null;

  let best: OverviewIntent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(kw)) score += kw.length > 4 ? 2 : 1; // longer keywords weigh more
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return bestScore > 0 ? best : null;
}
