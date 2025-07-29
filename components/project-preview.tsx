
import { X } from 'lucide-react';
import Image from 'next/image';

interface ProjectPreviewProps {
  project: {
    name: string;
    previewImage: string;
    description: string;
  };
  onClose: () => void;
}

export default function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 text-white">
          <h2 className="text-lg font-medium">{project.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-8 text-center">
          <Image
            src={project.previewImage}
            alt={project.name}
            width={800}
            height={600}
            className="max-w-full h-auto mx-auto rounded-md"
          />
          <p className="text-gray-300 mt-6 text-left">{project.description}</p>
        </main>
      </div>
    </div>
  );
}
