# Deployment Architecture & Operations Runbook

## Production Platform: Cloudflare Pages

The flagship portfolio is statically exported via Next.js and deployed to **Cloudflare Pages**, with serverless edge functions handling dynamic endpoints.

### Build Configuration

- **Framework Preset**: Next.js (Static Export)
- **Build Command**: `npm run build`
- **Build Output Directory**: `out`
- **Edge Runtime Functions**: `functions/api/**` (Cloudflare Pages Functions)

### Wrangler Configuration (`wrangler.toml`)

```toml
name = "durgesh-portfolio-v2"
compatibility_date = "2024-11-11"
compatibility_flags = ["nodejs_compat", "nodejs_compat_populate_process_env"]
pages_build_output_dir = "out"

[[kv_namespaces]]
binding = "RATE_LIMIT"
id = "PORTFOLIO_RATE_LIMIT_KV_ID"
```

### Rate Limit KV Provisioning Runbook

To activate the KV rate limiting namespace in Cloudflare:
1. Authenticate Wrangler CLI: `npx wrangler login`
2. Create the production KV namespace:
   ```bash
   npx wrangler kv namespace create PORTFOLIO_RATE_LIMIT
   ```
3. Copy the output `id` into `wrangler.toml` under `[[kv_namespaces]]`.
4. Deploy via Cloudflare Dashboard or Pages Git integration.

---

## Environment Variables Specification

| Variable | Scope | Required | Description |
| :--- | :--- | :---: | :--- |
| `RESEND_API_KEY` | Server Edge | Yes (Production) | Bearer token for Resend transactional email API |
| `CONTACT_TO_EMAIL` | Server Edge | No | Destination email address for contact form submissions |
| `CONTACT_FROM_EMAIL` | Server Edge | No | From sender address configured in Resend domain |
| `NEXT_PUBLIC_EMAIL` | Client Bundle | No | Display contact email |
| `NEXT_PUBLIC_LINKEDIN_URL` | Client Bundle | No | LinkedIn profile URL |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Client Bundle | No | GitHub handle (defaults to `OxDurgeshxO`) |
| `NEXT_PUBLIC_PHONE` | Client Bundle | No | Contact phone number (defaults to empty) |

---

## Pre-Deployment Quality Gates

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run audit
npm run build
```
