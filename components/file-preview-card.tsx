
import Image from "next/image";

interface FilePreviewCardProps {
  name: string;
  previewImage: string;
  description: string;
  repoLink?: string;
  demoLink?: string;
}

export default function FilePreviewCard({ name, previewImage, description, repoLink, demoLink }: FilePreviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden group cursor-pointer">
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={previewImage}
          alt={name}
          width={200}
          height={160}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3 border-t border-gray-200">
        <p className="text-sm text-gray-800 font-medium truncate">{name}</p>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        <div className="flex space-x-4 mt-2">
          {repoLink && <a href={repoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Repo</a>}
          {demoLink && <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Demo</a>}
        </div>
      </div>
    </div>
  );
}
