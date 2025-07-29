
"use client";

import { useState, useEffect } from 'react';
import { FlaskConical, ChevronDown } from 'lucide-react';
import ShimmerLoader from './shimmer-loader';

export default function AiOverviewPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Simulate a 2.5-second loading time
    return () => clearTimeout(timer);
  }, []);

  const animationStyles = `
    .fade-in {
      animation: fadeIn 0.5s ease-in-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  if (isLoading) {
    return <ShimmerLoader />;
  }

  const sources = [
    { name: "Wikipedia", url: "https://en.wikipedia.org/", favicon: "/images/wikipedia_favicon.png" },
    { name: "Google AI Blog", url: "https://ai.googleblog.com/", favicon: "/images/google_ai_favicon.png" },
    { name: "DeepMind", url: "https://deepmind.google/", favicon: "/images/deepmind_favicon.png" },
  ];

  return (
    <>
      <style>{animationStyles}</style>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm font-sans fade-in">
        <div className="flex items-center justify-between text-gray-800 mb-4">
          <div className="flex items-center">
            <FlaskConical className="w-5 h-5 mr-2 text-blue-600" />
            <span className="font-semibold">AI Overview</span>
          </div>
          <div className="flex space-x-2">
            {sources.map((source) => (
              <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700 hover:bg-gray-200">
                <img src={source.favicon} alt={source.name} className="w-4 h-4 rounded-full" />
                <span>{source.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="text-gray-700 text-base leading-relaxed">
          <p>
            <span className="bg-blue-100 font-semibold p-1 rounded">
              This is an AI-generated overview for the "I'm Feeling Lucky" search.
            </span>
            The content is dynamically created based on your search query using advanced language models to provide relevant and contextual information. This panel is a placeholder to demonstrate the UI and animation of the Gemini-powered overviews in Google Search.
          </p>
        </div>

        <div className="text-center my-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {isExpanded ? 'Show less' : 'Show more'}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-6 flex flex-col md:flex-row gap-6 fade-in">
            <div className="flex-1 text-gray-700 text-base leading-relaxed">
              <p>This is the expanded content area. Here, you can provide more detailed information, additional context, or a more in-depth explanation of the topic. The layout is designed to be flexible and can accommodate various types of content, including text, images, and lists.</p>
            </div>
            <div className="w-full md:w-80 bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Related Articles</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 truncate">What Is SEO - Search Engine Optimization?</p>
                    <p className="text-xs text-gray-500">23 Sept 2024 - Search Engine Land</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 truncate">What is SEO in digital marketing? - Mailchimp</p>
                    <p className="text-xs text-gray-500">Mailchimp</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
