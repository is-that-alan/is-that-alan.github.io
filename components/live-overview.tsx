"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FlaskConical, ArrowRight, Sparkles } from "lucide-react";
import CannedOverview from "@/components/canned-overview";
import { AI_ANSWER_ENABLED } from "@/lib/ai-config";
import { generateAnswer } from "@/lib/ai-client";
import type { OverviewIntent, OverviewLink } from "@/lib/ai-overview";

type Intent = OverviewIntent | { paragraphs: string[]; related: OverviewLink[] };

interface LiveOverviewProps {
  query: string;
  context: string;
  intent: Intent;
}

const STYLES = `
  @keyframes aiShimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes aiWordIn {
    from { opacity: 0; transform: translateY(0.25em); filter: blur(2px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes aiFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .ai-shimmer-line { position: relative; overflow: hidden; border-radius: 8px; background: #e8f0fe; }
  .ai-shimmer-line::after {
    content: ""; position: absolute; inset: 0; transform: translateX(-100%);
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.65), transparent);
    animation: aiShimmer 0.9s infinite;
  }
  .ai-word { display: inline-block; opacity: 0; animation: aiWordIn 0.22s ease forwards; }
  .ai-fade-in { animation: aiFadeIn 0.3s ease forwards; }
`;

/** Renders text with a Google-style staggered word-by-word fade-in. */
function StreamingText({ text }: { text: string }) {
  // Keep whitespace (incl. newlines) as separate tokens so wrapping/line breaks survive.
  const tokens = text.split(/(\s+)/);
  let wordIdx = 0;
  return (
    <div className="text-[15px] leading-7 text-[#202124] whitespace-pre-wrap">
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        const delay = Math.min(wordIdx * 7, 700); // cap so long answers don't crawl
        wordIdx += 1;
        return (
          <span key={i} className="ai-word" style={{ animationDelay: `${delay}ms` }}>
            {tok}
          </span>
        );
      })}
    </div>
  );
}

function ShimmerSkeleton() {
  const widths = ["85%", "100%", "92%", "70%"];
  return (
    <div className="space-y-2.5">
      {widths.map((w, i) => (
        <div key={i} className="ai-shimmer-line h-5" style={{ width: w }} />
      ))}
    </div>
  );
}

/**
 * Tries to render a live, model-generated answer via Gemini -> OpenRouter,
 * with Google-style shimmer + streaming reveal. Falls back to the static
 * CannedOverview if disabled or all providers fail.
 */
export default function LiveOverview({ query, context, intent }: LiveOverviewProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [answer, setAnswer] = useState("");
  const [provider, setProvider] = useState("");

  useEffect(() => {
    if (!AI_ANSWER_ENABLED || !query) return;
    let cancelled = false;
    setStatus("loading");

    generateAnswer(query, context)
      .then((res) => {
        if (cancelled) return;
        setAnswer(res.answer);
        setProvider(res.provider);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [query, context]);

  // Disabled or failed → fall back to the static overview.
  if (!AI_ANSWER_ENABLED || status === "error" || status === "idle") {
    return <CannedOverview intent={intent} />;
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="bg-white border border-[#e0e0e0] rounded-xl p-6 shadow-sm font-sans">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-[#202124]">
            <FlaskConical className="w-5 h-5 text-[#1a73e8]" />
            <span className="text-sm font-bold">AI Overview</span>
          </div>
          {status === "loading" ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#1a73e8]">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Generating…
            </span>
          ) : (
            <span className="ai-fade-in inline-flex items-center gap-1 text-xs text-[#5f6368] bg-[#f1f3f4] px-2.5 py-1 rounded-full">
              <Sparkles className="w-3 h-3 text-[#1a73e8]" />
              via {provider}
            </span>
          )}
        </div>

        {status === "loading" ? (
          <ShimmerSkeleton />
        ) : (
          <>
            <StreamingText text={answer} />

            {intent.related.length > 0 && (
              <div
                className="ai-fade-in mt-4 pt-4 border-t border-[#f1f3f4] flex flex-wrap gap-2"
                style={{ animationDelay: "0.5s", animationFillMode: "both" }}
              >
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
              Generated by {provider} from this site's content, and may be incomplete.
            </p>
          </>
        )}
      </div>
    </>
  );
}
