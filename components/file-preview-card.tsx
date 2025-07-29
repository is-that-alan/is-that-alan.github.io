import Image from 'next/image';
import { FileText, MoreVertical } from 'lucide-react';

interface FilePreviewCardProps {
  name: string;
  previewImage: string;
  description: string; // Kept for modal functionality, not displayed on card
}

export default function FilePreviewCard({ name, previewImage }: FilePreviewCardProps) {
  return (
    <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center min-w-0">
            <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <span className="ml-3 font-medium text-gray-700 truncate">
              {name}
            </span>
          </div>
          <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full h-56 bg-gray-100 rounded-lg overflow-hidden relative flex items-center justify-center">
          <Image
            src={previewImage}
            alt={name}
            fill
            className="object-contain p-2"
          />
        </div>
      </div>
    </div>
  );
}