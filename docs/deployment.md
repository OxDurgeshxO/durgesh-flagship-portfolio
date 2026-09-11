# Deployment Architecture & Production Operations

## Official Production Platform: Cloudflare Pages

The primary production deployment target for `durgesh-flagship-portfolio` is **Cloudflare Pages**.

### Configuration

The production environment is configured via `wrangler.toml`:

```toml
name = "durgesh-portfolio-v2"
compatibility_date = "2024-09-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

### Build Pipeline

1. **Build Tool**: `@cloudflare/next-on-pages` converts the Next.js App Router application into an edge-compatible static distribution and Cloudflare Functions bundle.
2. **Build Command**:
   ```bash
   npx @cloudflare/next-on-pages@1
   ```
3. **Output Directory**: `.vercel/output/static`

---

## Environment Variables

| Variable | Environment | Required | Description |
| :--- | :--- | :---: | :--- |
| `RESEND_API_KEY` | Server (Edge) | Yes (Production) | Bearer token for Resend REST API email dispatch |
| `CONTACT_TO_EMAIL` | Server (Edge) | No | Destination inbox (defaults to `durgeshdsinha@gmail.com`) |
| `NEXT_PUBLIC_EMAIL` | Client | No | Public display email |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Client / Server | No | GitHub API handle (defaults to `OxDurgeshxO`) |
| `NEXT_PUBLIC_LINKEDIN_URL` | Client | No | LinkedIn profile URL |

---

## Deployment Quality Gate Sequence

Before any deployment is promoted to production:

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm test
```

If any step in the quality pipeline fails, the build artifact is rejected and no deployment is executed.

---

## Rollback Protocol

1. **Instant Cloudflare Rollback**: In the Cloudflare Pages dashboard, locate the last successful deployment hash under **Deployments** and click **Rollback to this deployment**. Rollbacks take effect globally across Anycast edges in < 5 seconds.
2. **Git Rollback**:
   ```bash
   git revert <commit-sha>
   git push origin v2
   ```
