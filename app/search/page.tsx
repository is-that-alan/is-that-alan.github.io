"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

import Header from "@/components/header";
import GoogleSearchBar from "@/components/google-search-bar";
import CannedOverview from "@/components/canned-overview";
import { siteIndex, type SearchDoc } from "@/lib/site-index";
import { matchOverview, fallbackOverview, sanitizeQuery } from "@/lib/ai-overview";

const fuse = new Fuse<SearchDoc>(siteIndex, {
  includeScore: true,
  threshold: 0.45,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
    { name: "keywords", weight: 1.5 },
  ],
});

function SearchResults() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const query = sanitizeQuery(rawQuery);

  const isLucky = query.toLowerCase().includes("feeling lucky");

  const results = useMemo(() => {
    if (!query || isLucky) return siteIndex.map((doc) => ({ item: doc }));
    return fuse.search(query);
  }, [query, isLucky]);

  const overview = useMemo(() => {
    if (!query || isLucky) return null;
    return matchOverview(query);
  }, [query, isLucky]);

  // Show the canned overview when an intent matched, or a friendly fallback
  // when the user searched but nothing strong matched.
  const overviewToShow =
    overview ?? (query && !isLucky && results.length === 0 ? fallbackOverview : overview);

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      <Header>
        <GoogleSearchBar defaultValue={isLucky ? "" : query} />
      </Header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {query && !isLucky && (
          <p className="text-sm text-[#5f6368] mb-4">
            About {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <span className="text-[#202124] font-medium">“{query}”</span>
          </p>
        )}

        {overviewToShow && (
          <div className="mb-8">
            <CannedOverview intent={overviewToShow} />
          </div>
        )}

        <div className="space-y-7">
          {results.map(({ item }) => (
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

        {query && !isLucky && results.length === 0 && (
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
