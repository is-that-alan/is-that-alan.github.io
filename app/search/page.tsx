"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import LogoHeader from "@/components/logo-header"
import Navigation from "@/components/navigation"

import GoogleSearchBar from "@/components/google-search-bar";

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setLoading(true)
    // Mock data generation is now handled directly in the search page
    const mockHtml = `
      <div class="space-y-6">
        <div class="text-sm text-gray-500 mb-4">About 1,240,000 results (0.45 seconds) for "${searchQuery}"</div>
        
        <div>
          <h3 class="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
            ${searchQuery} - AI Generated Result
          </h3>
          <div class="text-sm text-green-700 mb-2">https://yourportfolio.github.io/ai-results</div>
          <p class="text-sm text-gray-700 leading-relaxed">
            This is an AI-generated response about ${searchQuery}. The content is dynamically created based on your search query
            using advanced language models to provide relevant and contextual information.
          </p>
        </div>

        <div>
          <h3 class="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
            Deep Dive: ${searchQuery} Analysis
          </h3>
          <div class="text-sm text-green-700 mb-2">ai.yourportfolio.dev/analysis</div>
          <p class="text-sm text-gray-700 leading-relaxed">
            Comprehensive AI analysis of ${searchQuery} including technical specifications, use cases, and implementation strategies.
            Generated in real-time using state-of-the-art language models.
          </p>
        </div>
      </div>
    `
    setResults(mockHtml)
    setLoading(false)
  }

  

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 flex items-center justify-between">
        <GoogleSearchBar />
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Searching...</span>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: results }} />
        )}
      </div>
    </div>
  )
}
