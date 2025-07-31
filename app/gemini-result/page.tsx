"use client"

import { useState, useEffect } from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function GeminiResultPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedResult = localStorage.getItem('geminiResult');
      if (storedResult) {
        setResult(storedResult);
        setIsLoading(false);
      }
    }, 200); // Check for updates every 200ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
            <p className="font-bold">Warning: Experimental Feature</p>
            <p>This content is AI-generated HTML. Rendering untrusted HTML can be a security risk. Use with caution.</p>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Gemini Search Result</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="prose max-w-none">
              {result ? (
                <div dangerouslySetInnerHTML={{ __html: result }} />
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
