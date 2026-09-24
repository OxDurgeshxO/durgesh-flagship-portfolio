'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  DEFAULT_THEME,
  OBSOLETE_STORAGE_KEYS,
  THEME_STORAGE_KEY,
  ThemeId,
  getTheme,
  isThemeId,
} from './registry'

interface ThemeContextValue {
  theme: ThemeId
  /** True when a ?theme= override is driving the state (never persisted). */
  urlPinned: boolean
  setTheme: (theme: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Read the theme the boot script already resolved onto <html>. */
function readFromDom(): ThemeId {
  if (typeof document === 'undefined') return DEFAULT_THEME
  const t = document.documentElement.getAttribute('data-theme')
  return isThemeId(t) ? t : DEFAULT_THEME
}

/**
 * Read the stored theme.
 *
 * Used by the cross-tab listener, which must read STORAGE rather than the DOM:
 * a storage event fires in the tab that did NOT change, where the attributes are
 * still stale. (Re-reading the DOM there silently no-ops — a bug caught by the
 * verification harness in the earlier build.)
 */
function readFromStorage(): ThemeId | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemeId(t) ? t : null
  } catch {
    return null
  }
}

function hasUrlOverride(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return isThemeId(new URLSearchParams(window.location.search).get('theme'))
  } catch {
    return false
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Mirrors what the boot script already painted, so the first client render
  // agrees with the server-rendered attribute (no hydration jump).
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME)
  const [urlPinned, setUrlPinned] = useState(false)
  const [mounted, setMounted] = useState(false)
  /** Persist only after an explicit user action, never on first visit. */
  const userChose = useRef(false)

  useEffect(() => {
    setThemeState(readFromDom())
    setUrlPinned(hasUrlOverride())
    setMounted(true)

    const onStorage = (e: StorageEvent) => {
      if (e.key && e.key !== THEME_STORAGE_KEY) return
      const next = readFromStorage()
      if (next) setThemeState(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return
    const el = document.documentElement

    // Suppress hover transforms and entrance animations for the switch window so
    // the change reads as one deliberate event rather than a cascade.
    el.classList.add('theme-transitioning')
    el.setAttribute('data-theme', theme)
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { theme } }))

    const t = window.setTimeout(() => el.classList.remove('theme-transitioning'), 400)

    if (userChose.current && !urlPinned) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
        // Tidy up keys from the removed dual-mode build.
        OBSOLETE_STORAGE_KEYS.forEach((k) => localStorage.removeItem(k))
      } catch {
        // Storage blocked (private browsing / restricted context) — degrade quietly.
      }
    }
    return () => window.clearTimeout(t)
  }, [theme, mounted, urlPinned])

  const setTheme = useCallback((next: ThemeId) => {
    userChose.current = true
    setThemeState(next)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, urlPinned, setTheme }),
    [theme, urlPinned, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

export function useActiveThemeMeta() {
  const { theme } = useTheme()
  return getTheme(theme)
}
