"use client"
import { Search, Mic, Camera } from "lucide-react"
import type React from "react"
import Image from "next/image"

import { useRouter } from "next/navigation";
import { useState } from "react";
import TopRightNav from "@/components/top-right-nav";
import Footer from "@/components/footer";

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

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
            className="max-w-[90vw] h-auto"
          />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-[782px] max-w-[90%] mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder=""
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 px-6 border border-[#dfe1e5] rounded-full focus:border-[#4285f4] focus:shadow-[0_1px_6px_rgba(32,33,36,0.28)] outline-none text-[20px] text-[#202124] hover:shadow-[0_1px_6px_rgba(32,33,36,0.28)]"
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
        <div className="text-xs text-[#5f6368]">alanwong.dev offered in: 繁體中文 简体中文</div>
      </main>
      <Footer />
    </div>
  )
}
