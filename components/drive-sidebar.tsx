import { File, Folder, Users, Star, Trash2, Cloud } from "lucide-react";

export default function DriveSidebar() {
  return (
    <div className="w-64 bg-gray-50 p-4 border-r h-full flex flex-col">
      <div>
        <div className="mb-8">
          <button className="bg-white border border-gray-200 rounded-full px-6 py-3 flex items-center space-x-2 shadow-sm hover:shadow-md transition-shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7v-2h4V7h2v4h4v2h-4v4z"/></svg>
            <span>New</span>
          </button>
        </div>
        <nav className="space-y-4">
          <a href="#" className="flex items-center px-4 py-2 text-lg font-medium text-gray-700 bg-gray-200 rounded-lg">
            <Folder className="w-6 h-6 mr-3" />
            My Drive
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
            <Users className="w-6 h-6 mr-3" />
            Shared with me
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
            <Star className="w-6 h-6 mr-3" />
            Starred
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
            <Trash2 className="w-6 h-6 mr-3" />
            Trash
          </a>
        </nav>
      </div>
      <div className="mt-auto">
        <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-700">
          <Cloud className="w-5 h-5 mr-3" />
          Storage
        </div>
        <div className="px-4 mt-2">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "45%" }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">15 GB of 30 GB used</p>
        </div>
      </div>
    </div>
  );
}