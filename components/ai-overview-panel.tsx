"use client";

import { useState, useEffect } from 'react';
import { FlaskConical, ChevronDown, ChevronUp } from 'lucide-react';
import ShimmerLoader from './shimmer-loader';

export default function AiOverviewPanel({ bio }: { bio?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
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
    .gradient-fade {
      position: relative;
      overflow: hidden;
    }
    .gradient-fade::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff 80%);
      pointer-events: none;
    }
  `;

  if (isLoading) {
    return <ShimmerLoader />;
  }

  const sources = [
    { name: "Wikipedia", url: "https://en.wikipedia.org/", favicon: "/images/wikipedia_favicon.png" },
    { name: "BBC News", url: "https://www.bbc.com/news/", favicon: "/images/bbc_favicon.png" },
    { name: "The Onion", url: "https://theonion.com/", favicon: "/images/the_onion_favicon.png" },
  ];

  return (
    <>
      <style>{animationStyles}</style>
      <div className="bg-white border border-[#e0e0e0] rounded-[12px] p-6 shadow-sm font-sans fade-in">
        <div className="flex items-center justify-between text-[#202124] mb-4">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 mr-2 text-[#1a73e8]" />
            <span className="text-sm font-bold">Search Labs | AI Overview</span>
          </div>
          <div className="flex space-x-2">
            {sources.map((source) => (
              <a key={source.name} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-2 py-1 bg-[#f1f3f4] rounded-full text-xs text-[#5f6368] hover:bg-[#e8eaed]">
                <img src={source.favicon} alt={source.name} className="w-4 h-4 rounded-full" />
                <span>{source.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={`text-[#202124] text-base leading-6 ${!isExpanded ? 'gradient-fade max-h-60' : ''}`}>
          <p>
            {bio ? (
              <span className="bg-[#e8f0fe] font-semibold p-1 rounded">
                {bio}
              </span>
            ) : (
              <>
                <span className="bg-[#e8f0fe] font-semibold p-1 rounded">
                  This is an AI-generated overview for the "I'm Feeling Lucky" search.
                </span>
                The content is dynamically created based on your search query using advanced language models to provide relevant and contextual information. This panel is a placeholder to demonstrate the UI and animation of the Gemini-powered overviews in Google Search.
              </>
            )}
          </p>

          {isExpanded && (
            <div className="mt-6 flex flex-col md:flex-row gap-6 fade-in">
              <div className="flex-1">
                <p>This is the expanded content area. Here, you can provide more detailed information, additional context, or a more in-depth explanation of the topic. The layout is designed to be flexible and can accommodate various types of content, including text, images, and lists.</p>
              </div>
              <div className="w-full md:w-80 bg-[#e8f0fe] rounded-[12px] p-4">
                <h3 className="font-semibold text-[#202124] mb-3">Related Articles</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#202124] truncate">What Is SEO - Search Engine Optimization?</p>
                      <p className="text-xs text-[#5f6368]">23 Sept 2024 - Search Engine Land</p>
                    </div>
                    <div className="w-12 h-12 bg-[#e0e0e0] rounded-md"></div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#202124] truncate">What is SEO in digital marketing? - Mailchimp</p>
                      <p className="text-xs text-[#5f6368]">Mailchimp</p>
                    </div>
                    <div className="w-12 h-12 bg-[#e0e0e0] rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="inline-flex items-center px-4 py-2 border border-[#1a73e8] rounded-[16px] text-sm font-medium text-[#1a73e8] hover:bg-[#e8f0fe] transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Show more'}
            {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </>
  );
}