import fs from 'node:fs'
import path from 'node:path'

const USERNAME = 'OxDurgeshxO'
const CACHE_PATH = path.resolve(process.cwd(), 'public/data/github-cache.json')

async function run() {
  console.log('[GitHub Cache] Syncing repository metadata...')
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&type=public`, {
      headers: {
        'User-Agent': 'durgesh-portfolio-build-cache',
        Accept: 'application/vnd.github.v3+json',
      },
      signal: AbortSignal.timeout(6000),
    })

    if (!res.ok) {
      console.warn(`[GitHub Cache] GitHub API returned status ${res.status}. Preserving current cache.`)
      ensureFallbackCache()
      return
    }

    const repos = await res.json()
    if (Array.isArray(repos) && repos.length > 0) {
      fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true })
      fs.writeFileSync(
        CACHE_PATH,
        JSON.stringify(
          {
            syncedAt: new Date().toISOString(),
            source: 'github-api',
            count: repos.length,
            repos,
          },
          null,
          2
        )
      )
      console.log(`[GitHub Cache] Successfully cached ${repos.length} repositories to public/data/github-cache.json`)
    } else {
      ensureFallbackCache()
    }
  } catch (err) {
    console.warn(`[GitHub Cache] Network fetch skipped (${err.message}). Preserving current cache.`)
    ensureFallbackCache()
  }
}

function ensureFallbackCache() {
  if (fs.existsSync(CACHE_PATH)) {
    console.log('[GitHub Cache] Retaining existing cached repository payload.')
    return
  }
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true })
  fs.writeFileSync(
    CACHE_PATH,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        source: 'static-fallback',
        count: 5,
        repos: [],
      },
      null,
      2
    )
  )
  console.log('[GitHub Cache] Initialized fallback cache stub.')
}

run()
