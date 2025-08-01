
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import DriveSidebar from "@/components/drive-sidebar";
import DriveSearchBar from "@/components/drive-search-bar";
import FilePreviewCard from "@/components/file-preview-card";
import ProjectPreview from "@/components/project-preview";
import { Folder, Menu } from "lucide-react";
import ProjectSearchLoader from "@/components/project-search-loader";

export default function DriveClient({ projects: initialProjects }: { projects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearch = (term: string) => {
    setIsSearching(true);
    setSearchTerm(term);
    setTimeout(() => {
      const filtered = initialProjects.filter((project) => {
        const lowerCaseSearchTerm = term.toLowerCase();
        const nameMatches = project.name.toLowerCase().includes(lowerCaseSearchTerm);
        const tagsMatch = project.tags?.some((tag: string) => tag.toLowerCase().includes(lowerCaseSearchTerm));
        return nameMatches || tagsMatch;
      });
      setProjects(filtered);
      setIsSearching(false);
    }, 500); // Simulate search delay
  };

  const suggestedFiles = projects.filter((p) => p.type === 'file' && p.category === 'suggested');
  const regularFiles = projects.filter((p) => p.type === 'file' && p.category !== 'suggested');
  const folderProjects = projects.filter((p) => p.type === 'folder');

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
          {isSearching ? (
            <ProjectSearchLoader />
          ) : (
            <>
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
            </>
          )}
        </main>
      </div>
      {selectedProject && <ProjectPreview project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
