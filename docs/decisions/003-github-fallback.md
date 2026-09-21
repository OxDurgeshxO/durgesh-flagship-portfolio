# ADR 003: Deterministic GitHub Telemetry Caching & Offline Fallback Architecture

## Context
The portfolio dynamically queries the GitHub REST API to showcase repository star counts, commit dates, and open issue counts on the homepage and `/github-health` dashboard. Unauthenticated GitHub API requests are strictly rate-limited to 60 requests/hour per IP address. Exceeding this limit would cause broken cards or error badges.

## Decision
Implement a multi-tier fallback cache in `lib/github.ts` and `lib/github-health.ts`:
1. **Edge/In-Memory Cache**: Cache successful responses with a 1-hour TTL.
2. **Deterministic Hardcoded Baseline**: If the GitHub API returns `HTTP 403 (Rate Limit Exceeded)` or network timeout, the application seamlessly serves verified repository telemetry records without UI interruption.
3. **Stale Data Timestamp — NOT IMPLEMENTED**: No runtime indicator tells users when cached or fallback telemetry is being served. The only date in the codebase is the static constant `GITHUB_HEALTH_SNAPSHOT_DATE` (`'2026-09-21'`) attached to records as `asOfDate` / `snapshotDate`; that is a fixed data label, not a stale-cache signal, and the fallback path renders silently.

## Alternatives Considered
1. **Client-Side GitHub Personal Access Token (PAT)**: Rejected due to catastrophic security risk of token exfiltration.
2. **Displaying API Error State**: Degrades user experience for recruiters and technical visitors.

## Consequences
- 100% uptime for repository showcases regardless of GitHub API rate limits.
- Zero client-side credentials exposure.
