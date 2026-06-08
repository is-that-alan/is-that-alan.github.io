'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";
import Footer from "@/components/footer";
import { callGemini } from '@/lib/gemini';

function GeminiResultContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const apiKey = searchParams.get('apiKey');

  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || !apiKey) {
      setError('Missing search query or API key.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    callGemini(query, (chunk) => {
      setResult((prevResult) => prevResult + chunk);
    }).then(() => {
      setIsLoading(false);
    }).catch((e) => {
      setError(e.message);
      setIsLoading(false);
    });

  }, [query, apiKey]);

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
          {isLoading && !result && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function GeminiResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeminiResultContent />
    </Suspense>
  );
}
