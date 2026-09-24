'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Palette, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/lib/themes/provider'
import { THEMES, THEME_IDS, getTheme, ThemeId } from '@/lib/themes/registry'
import { trackEvent } from '@/lib/analytics'

/**
 * Theme selection panel.
 *
 * Six themes, all dark appearances — there is no day/night control because there
 * is no light mode. Accessibility:
 *  - the trigger is a button with aria-expanded / aria-haspopup
 *  - the list is a radiogroup with roving tabindex and arrow-key navigation
 *  - Escape closes and returns focus to the trigger
 *  - every change is announced through a polite live region
 */
export default function ThemeControl() {
  const { theme, setTheme, urlPinned } = useTheme()
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const popoverRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const meta = getTheme(theme)
  const order = THEME_IDS as readonly ThemeId[]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    popoverRef.current?.querySelector<HTMLElement>('[role="radio"][tabindex="0"]')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const choose = (id: ThemeId) => {
    setTheme(id)
    setAnnouncement(`Theme changed to ${getTheme(id).name}.`)
    trackEvent('theme_toggle', { action: 'theme', theme: id })
  }

  const move = (delta: number) => {
    const i = order.indexOf(theme)
    const next = order[(i + delta + order.length) % order.length]
    choose(next)
    const items = popoverRef.current?.querySelectorAll<HTMLElement>('[role="radio"]')
    items?.[order.indexOf(next)]?.focus()
  }

  const onListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      move(1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      move(-1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      choose(order[0])
    } else if (e.key === 'End') {
      e.preventDefault()
      choose(order[order.length - 1])
    }
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Choose theme (current: ${meta.name})`}
        title="Choose theme"
        className="h-8 px-2.5 rounded-full glass border-border hover:border-primary/50 bg-card/60 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer select-none"
      >
        <Palette className="size-3.5 text-[var(--primary)]" />
        <span
          aria-hidden
          className="w-3.5 h-3.5 rounded-full border border-border-strong"
          style={{ backgroundColor: meta.swatch[1] }}
        />
        <span className="text-[11px] font-mono text-body font-medium hidden lg:inline">
          {meta.name.split(' ')[0]}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
              ref={popoverRef}
              role="dialog"
              aria-label="Theme selection"
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.16 }}
              onKeyDown={onListKeyDown}
              className="absolute top-11 right-0 z-50 w-[20rem] p-3 rounded-2xl glass border-border bg-popover/95 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Theme
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {urlPinned ? 'URL preview · not saved' : 'dark appearances only'}
                </span>
              </div>

              <div role="radiogroup" aria-label="Select a theme" className="space-y-1">
                {THEMES.map((t) => {
                  const active = t.id === theme
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      tabIndex={active ? 0 : -1}
                      onClick={() => choose(t.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                        active
                          ? 'bg-primary/10 border border-primary/40'
                          : 'hover:bg-muted border border-transparent'
                      }`}
                    >
                      <span className="flex gap-1 shrink-0" aria-hidden>
                        {t.swatch.map((c, i) => (
                          <span
                            key={i}
                            className="w-3 h-3 rounded-full border border-border-strong"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-ink truncate">
                          {t.name}
                        </span>
                        <span className="block text-[10px] text-muted-foreground truncate">
                          {t.tagline} · {t.displayFont}
                        </span>
                      </span>
                      {active && <Check className="size-3.5 text-[var(--primary)] shrink-0" />}
                    </button>
                  )
                })}
              </div>

              <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono">
                  AA floor {meta.contrastFloor.toFixed(2)}:1
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {meta.usesGradient ? 'gradient headline' : 'solid headline'}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <span aria-live="polite" role="status" className="sr-only">
        {announcement}
      </span>
    </div>
  )
}
