/**
 * Live AI answer config, all injected at build time.
 *
 * Two ways to enable the live AI Overview:
 *   - NEXT_PUBLIC_AI_WORKER_URL  → calls a secure Worker that hides the keys.
 *   - NEXT_PUBLIC_GEMINI_API_KEY / NEXT_PUBLIC_OPENROUTER_API_KEY
 *                                → calls the providers directly from the browser
 *                                  (keys are public in the bundle — fine for free,
 *                                   no-payment keys; rotate if abused).
 *
 * If none are set, the site silently uses the static canned overview.
 */
export const AI_WORKER_URL = process.env.NEXT_PUBLIC_AI_WORKER_URL || "";
export const GEMINI_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
export const OPENROUTER_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";

export const GEMINI_MODEL = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash";
export const OPENROUTER_MODEL =
  process.env.NEXT_PUBLIC_OPENROUTER_MODEL || "google/gemma-4-31b-it:free";

export const AI_ANSWER_ENABLED = Boolean(AI_WORKER_URL || GEMINI_KEY || OPENROUTER_KEY);
