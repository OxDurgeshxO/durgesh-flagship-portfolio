# ADR 001: Standardization on Cloudflare Pages as Primary Production Platform

## Context
The repository initially maintained deployment configurations for both Netlify (`netlify.toml`) and Cloudflare Pages (`wrangler.toml`). Operating dual deployment platforms created pipeline ambiguity, conflicting environment variable requirements, and unneeded build scripts.

## Decision
Designate **Cloudflare Pages** via `@cloudflare/next-on-pages` as the official, sole production target. Decommission legacy `netlify.toml`.

## Alternatives Considered
1. **Netlify**: Solid developer experience, but higher cold-start latencies on edge serverless functions and slower global TTFB compared to Cloudflare Anycast edge routing.
2. **Vercel**: Native Next.js support, but Cloudflare Pages offers superior edge compute economics and zero egress fees.

## Consequences
- Single unambiguous production build path configured in `wrangler.toml`.
- All environment secrets managed via Cloudflare Pages dashboard.
- Sub-50ms edge API response times globally.
