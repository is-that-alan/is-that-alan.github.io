"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "next/link";

import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import CannedOverview from "@/components/canned-overview";
import LiveOverview from "@/components/live-overview";
import { siteIndex } from "@/lib/site-index";
import { searchSite } from "@/lib/search";
import { PROFILE_CONTEXT } from "@/lib/profile";
import { matchOverview, fallbackOverview, sanitizeQuery } from "@/lib/ai-overview";
import { AI_ANSWER_ENABLED } from "@/lib/ai-config";

function SearchResults() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const query = sanitizeQuery(rawQuery);

  const isLucky = searchParams.get("lucky") === "1";

  const results = useMemo(() => {
    if (!query) return siteIndex;
    return searchSite(query);
  }, [query]);

  const overview = useMemo(() => {
    if (!query) return null;
    return matchOverview(query);
  }, [query]);

  // Show the canned overview when an intent matched, or a friendly fallback
  // when the user searched but nothing strong matched.
  const overviewToShow = overview ?? (query ? fallbackOverview : null);

  // The whole knowledge base is tiny, so we hand the model everything about
  // Alan on every query rather than retrieving snippets — no question can
  // miss its context. (Fuse is still used for the ranked results list below.)
  const ragContext = PROFILE_CONTEXT;

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <Header>
        <GoogleSearchBar defaultValue={query} />
      </Header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {query && (
          <p className="text-sm text-[#5f6368] mb-4">
            {isLucky ? "AI snapshot for" : `About ${results.length} result${results.length === 1 ? "" : "s"} for`}{" "}
            <span className="text-[#202124] font-medium">“{query}”</span>
          </p>
        )}

        {overviewToShow && (
          <div className="mb-8">
            {AI_ANSWER_ENABLED ? (
              <LiveOverview query={query} context={ragContext} intent={overviewToShow} />
            ) : (
              <CannedOverview intent={overviewToShow} />
            )}
          </div>
        )}

        <div className="space-y-7">
          {results.map((item) => (
            <div key={item.url}>
              <div className="text-sm text-[#0b8043] mb-0.5">{item.displayUrl}</div>
              <h3 className="text-xl text-[#1a0dab] hover:underline mb-1">
                <Link href={item.url} target={item.url.startsWith("http") ? "_blank" : "_self"}>
                  {item.title}
                </Link>
              </h3>
              <p className="text-sm text-[#4d5156] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {query && results.length === 0 && (
          <div className="mt-6 text-[#4d5156]">
            <p className="mb-2">
              No pages matched <span className="font-medium">“{query}”</span>.
            </p>
            <p className="text-sm">
              Try “experience”, “projects”, “achievements”, “skills”, or “contact”.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SearchResults />
    </Suspense>
  );
}
