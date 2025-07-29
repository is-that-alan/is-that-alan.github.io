
import DriveSidebar from "@/components/drive-sidebar";
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
    <div className="flex h-screen bg-white">
      <DriveSidebar />
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search in Drive" className="bg-gray-100 border-none rounded-full w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white" />
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <List className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>
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
