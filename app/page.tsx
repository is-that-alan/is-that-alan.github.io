"use client"
import { Search, Mic, Camera } from "lucide-react";
import { ApiKeyDialog } from "@/components/ui/api-key-dialog";
import { useState, useEffect } from "react"
import Image from "next/image"

import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

const GEMINI_SEARCH_ENABLED = false; // Feature flag for Gemini search
const AI_SNAPSHOT_QUERY =
  "Give me a recruiter-ready snapshot of Alan Wong's strongest AI, data science, and leadership proof points.";

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

  const handleSearch = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
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

  const handleLucky = () => {
    const q = searchQuery.trim() || AI_SNAPSHOT_QUERY;
    setSearchQuery(q);
    router.push(`/search?q=${encodeURIComponent(q)}&lucky=1`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124]">
      <Header showLogo={false} className="shrink-0" />
      <main className="flex-1 flex flex-col">
        <div className="shrink-0 box-border min-h-[150px] h-[calc(100vh-590px)] max-h-[300px] flex items-end justify-center">
          <Image
            src="/images/alanwong_dev_logo.png"
            alt="alanwong.dev"
            width={420}
            height={72}
            priority
            className="h-auto w-[260px] sm:w-[340px] md:w-[420px]"
          />
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-[584px] px-4 sm:px-0 mx-auto pt-[52px]">
          <div className="relative flex h-[46px] items-center rounded-[24px] border border-[#dfe1e5] bg-white shadow-[0_1px_6px_rgba(32,33,36,0.18)] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)]">
            <button type="submit" aria-label="Search" className="absolute left-[13px] top-1/2 -translate-y-1/2 p-2">
              <Search className="w-[18px] h-[18px] text-[#5f6368]" />
            </button>
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-full w-full rounded-[24px] bg-transparent pl-[50px] pr-[92px] text-[16px] text-[#202124] outline-none"
            />
            <div className="absolute right-[13px] top-1/2 flex -translate-y-1/2 items-center gap-1.5">
              <button type="button" aria-label="Voice search" className="p-2">
                <Mic className="w-[18px] h-[18px] text-[#5f6368] hover:text-[#202124]" />
              </button>
              <button type="button" aria-label="Search by image" className="p-2">
                <Camera className="w-[18px] h-[18px] text-[#5f6368] hover:text-[#202124]" />
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center gap-3 pt-[30px]">
          <button
            onClick={handleSearch}
            className="h-9 min-w-[54px] rounded border border-[#f8f9fa] bg-[#f8f9fa] px-4 text-[14px] text-[#3c4043] hover:border-[#dadce0] hover:shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
          >
            Google Search
          </button>
          <button
            onClick={handleLucky}
            className="h-9 min-w-[54px] rounded border border-[#f8f9fa] bg-[#f8f9fa] px-4 text-[14px] text-[#3c4043] hover:border-[#dadce0] hover:shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
          >
            AI Snapshot
          </button>
        </div>

        <div className="mt-16 text-center text-[13px] leading-7 text-[#5f6368] sm:mt-[112px]">
          alanwong.dev not offered in:
          <span className="ml-2 cursor-pointer text-[#1a0dab] hover:underline" tabIndex={0} role="button">
            繁體中文
          </span>
          <span className="ml-2 cursor-pointer text-[#1a0dab] hover:underline" tabIndex={0} role="button">
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
