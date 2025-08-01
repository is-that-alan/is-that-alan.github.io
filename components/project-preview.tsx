
import { X } from 'lucide-react';

interface ProjectPreviewProps {
  project: {
    name: string;
    description: string;
    markdownContent?: string;
  };
  onClose: () => void;
}

export default function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-gray-800 rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 text-white">
          <h2 className="text-lg font-medium">{project.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl h-full max-h-[calc(90vh-120px)] overflow-y-auto relative">
            <div className="prose max-w-none text-gray-800 mt-6 text-left" dangerouslySetInnerHTML={{ __html: project.markdownContent || project.description }} />
          </div>
        </main>
      </div>
    </div>
  );
}
