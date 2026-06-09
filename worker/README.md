# AI Overview Worker

A Cloudflare Worker that powers the live "AI Overview" on alanwong.dev. It holds
the Gemini + OpenRouter API keys server-side and fails over Gemini → OpenRouter,
answering only from context the site sends. Keys never touch the browser.

## One-time setup

```bash
npm install -g wrangler          # if you don't have it
cd worker
wrangler login                   # authenticate with your Cloudflare account
```

## Add your API keys as secrets (never committed)

```bash
wrangler secret put GEMINI_API_KEY        # paste your Google AI Studio key
wrangler secret put OPENROUTER_API_KEY    # paste your OpenRouter key
```

## Deploy

```bash
wrangler deploy
```

Wrangler prints the Worker URL, e.g. `https://alanwong-ai-overview.<you>.workers.dev`.

## Point the site at it

Set the env var at build time so the site enables the live answer:

```bash
# .env.local (local) or your CI/Pages build env
NEXT_PUBLIC_AI_WORKER_URL=https://alanwong-ai-overview.<you>.workers.dev
```

Rebuild/redeploy the site. With the var unset, the site silently uses the
static canned overview — no live calls, no errors.

## Test it

```bash
curl -s https://alanwong-ai-overview.<you>.workers.dev \
  -H "Origin: https://alanwong.dev" -H "Content-Type: application/json" \
  -d '{"query":"what has alan won?","context":"Alan Wong won the AWS AI League Hong Kong championship in 2025."}'
# -> {"answer":"...","provider":"Gemini"}
```

## Config knobs (`wrangler.toml [vars]`)

- `ALLOWED_ORIGINS` — comma-separated origins allowed to call the worker.
- `GEMINI_MODEL` / `OPENROUTER_MODEL` — swap models without code changes.

## Recommended hardening (optional)

- In the Cloudflare dashboard, add a **Rate Limiting rule** on the Worker route
  (e.g. 20 req/min per IP) so the free quota can't be drained.
- For stronger bot protection, add **Cloudflare Turnstile** and verify the token
  in the worker before calling a provider.
