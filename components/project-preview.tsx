
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

interface ProjectPreviewProps {
  project: {
    name: string;
    previewImage: string;
    description: string;
    markdownPath?: string; // Optional markdown path
  };
  onClose: () => void;
}

export default function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [isLoadingMarkdown, setIsLoadingMarkdown] = useState(true);

  useEffect(() => {
    if (project.markdownPath) {
      setIsLoadingMarkdown(true);
      fetch(project.markdownPath)
        .then((res) => res.text())
        .then(async (markdown) => {
          const processedContent = await remark().use(html).process(markdown);
          setMarkdownContent(processedContent.toString());
          setIsLoadingMarkdown(false);
        })
        .catch((error) => {
          console.error("Failed to load markdown:", error);
          setMarkdownContent("Failed to load project details.");
          setIsLoadingMarkdown(false);
        });
    } else {
      setMarkdownContent(project.description);
      setIsLoadingMarkdown(false);
    }
  }, [project.markdownPath, project.description]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-gray-700 text-white">
          <h2 className="text-lg font-medium">{project.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-8 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl h-full max-h-[calc(90vh-120px)] overflow-y-auto relative">
            <Image
              src={project.previewImage}
              alt={project.name}
              width={800}
              height={600}
              className="max-w-full h-auto mx-auto rounded-md mb-8"
            />
            {isLoadingMarkdown ? (
              <p className="text-gray-700 mt-6 text-center">Loading project details...</p>
            ) : (
              <div className="prose max-w-none text-gray-800 mt-6 text-left" dangerouslySetInnerHTML={{ __html: markdownContent || '' }} />
            )}
            {project.markdownPath && (
              <div className="text-center mt-8">
                <a
                  href={project.markdownPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors inline-flex items-center"
                >
                  Download Document
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
