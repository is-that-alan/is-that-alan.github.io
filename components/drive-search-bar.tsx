
import { Search } from "lucide-react";

export default function DriveSearchBar({ searchTerm, onSearch }: { searchTerm: string; onSearch: (term: string) => void }) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex-1 max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search in Drive"
          className="bg-gray-100 border-none rounded-full w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:bg-white"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
