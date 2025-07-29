"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import LogoHeader from "@/components/logo-header"
import Navigation from "@/components/navigation"

import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import Image from "next/image";

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
        <div class="text-sm text-gray-500 mb-4">About 1 result (0.15 seconds) for "${searchQuery}"</div>
        
        <div>
          <h3 class="text-xl text-blue-600 hover:underline cursor-pointer mb-1">
            I'm Feeling Lucky - AI Generated Result
          </h3>
          <div class="text-sm text-green-700 mb-2">https://yourportfolio.github.io/ai-results</div>
          <p class="text-sm text-gray-700 leading-relaxed">
            This is an AI-generated response for the "I'm Feeling Lucky" search. The content is dynamically created based on your search query
            using advanced language models to provide relevant and contextual information.
          </p>
        </div>
      </div>
    `
    setResults(mockHtml)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header>
        <GoogleSearchBar defaultValue={query} />
      </Header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Left side - Search results */}
          <div className="flex-1 max-w-2xl">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Searching...</span>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: results }} />
            )}
          </div>

          {/* Right side - Knowledge panel */}
          <div className="w-80 flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="text-center mb-4">
                <h2 className="text-xl font-normal text-gray-900">I'm Feeling Lucky</h2>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-gray-700 leading-relaxed">
                  This is a placeholder for the knowledge panel on the "I'm Feeling Lucky" page. You can add any relevant information here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
