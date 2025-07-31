"use client"
import { callGeminiApi } from "@/lib/gemini";
import { Search, Mic, Camera } from "lucide-react";
import { ApiKeyDialog } from "@/components/ui/api-key-dialog";
import { useState, useEffect } from "react"
import Image from "next/image"

import { useRouter } from "next/navigation";
import TopRightNav from "@/components/top-right-nav";
import Footer from "@/components/footer";

const GEMINI_SEARCH_ENABLED = false; // Feature flag for Gemini search

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("");
  const [useGemini, setUseGemini] = useState(GEMINI_SEARCH_ENABLED);
  const [isLoading, setIsLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (useGemini && !geminiApiKey) {
        setShowApiKeyDialog(true);
      } else if (!useGemini) {
        setGeminiApiKey(null);
        setShowApiKeyDialog(false);
      }
    }
  }, [useGemini, geminiApiKey]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (useGemini) {
      if (!geminiApiKey) {
        setShowApiKeyDialog(true);
        return;
      }
      router.push(`/gemini-result?q=${encodeURIComponent(searchQuery.trim())}&apiKey=${encodeURIComponent(geminiApiKey)}`);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#202124] antialiased">
      <TopRightNav />

      <main className="flex flex-col items-center justify-center flex-1">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/alanwong_dev_logo.png"
            alt="alanwong.dev"
            width={600}
            height={200}
            className="w-full max-w-[300px] md:max-w-[600px] h-auto"
          />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-[90%] md:max-w-[782px] px-4 md:px-0 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 px-6 border border-[#dfe1e5] rounded-full focus:border-[#4285f4] focus:shadow-[0_1px_6px_rgba(32,33,36,0.28)] outline-none text-[20px] text-[#202124] shadow-sm hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)]"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
              <Mic className="w-6 h-6 text-[#5f6368] cursor-pointer hover:text-[#202124]" />
              <Camera className="w-6 h-6 text-[#5f6368] cursor-pointer hover:text-[#202124]" />
              <button type="submit">
                <Search className="w-5 h-5 text-[#5f6368] cursor-pointer" />
              </button>
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex space-x-2 mb-8">
          <button
            onClick={handleSearch}
            className="h-9 px-4 bg-[#f8f9fa] border border-[#f8f9fa] rounded text-[#3c4043] text-[14px] hover:bg-[#f1f3f4] hover:border-[#dadce0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all"
          >
            Search
          </button>
          <button
            onClick={() => {
              setSearchQuery("I'm feeling lucky")
              router.push("/search?q=I'm feeling lucky")
            }}
            className="h-9 px-4 bg-[#f8f9fa] border border-[#f8f9fa] rounded text-[#3c4043] text-[14px] hover:bg-[#f1f3f4] hover:border-[#dadce0] hover:shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-all"
          >
            I'm Feeling Lucky
          </button>
        </div>

        {/* Language options */}
          <div className="text-sm text-[#5f6368]">
            alanwong.dev not offered in:
            <span
              className="text-[#4285f4] cursor-pointer hover:underline ml-2"
              tabIndex={0}
              role="button"
            >
              繁體中文
            </span>
            <span
              className="text-[#4285f4] cursor-pointer hover:underline ml-2"
              tabIndex={0}
              role="button"
            >
              Française
            </span>
          </div>
        {/* Feature Flag */}
        {GEMINI_SEARCH_ENABLED && (
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="use-gemini"
              checked={useGemini}
              onChange={(e) => setUseGemini(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="use-gemini" className="text-sm text-gray-600">Enable Gemini Search (Warning: Insecure Demo)</label>
          </div>
        )}

        {GEMINI_SEARCH_ENABLED && (
          <ApiKeyDialog
            isOpen={showApiKeyDialog}
            onClose={() => setShowApiKeyDialog(false)}
            onSave={(key) => {
              setGeminiApiKey(key);
              setShowApiKeyDialog(false);
            }}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
