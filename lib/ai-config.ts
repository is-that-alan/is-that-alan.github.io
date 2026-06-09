/**
 * Live AI answer config. The worker URL is injected at build time via
 * NEXT_PUBLIC_AI_WORKER_URL. When it's unset, the site silently uses the
 * static canned overview — no network calls, no errors.
 */
export const AI_WORKER_URL = process.env.NEXT_PUBLIC_AI_WORKER_URL || "";
export const AI_ANSWER_ENABLED = AI_WORKER_URL.length > 0;
