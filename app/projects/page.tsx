
import DriveClient from '@/components/drive-client';
import { promises as fs } from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

async function getProjects() {
  const projectsData = [
    {
      name: "S&P 500 Sector Discovery (Text Analytics)",
      type: "file",
      category: "suggested",
      previewImage: "/images/sp500-sector-text-analytics.png",
      description:
        "ISYE 6740 (Georgia Tech) final project: reproducing and challenging GICS sectors from Wikipedia text with TF-IDF, Truncated SVD, and clustering — 85.9% CV accuracy.",
      tags: ["NLP", "TF-IDF", "clustering", "unsupervised learning", "finance", "Georgia Tech"],
      markdownPath: "/markdown/sp500-sector-text-analytics.md",
    },
    {
      name: "Deep Reinforcement Learning T-Rex",
      type: "file",
      category: "suggested",
      previewImage: "/images/dino_run_demo.gif",
      description: "Training a reinforcement learning agent to play the Google Chrome dinosaur game.",
      tags: ["deep learning", "reinforcement learning", "AI", "game", "python"],
      markdownPath: "/markdown/deep-reinforcement-learning-t-rex.md",
    },
    {
      name: "Power BI Market Dashboard",
      type: "file",
      category: "suggested",
      previewImage: "/images/PBI_snapshot.png",
      description: "A Power BI dashboard for visualizing market information and generating daily reports.",
      tags: ["Power BI", "data visualization", "business intelligence", "finance"],
      markdownPath: "/markdown/power-bi-market-dashboard.md",
    },
    {
      name: "Streamlit Financial Dashboard",
      type: "file",
      category: "suggested",
      previewImage: "/images/streamlist_snapshot.png",
      description: "A Streamlit dashboard for downloading and visualizing market data.",
      tags: ["Streamlit", "python", "finance", "dashboard", "data analysis"],
      markdownPath: "/markdown/streamlit-financial-dashboard.md",
    },
    {
      name: "Yelp Recommendation System",
      type: "file",
      category: "suggested",
      previewImage: "/images/yelp eda.png",
      description: "An end-to-end data science project from preliminary studies to deployment.",
      tags: ["recommendation system", "machine learning", "python", "data science", "NLP"],
      markdownPath: "/markdown/yelp-recommendation-system.md",
    },
    {
      name: "Agentic Q&A Chatbot",
      type: "file",
      category: "file",
      previewImage: "/images/agentic_q&a_chatbot.png",
      description: "An agentic Q&A chatbot for real estate acquisition.",
      tags: ["chatbot", "AI", "NLP", "agentic AI", "LLM"],
      markdownPath: "/markdown/agentic-q-a-chatbot.md",
    },
    {
      name: "Adaptive AI Prompting Framework",
      type: "file",
      category: "file",
      previewImage: "/images/adaptive_ai_prompting_framework.png",
      description: "An adaptive AI prompting framework for improving business results.",
      tags: ["AI", "prompt engineering", "machine learning", "framework"],
      markdownPath: "/markdown/adaptive-ai-prompting-framework.md",
    },
    {
      name: "Risk Aggregation Engine",
      type: "file",
      category: "file",
      previewImage: "/images/risk_aggregation_engine.png",
      description: "A risk aggregation engine for incorporating additive and non-additive metrics.",
      tags: ["finance", "risk management", "data engineering", "SQL"],
      markdownPath: "/markdown/risk-aggregation-engine.md",
    },
    {
      name: "Marketing Campaign Analysis",
      type: "folder",
      tags: ["marketing", "data analysis", "campaigns"],
    },
    {
      name: "NLP Text Classification",
      type: "folder",
      tags: ["NLP", "text classification", "machine learning"],
    },
    {
      name: "Cross-Asset Risk Analysis",
      type: "folder",
      tags: ["finance", "risk analysis", "quantitative finance"],
    },
    {
      name: "IBM Capstone Project",
      type: "folder",
      tags: ["IBM", "capstone", "cloud", "data science"],
    },
  ];

  const projectsWithContent = await Promise.all(
    projectsData.map(async (project) => {
      if (project.type === 'file' && project.markdownPath) {
        try {
          const filePath = path.join(process.cwd(), 'public', project.markdownPath);
          const markdown = await fs.readFile(filePath, 'utf-8');
          const processedContent = await remark()
            .use(html, { sanitize: false })
            .process(markdown);
          const contentHtml = processedContent.toString().replace(
            /https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/g,
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
          );
          return {
            ...project,
            markdownContent: contentHtml,
          };
        } catch (error) {
          console.error(`Error processing markdown for ${project.name}:`, error);
          return {
            ...project,
            markdownContent: `<p>Error loading content.</p>`,
          };
        }
      }
      return project;
    })
  );

  return projectsWithContent;
}

export default async function DrivePage() {
  const projects = await getProjects();
  return <DriveClient projects={projects} />;
}
