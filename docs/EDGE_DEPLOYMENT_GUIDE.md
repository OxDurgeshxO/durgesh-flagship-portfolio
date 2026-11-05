# Cloudflare Pages Edge Deployment & Secret Provisioning Guide

This operational manual documents production environment variables and KV namespace bindings required for the Edge Functions running under `/functions/api/`.

---

## 1. Cloudflare KV Rate Limiting Namespace (ISSUE-01 Remediation)

Edge functions in `/functions/api/` enforce IP rate limiting using Cloudflare KV via the `RATE_LIMIT` binding (see `lib/api/guards.ts`).

### Step-by-Step Provisioning:

1. **Create the KV Namespace using Wrangler CLI**:
   ```bash
   npx wrangler kv:namespace create PORTFOLIO_RATE_LIMIT
   ```
   *Expected output*:
   ```
   🌀 Creating namespace with title "durgesh-portfolio-PORTFOLIO_RATE_LIMIT"
   ✨ Success! Add the following to your configuration file:
   [[kv_namespaces]]
   binding = "RATE_LIMIT"
   id = "<GENERATED_KV_ID>"
   ```

2. **Bind the Namespace in `wrangler.toml`**:
   Uncomment lines 19–21 in `wrangler.toml` and paste the generated KV ID:
   ```toml
   [[kv_namespaces]]
   binding = "RATE_LIMIT"
   id = "<GENERATED_KV_ID>"
   ```

3. **Bind in Cloudflare Pages Dashboard** (for hosted deployments):
   - Navigate to **Cloudflare Dashboard** -> **Workers & Pages** -> **Pages**.
   - Select the `durgesh-portfolio` project.
   - Go to **Settings** -> **Functions** -> **KV namespace bindings**.
   - Click **Add binding**:
     - Variable name: `RATE_LIMIT`
     - KV namespace: `durgesh-portfolio-PORTFOLIO_RATE_LIMIT`
   - Save and redeploy.

### Fail-Safe Behavior:
If the `RATE_LIMIT` binding is absent (e.g. in local development without KV emulation), `lib/api/guards.ts` logs:
`[rate-limit] RATE_LIMIT KV binding is not configured — request was NOT throttled`
and fails open (`degraded: true`), allowing contact submissions and AI Lab calls without blocking legitimate users.

---

## 2. Resend API Email Gateway Secrets (ISSUE-02 Remediation)

The production contact form endpoint (`functions/api/contact.ts`) dispatches verified contact messages through the Resend API.

### Required Secrets:

| Secret Key | Purpose | Required in Production |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Resend API Authorization Token (`re_...`) | Yes |
| `CONTACT_TO_EMAIL` | Destination inbox for inquiries (e.g. `durgesh@...`) | Yes |

### Adding Secrets to Cloudflare Pages:

1. Open **Cloudflare Dashboard** -> **Workers & Pages** -> **Pages** -> `durgesh-portfolio`.
2. Navigate to **Settings** -> **Environment variables**.
3. Under **Production**, click **Add variables**:
   - `RESEND_API_KEY`: Enter your encrypted Resend API key.
   - `CONTACT_TO_EMAIL`: Enter your personal recipient email address.
4. Click **Save**.

### Simulation Mode Safeguard:
If `RESEND_API_KEY` is not configured in the environment, the endpoint operates in simulation mode:
- It returns HTTP `200 OK` with `{ ok: true, simulation: true }`.
- It logs a sanitized diagnostic message in Cloudflare Edge Logs.
- It prevents client-side contact submission errors.

---

## 3. Production Deployment Checklist

- [ ] All 21 static SSG routes prerendered (`npm run build`).
- [ ] Automated security audit clean (`npm run audit`).
- [ ] Link integrity verified (291 internal links, 0 broken).
- [ ] Playwright E2E suite passing (102/102 tests).
- [ ] KV namespace `RATE_LIMIT` bound in Pages dashboard.
- [ ] `RESEND_API_KEY` and `CONTACT_TO_EMAIL` set in Pages dashboard.
