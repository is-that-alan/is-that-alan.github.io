
import Header from "@/components/header";
import DriveSidebar from "@/components/drive-sidebar";
import DriveSearchBar from "@/components/drive-search-bar";
import { Folder, List, Search, Settings } from "lucide-react"


export default function DrivePage() {
  const projects = [
    {
      name: "E-commerce Platform",
      type: "folder",
    },
    {
      name: "Weather Dashboard",
      type: "folder",
    },
    {
      name: "Task Manager Pro",
      type: "folder",
    },
    {
      name: "Portfolio Website",
      type: "folder",
    },
    {
      name: "Chat Application",
      type: "folder",
    },
    {
      name: "Data Visualization",
      type: "folder",
    },
    {
      name: "API Gateway",
      type: "folder",
    },
    {
      name: "Blog Platform",
      type: "folder",
    },
  ]

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header className="bg-gray-50 border-b">
        <DriveSearchBar />
      </Header>
      <div className="flex flex-1 overflow-hidden">
        <DriveSidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Drive</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {projects.map((project) => (
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
    </div>
  );
}
