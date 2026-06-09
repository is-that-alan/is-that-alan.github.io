import Fuse from "fuse.js";
import { siteIndex, type SearchDoc } from "@/lib/site-index";

// Common words that shouldn't drive matching, so conversational queries like
// "what does alan do" or "can alan do python" match on the meaningful tokens.
const STOP = new Set([
  "what", "whats", "does", "do", "did", "is", "are", "was", "were", "the", "a", "an",
  "of", "to", "how", "who", "whom", "tell", "me", "about", "his", "her", "him", "he",
  "she", "they", "and", "or", "for", "in", "on", "at", "by", "has", "have", "had",
  "give", "can", "could", "would", "should", "you", "your", "i", "want", "know",
  "more", "please", "with", "this", "that", "any", "some", "show", "list", "alan",
  "wong", "alans", "there", "their",
]);

const fuse = new Fuse<SearchDoc>(siteIndex, {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [
    { name: "title", weight: 2 },
    { name: "description", weight: 1 },
    { name: "keywords", weight: 1.5 },
  ],
});

export function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9&+#\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/**
 * Token-aware search: matches each meaningful word independently and ranks
 * docs by how many query tokens they hit. Falls back to a whole-query fuzzy
 * pass, then to the full index, so the results list is never empty for a real
 * question. ("alan"/"wong" are stop-words here because they appear in every
 * page title and would otherwise match everything equally.)
 */
export function searchSite(query: string): SearchDoc[] {
  const tokens = tokenize(query);

  if (tokens.length > 0) {
    const acc = new Map<SearchDoc, { hits: number; score: number }>();
    for (const tok of tokens) {
      for (const r of fuse.search(tok)) {
        const cur = acc.get(r.item) || { hits: 0, score: 0 };
        cur.hits += 1;
        cur.score += 1 - (r.score ?? 1);
        acc.set(r.item, cur);
      }
    }
    if (acc.size > 0) {
      return [...acc.entries()]
        .sort((a, b) => b[1].hits - a[1].hits || b[1].score - a[1].score)
        .map(([doc]) => doc);
    }
  }

  // No meaningful tokens or nothing matched → try the whole phrase, else all pages.
  const whole = fuse.search(query).map((r) => r.item);
  return whole.length > 0 ? whole : siteIndex;
}
