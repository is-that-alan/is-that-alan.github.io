
"use client";

import Header from "@/components/header";
import DriveSidebar from "@/components/drive-sidebar";
import DriveSearchBar from "@/components/drive-search-bar";
import FilePreviewCard from "@/components/file-preview-card";
import ProjectPreview from "@/components/project-preview";
import { Folder, Menu } from "lucide-react"
import { useState, useEffect } from "react";
import ProjectSearchLoader from "@/components/project-search-loader";

export default function DrivePage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const projects = [
    {
      name: "Deep Reinforcement Learning T-Rex",
      type: "file",
      category: "suggested",
      previewImage: "/images/dino_run_demo.gif",
      description: "Training a reinforcement learning agent to play the Google Chrome dinosaur game.",
      tags: ["deep learning", "reinforcement learning", "AI", "game", "python"],
    },
    {
      name: "Power BI Market Dashboard",
      type: "file",
      category: "suggested",
      previewImage: "/images/PBI_snapshot.png",
      description: "A Power BI dashboard for visualizing market information and generating daily reports.",
      tags: ["Power BI", "data visualization", "business intelligence", "finance"],
    },
    {
      name: "Streamlit Financial Dashboard",
      type: "file",
      category: "suggested",
      previewImage: "/images/streamlist_snapshot.png",
      description: "A Streamlit dashboard for downloading and visualizing market data.",
      tags: ["Streamlit", "python", "finance", "dashboard", "data analysis"],
    },
    {
      name: "Yelp Recommendation System",
      type: "file",
      category: "suggested",
      previewImage: "/images/yelp eda.png",
      description: "An end-to-end data science project from preliminary studies to deployment.",
      tags: ["recommendation system", "machine learning", "python", "data science", "NLP"],
    },
    {
      name: "Agentic Q&A Chatbot",
      type: "file",
      category: "file",
      previewImage: "/images/agentic_q&a_chatbot.png",
      description: "An agentic Q&A chatbot for real estate acquisition.",
      tags: ["chatbot", "AI", "NLP", "agentic AI", "LLM"],
    },
    {
      name: "Adaptive AI Prompting Framework",
      type: "file",
      category: "file",
      previewImage: "/images/adaptive_ai_prompting_framework.png",
      description: "An adaptive AI prompting framework for improving business results.",
      tags: ["AI", "prompt engineering", "machine learning", "framework"],
    },
    {
      name: "Risk Aggregation Engine",
      type: "file",
      category: "file",
      previewImage: "/images/risk_aggregation_engine.png",
      description: "A risk aggregation engine for incorporating additive and non-additive metrics.",
      tags: ["finance", "risk management", "data engineering", "SQL"],
    },
    {
      name: "New Placeholder Project",
      type: "file",
      category: "file",
      previewImage: "/images/new_placeholder_project.png",
      description: "A placeholder for a future project.",
      tags: ["placeholder", "future", "development"],
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

  const handleSearch = (term: string) => {
    setIsSearching(true);
    setSearchTerm(term);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000); // Simulate search delay
  };

  const filteredProjects = projects.filter((project) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const nameMatches = project.name.toLowerCase().includes(lowerCaseSearchTerm);
    const tagsMatch = project.tags?.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm));
    return nameMatches || tagsMatch;
  });

  const suggestedFiles = filteredProjects.filter((p) => p.type === 'file' && p.category === 'suggested');
  const regularFiles = filteredProjects.filter((p) => p.type === 'file' && p.category === 'file');
  const folderProjects = filteredProjects.filter((p) => p.type === 'folder');

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header className="bg-gray-50 border-b">
        <div className="md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        <DriveSearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </Header>
      <div className="flex flex-1 overflow-hidden">
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <DriveSidebar />
        </div>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Drive</h1>
          
          <h2 className="text-lg font-medium text-gray-800 mb-4">Suggested Files</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {suggestedFiles.map((project) => (
                  <div key={project.name} onClick={() => setSelectedProject(project)}>
                    <FilePreviewCard 
                      name={project.name} 
                      previewImage={project.previewImage!} 
                      description={project.description!} 
                    />
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-medium text-gray-800 mb-4">Files</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {regularFiles.map((project) => (
                  <div key={project.name} onClick={() => setSelectedProject(project)}>
                    <FilePreviewCard 
                      name={project.name} 
                      previewImage={project.previewImage!} 
                      description={project.description!} 
                    />
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-medium text-gray-800 mb-4">Folders</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {folderProjects.map((project) => (
                  <div
                    key={project.name}
                    className="group flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-200"
                  >
                    <div className="mr-3">
                      <Folder className="w-8 h-8 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-800 font-medium">
                      {project.name}
                    </span>
                  </div>
                ))}
              </div>
        </main>
      </div>
      {selectedProject && <ProjectPreview project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
