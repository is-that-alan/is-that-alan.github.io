"use client";

import Link from "next/link";
import { FlaskConical, ArrowRight } from "lucide-react";
import type { OverviewIntent, OverviewLink } from "@/lib/ai-overview";

interface CannedOverviewProps {
  intent: OverviewIntent | { paragraphs: string[]; related: OverviewLink[] };
}

/**
 * Renders a pre-written "AI Overview". No model call — the content is fixed
 * server-authored text, so there's nothing to prompt-inject or jailbreak.
 */
export default function CannedOverview({ intent }: CannedOverviewProps) {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-xl p-6 shadow-sm font-sans">
      <div className="flex items-center gap-2 text-[#202124] mb-3">
        <FlaskConical className="w-5 h-5 text-[#1a73e8]" />
        <span className="text-sm font-bold">AI Overview</span>
        <span className="text-xs text-[#5f6368] font-normal ml-1">· generated from this site</span>
      </div>

      <div className="space-y-3 text-[15px] leading-7 text-[#202124]">
        {intent.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {intent.related.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[#f1f3f4] flex flex-wrap gap-2">
          {intent.related.map((r) => {
            const external = r.url.startsWith("http");
            return (
              <Link
                key={r.url + r.label}
                href={r.url}
                target={external ? "_blank" : "_self"}
                className="inline-flex items-center gap-1 text-sm text-[#1a73e8] bg-[#e8f0fe] hover:bg-[#d2e3fc] px-3 py-1.5 rounded-full transition-colors"
              >
                {r.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            );
          })}
        </div>
      )}

      <p className="mt-4 text-xs text-[#5f6368]">
        AI responses are assembled from this site's own content and may be incomplete.
      </p>
    </div>
  );
}
