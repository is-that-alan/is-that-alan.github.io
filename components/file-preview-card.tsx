
import Image from "next/image";

interface FilePreviewCardProps {
  name: string;
  previewImage: string;
}

export default function FilePreviewCard({ name, previewImage }: FilePreviewCardProps) {
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
      </div>
    </div>
  );
}
