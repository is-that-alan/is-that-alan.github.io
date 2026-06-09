import { experiences } from "@/lib/experience";

/**
 * The entire knowledge base about Alan, assembled into one block. It's small
 * (~a CV's worth), so instead of retrieving snippets we just hand the whole
 * thing to the model on every question — no query can "miss" the context.
 * Experience is pulled from lib/experience so it never drifts; the rest are
 * stable facts kept here.
 */

const BIO =
  "Alan Wong (Tak Hei Wong) is a data scientist with around five years leading full-cycle AI " +
  "and quantitative projects across investment analytics, QIS risk, and agentic AI. He currently " +
  "works closely with the Group CEO at Nan Fung on firm-wide AI for the Biotech VC and " +
  "family-office arms — building autonomous learning loops, an autonomous AI investment-agents " +
  "team, and LLM-powered tools that influence how deals are screened and pursued.";

const SKILLS =
  "Skills — Programming: Python and SQL (proficient), TypeScript/JavaScript, HTML/CSS. " +
  "AI/ML: LLMs (OpenAI, Anthropic, open-source), RAG, agentic workflows, LangChain, prompt and " +
  "eval frameworks, PyTorch, scikit-learn, fine-tuning, NLP, forecasting, statistical modelling. " +
  "Data/Cloud: AWS (EKS, S3), Azure, FastAPI, Docker, Git, GitHub Actions, ingestion-to-reporting " +
  "pipelines. Languages: fluent English and Mandarin, native Cantonese.";

const EDUCATION =
  "Education — Georgia Institute of Technology, MSc Analytics, GPA 4.0/4.0 (part-time, Jan 2024–present). " +
  "University of Bath, MSc Computer Science, Distinction (2019–2020). " +
  "University of Bristol, BSc (Hons) Economics, Upper Second Class (2016–2019).";

const ACHIEVEMENTS =
  "Achievements — Champion of the AWS AI League Hong Kong (2025), won a live real-time model " +
  "fine-tuning competition at AWS TechFest. Judging panellist for the HKU Hack4SGD hackathon (2024). " +
  "Certifications: Microsoft Azure Fundamentals (AZ-900) and Azure AI Fundamentals (AI-900), " +
  "DeepLearning.AI TensorFlow Developer, IBM Data Science Professional Certificate.";

const PROJECTS =
  "Projects — 'Discovering Hidden Sector Relationships Among S&P 500 Companies' (Georgia Tech " +
  "ISYE 6740): text analytics + unsupervised learning over Wikipedia articles; TF-IDF, Truncated " +
  "SVD, K-Means/Spectral clustering, Linear SVM at 85.9% cross-validated accuracy. Deep " +
  "reinforcement-learning agent that plays the Chrome T-Rex game. Power BI market dashboard and a " +
  "Streamlit financial dashboard. Yelp recommendation system. Production work: an agentic Q&A " +
  "chatbot, an adaptive AI prompting framework, and a cross-asset risk aggregation engine.";

const CONTACT =
  "Contact — email thw.alanwong@gmail.com, LinkedIn linkedin.com/in/alanwth, phone +852 6752 6300, " +
  "based in Hong Kong.";

const EXPERIENCE = experiences
  .map((e) => {
    const metrics = e.highlights.map((h) => `${h.metric} ${h.label}`).join("; ");
    return (
      `${e.role} at ${e.company} (${e.dateRange}). ${e.summary} ` +
      `Highlights: ${metrics}. Details: ${e.bullets.join(" ")}`
    );
  })
  .join("\n\n");

export const PROFILE_CONTEXT = [
  BIO,
  `Experience —\n${EXPERIENCE}`,
  EDUCATION,
  SKILLS,
  ACHIEVEMENTS,
  PROJECTS,
  CONTACT,
].join("\n\n");
