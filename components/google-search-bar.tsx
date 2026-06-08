"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GoogleSearchBarProps {
  defaultValue?: string;
}

export default function GoogleSearchBar({ defaultValue = "" }: GoogleSearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
      <div className="relative">
        <button type="submit" aria-label="Search" className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search alanwong.dev"
          maxLength={120}
          className="bg-white border border-gray-300 rounded-full w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
}
