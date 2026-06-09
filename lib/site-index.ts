import { experiences } from "@/lib/experience";

export interface SearchDoc {
  title: string;
  url: string;
  displayUrl: string;
  description: string;
  /** Extra terms to match on but not necessarily display. */
  keywords: string[];
}

const staticDocs: SearchDoc[] = [
  {
    title: "About — Alan Wong",
    url: "/about",
    displayUrl: "alanwong.dev › about",
    description:
      "Data scientist with ~5 years leading full-cycle AI and quantitative projects across investment analytics, QIS risk, and agentic AI. Works with the Group CEO on firm-wide AI for Nan Fung's Biotech VC and family-office arms. Skilled in Python, SQL, TypeScript, LLMs, RAG, LangChain, PyTorch, FastAPI, and AWS.",
    keywords: [
      "bio", "who is alan", "profile", "data scientist", "summary", "intro", "nan fung",
      "ceo", "biotech", "family office", "skills", "skill", "stack", "python", "sql",
      "typescript", "javascript", "llm", "llms", "rag", "agentic", "langchain", "pytorch",
      "scikit", "fastapi", "aws", "docker", "machine learning", "ml", "ai", "nlp",
      "forecasting", "education", "georgia tech", "bath", "bristol", "msc",
    ],
  },
  {
    title: "Achievements & Recognition — Alan Wong",
    url: "/achievements",
    displayUrl: "alanwong.dev › achievements",
    description:
      "AWS AI League Hong Kong Champion (2025, real-time fine-tuning), HKU Hack4SGD judging panellist (2024), and AI / cloud certifications.",
    keywords: ["awards", "champion", "winner", "aws ai league", "hackathon", "judge", "judging panellist", "hack4sgd", "certifications", "azure", "tensorflow", "ibm", "recognition", "events"],
  },
  {
    title: "Projects — Alan Wong",
    url: "/projects",
    displayUrl: "alanwong.dev › projects",
    description:
      "Selected work: an S&P 500 sector text-analytics study (Georgia Tech ISYE 6740), reinforcement-learning T-Rex, Power BI and Streamlit dashboards, a Yelp recommender, and production AI agents.",
    keywords: ["portfolio", "work", "projects", "machine learning", "nlp", "dashboards", "reinforcement learning", "recommendation", "sp500", "s&p 500", "clustering", "tf-idf"],
  },
  {
    title: "Contact — Alan Wong",
    url: "/contact",
    displayUrl: "alanwong.dev › contact",
    description: "Get in touch — email thw.alanwong@gmail.com, LinkedIn, or based in Hong Kong.",
    keywords: ["email", "reach", "get in touch", "linkedin", "phone", "hong kong", "hire", "connect"],
  },
  {
    title: "Résumé (PDF) — Alan Wong",
    url: "/resume.pdf",
    displayUrl: "alanwong.dev › resume.pdf",
    description: "Download Alan Wong's latest CV / résumé as a PDF.",
    keywords: ["cv", "resume", "curriculum vitae", "download", "pdf"],
  },
  {
    title: "Developer Tools — Alan Wong",
    url: "/tools/json-beautifier",
    displayUrl: "alanwong.dev › tools",
    description: "A small set of in-browser dev tools: JSON beautifier, password generator, Pomodoro timer, and a markdown renderer.",
    keywords: ["tools", "json", "beautifier", "password", "generator", "timer", "pomodoro", "markdown", "utilities"],
  },
];

const experienceDocs: SearchDoc[] = experiences.map((e) => ({
  title: `${e.company} — ${e.role}`,
  url: `/experience/${e.slug}`,
  displayUrl: e.displayUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""),
  description: e.summary,
  keywords: [...e.tags.map((t) => t.toLowerCase()), e.dateRange.toLowerCase(), "experience", "work", "job", "role"],
}));

export const siteIndex: SearchDoc[] = [...staticDocs, ...experienceDocs];
