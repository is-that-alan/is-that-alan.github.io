
"use client";

import Header from "@/components/header";
import DriveSidebar from "@/components/drive-sidebar";
import DriveSearchBar from "@/components/drive-search-bar";
import FilePreviewCard from "@/components/file-preview-card";
import ProjectPreview from "@/components/project-preview";
import { Folder } from "lucide-react"
import { useState } from "react";

export default function DrivePage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    {
      name: "Deep Reinforcement Learning T-Rex",
      type: "file",
      previewImage: "/img/dino_run_demo.gif",
      description: "Training a reinforcement learning agent to play the Google Chrome dinosaur game.",
    },
    {
      name: "Power BI Market Dashboard",
      type: "file",
      previewImage: "/img/PBI_snapshot.png",
      description: "A Power BI dashboard for visualizing market information and generating daily reports.",
    },
    {
      name: "Streamlit Financial Dashboard",
      type: "file",
      previewImage: "/img/streamlist_snapshot.png",
      description: "A Streamlit dashboard for downloading and visualizing market data.",
    },
    {
      name: "IBM Capstone Project",
      type: "folder",
    },
    {
      name: "Yelp Recommendation System",
      type: "folder",
    },
  ]

  const featuredProjects = projects.filter((p) => p.type === 'file');
  const folderProjects = projects.filter((p) => p.type === 'folder');

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header className="bg-gray-50 border-b">
        <DriveSearchBar />
      </Header>
      <div className="flex flex-1 overflow-hidden">
        <DriveSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Drive</h1>
          
          <h2 className="text-lg font-medium text-gray-800 mb-4">Suggested</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project) => (
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
