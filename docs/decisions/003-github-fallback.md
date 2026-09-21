# ADR 003: Deterministic GitHub Telemetry Caching & Offline Fallback Architecture

## Context
The portfolio dynamically queries the GitHub REST API to showcase repository star counts, commit dates, and open issue counts on the homepage and `/github-health` dashboard. Unauthenticated GitHub API requests are strictly rate-limited to 60 requests/hour per IP address. Exceeding this limit would cause broken cards or error badges.

## Decision
Implement a multi-tier fallback cache in `lib/github.ts` and `lib/github-health.ts`:
1. **Edge/In-Memory Cache**: Cache successful responses with a 1-hour TTL.
2. **Deterministic Hardcoded Baseline**: If the GitHub API returns `HTTP 403 (Rate Limit Exceeded)` or network timeout, the application seamlessly serves verified repository telemetry records without UI interruption.
3. **Stale Data Timestamp**: Inform users with an audited timestamp when cached telemetry is in use.

## Alternatives Considered
1. **Client-Side GitHub Personal Access Token (PAT)**: Rejected due to catastrophic security risk of token exfiltration.
2. **Displaying API Error State**: Degrades user experience for recruiters and technical visitors.

## Consequences
- 100% uptime for repository showcases regardless of GitHub API rate limits.
- Zero client-side credentials exposure.
