import { CHANGELOG_DATA } from './changelog';

/**
 * Portfolio headline statistics rendered as public claims.
 *
 * Each value must be independently verifiable, because a reviewer can and will check it.
 * Verified against the live GitHub API on 2026-09-22:
 *   - publicRepos: 9 — the account's `public_repos` field. Previously 18, which was double
 *     the real figure.
 *   - aiProjects: 7 — of the 8 non-fork repositories, 7 are AI/ML projects; the 8th is this
 *     portfolio repository itself. Previously 10, a number larger than the account's entire
 *     repository count.
 *   - verifiedDeployments: 5 — all five live URLs were probed and returned HTTP 200.
 *   - releasesCount: derived from CHANGELOG_DATA so it cannot drift from the changelog page.
 */
export const STATS = {
  yearsCoding: 3,
  publicRepos: 9,
  aiProjects: 7,
  flagshipCaseStudies: 5,
  verifiedDeployments: 5,
  releasesCount: CHANGELOG_DATA.length,
};
