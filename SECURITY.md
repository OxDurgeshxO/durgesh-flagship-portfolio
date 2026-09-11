# Security Policy

## Reporting a Vulnerability

If you discover a potential security vulnerability within this repository, please do not open a public issue. Instead, please disclose it responsibly:

- **Security Contact**: [durgeshdsinha@gmail.com](mailto:durgeshdsinha@gmail.com)
- **Response Target**: Within 48 hours

Please include a comprehensive summary of the vulnerability, reproduction steps, and any proof-of-concept code.

---

## Architectural Security Principles

This portfolio adheres strictly to defense-in-depth principles:

1. **Zero Client Secrets**:
   - No private API keys or access tokens are bundled or exposed in client JavaScript.
   - All external dispatch mechanisms (such as email delivery via Resend) operate exclusively through serverless Edge API routes.

2. **Ephemeral Edge Processing & Zero State Retention**:
   - The interactive AI Lab runs all mathematical and heuristic routines (joint-angle kinematics, ATS NLP token scoring, K-Means PCA clustering) client-side or in ephemeral Edge memory.
   - User inputs (resumes, video camera frames, cluster datasets) are never written to disk, stored in persistent databases, or used for model retraining.

3. **Privacy by Design**:
   - Webcam or microphone streams in the FitTrack demo are completely isolated in the user's browser via HTML5 Canvas and MediaPipe Web Workers.
   - Video frames never leave the client's local execution environment.

4. **Input Sanitization & Rate Limiting**:
   - All inbound payloads to `/api/contact`, `/api/lab/resume`, and `/api/lab/marketmatch` are validated against strict length, regex, and type schemas.
   - Global IP-based rate limiting (5 requests/minute) and honeypot field traps protect against automated abuse.

5. **Supply Chain & Dependency Hardening**:
   - Dependencies are tracked with exact lockfiles (`package-lock.json`).
   - GitHub Actions CI executes automated dependency reviews and CodeQL static application security testing (SAST).
