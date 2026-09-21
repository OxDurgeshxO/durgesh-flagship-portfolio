# Public Claims Registry & Evidence Tracking

This registry records every externally verifiable public claim, metric, repository reference, and count rendered across the portfolio UI. Unverifiable or simulated claims are explicitly labelled.

| Claim ID | Category | Claim Value | Display Surface | Evidence / Source | Status |
|---|---|---|---|---|---|
| CLM-01 | Stat | 9 Public Repos | `AboutSection`, `ProofStrip` | GitHub account OxDurgeshxO, verified `public_repos = 9` | Grounded (Corrected from a previously stated 18; note `lib/stats.ts` still hardcodes `publicRepos: 18` and must be updated separately) |
| CLM-02 | Stat | 5 Verified Live Deployments | `AboutSection`, `ProofStrip` | Live URLs: RoleRadar, MarketMatch-AI, Jarvis, Bank Churn Studio, Portfolio | Unverified — no committed artifact records a deployment check; URL reachability was not verified in this audit |
| CLM-03 | Stat | 3 Years Coding Experience | `AboutSection` | Developer biographical record | Grounded |
| CLM-04 | Stat | 10 AI Projects | `AboutSection`, `ProofStrip` | Repositories with AI/ML classifications | NOT GROUNDED — the account has only 9 public repositories in total, so 10 AI *repositories* is impossible; the figure is not supported by any committed artifact |
| CLM-05 | Release | v2.0.0 Release | `app/changelog/page.tsx` | ~~Semantic version in `package.json` / git tag `v2.0.0`~~ | NOT GROUNDED / REMOVED as a release claim — `git ls-remote --tags origin` returns nothing, so no `v2.0.0` tag exists. The string `2.0.0` exists only as the `package.json` version and the CHANGELOG heading; there is no tagged release |
| CLM-06 | Performance | <0.01 CLS (0.002) | `app/changelog/page.tsx` | Reported local/synthetic profile | NOT GROUNDED as "measured" — no committed artifact captures CLS. The only measured build figures are shared First Load JS 87.6 kB, home First Load JS 177 kB and 20 static pages |
| CLM-07 | Model Metric | 89.3% Accuracy | `CNN-STREAMLIT` Case Study | PyTorch evaluation on 10,000 unseen Fashion-MNIST test images | Grounded |
| CLM-08 | Repo | OxDurgeshxO/RoleRadar | `lib/github-health.ts`, `lib/github.ts` | https://github.com/OxDurgeshxO/RoleRadar | Grounded |
| CLM-09 | Repo | OxDurgeshxO/MarketMatch-AI | `lib/github-health.ts`, `lib/github.ts` | https://github.com/OxDurgeshxO/MarketMatch-AI | Grounded |
| CLM-10 | Repo | OxDurgeshxO/fitness-platform-architecture | `lib/github-health.ts` | https://github.com/OxDurgeshxO/fitness-platform-architecture | Grounded |
| CLM-11 | Repo | OxDurgeshxO/jarvis-realtime-assistant | `lib/github-health.ts`, `lib/github.ts` | https://github.com/OxDurgeshxO/jarvis-realtime-assistant | Grounded |
| CLM-12 | Repo | OxDurgeshxO/bank-churn-prediction-studio | `lib/github-health.ts`, `lib/github.ts` | https://github.com/OxDurgeshxO/bank-churn-prediction-studio | Grounded |
| CLM-13 | Repo | OxDurgeshxO/CNN-STREAMLIT | `lib/github-health.ts`, `lib/github.ts` | https://github.com/OxDurgeshxO/CNN-STREAMLIT | Grounded |
| CLM-14 | Repo | OxDurgeshxO/durgesh-flagship-portfolio | `lib/github-health.ts` | https://github.com/OxDurgeshxO/durgesh-flagship-portfolio | Grounded |
| CLM-15 | AI Lab | Deterministic Heuristic Cluster | `functions/api/lab/marketmatch.ts` | In-memory RFM segment distribution | Demonstration (labelled) |
| CLM-16 | AI Lab | ATS Keyword Match Rule Engine | `functions/api/lab/resume.ts` | Deterministic taxonomy matching | Demonstration (labelled) |

---

**Audit note (2026-09-22):** Every row was re-checked against repository artifacts and live account facts. `Grounded` now requires either a measured build output or a reference that verifiably exists in the committed source. Rows whose stated evidence could not be substantiated are marked `Unverified`, and rows contradicted by evidence are marked `NOT GROUNDED`; neither may be rendered in the UI as a verified claim.
