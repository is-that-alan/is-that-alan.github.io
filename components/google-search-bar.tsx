
import { Search } from "lucide-react";

interface GoogleSearchBarProps {
  defaultValue?: string;
}

export default function GoogleSearchBar({ defaultValue }: GoogleSearchBarProps) {
  return (
    <div className="flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input type="text" defaultValue={defaultValue} placeholder="Search Google or type a URL" className="bg-white border border-gray-300 rounded-full w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  );
}
