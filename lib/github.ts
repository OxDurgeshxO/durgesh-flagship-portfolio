const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'OxDurgeshxO'

export interface GitHubProfile {
  login: string; name: string; bio: string | null;
  avatar_url: string; public_repos: number;
  followers: number; following: number; html_url: string;
  location: string | null; blog: string | null;
}

export interface GitHubRepo {
  id: number; name: string; description: string | null;
  stargazers_count: number; forks_count: number;
  language: string | null; html_url: string;
  topics: string[]; updated_at: string;
}

export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const res = await fetch(`https://api.github.com/users/${USERNAME}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to fetch GitHub profile')
  return res.json()
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=9&type=public`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('Failed to fetch GitHub repos')
  const data = await res.json()
  // Guard: API rate-limit returns an object, not an array
  if (!Array.isArray(data)) throw new Error('GitHub repos response is not an array')
  const repos = data as GitHubRepo[]
  return repos.filter(r => !r.name.startsWith('.')).slice(0, 9)
}
