"use client"

import { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function GeminiResultPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedResult = localStorage.getItem('geminiResult');
    if (storedResult) {
      setResult(storedResult);
    }
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gemini Search Result</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="prose max-w-none">
              {result ? (
                <p>{result}</p>
              ) : (
                <p>No result found. Please try another search.</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
