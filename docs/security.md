# Security & Privacy Architecture

## Threat Modeling & Defense-in-Depth

The portfolio incorporates defense-in-depth measures against common web application threat vectors:

---

## 1. Secrets & Credentials Isolation
- **Client Bundle Sanitization**: No private environment variables are prefixed with `NEXT_PUBLIC_`.
- **Serverless API Execution**: Inbound email dispatches via Resend are executed strictly in serverless edge handlers. API tokens are stored in Cloudflare environment secrets.
- **Automated Scans**: CI workflows run secret-scanning and AST static analysis to catch accidental credentials commits before merging.

---

## 2. API Abuse & Denial of Service Protection
- **Sliding-Window IP Rate Limiting**: `/api/contact` rejects requests exceeding 5 submissions per minute with `HTTP 429 Too Many Requests`.
- **Honeypot Trapping**: A hidden `_gotcha` form field silently captures bot spiders without executing external API calls.
- **Payload Sanitization**: Inbound JSON payloads are strictly bounded (e.g. name ≤ 100 characters, message ≤ 2,500 characters, regex email validation).

---

## 3. Client Hardware Isolation
- **Camera Access**: Strictly opt-in for the FitTrack AI Lab demo. Video streams run in local browser memory and never leave the device.
- **Microphone**: Zero microphone access across all components.
- **Web Audio**: CyberBot companion sound synthesis generates non-persistent sine waves through the HTML5 AudioContext API.
