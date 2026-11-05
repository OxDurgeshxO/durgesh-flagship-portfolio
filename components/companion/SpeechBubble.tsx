"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Search, ExternalLink, ArrowRight, RotateCw, Zap, Compass, Music, X } from 'lucide-react'

export interface SpeechBubbleProps {
  message: string
  visible: boolean
  align?: 'left' | 'right' | 'center'
  tourStatus?: {
    current: number
    total: number
    title: string
  } | null
  knowledgeAction?: {
    url: string
    label: string
  } | null
  isListening?: boolean
  suggestedChips?: string[]
  onAction?: (action: string) => void
  onDismiss?: () => void
  onSelectChip?: (chip: string) => void
  onAskQuestion?: (query: string) => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onInputFocusChange?: (focused: boolean) => void
}

export default function SpeechBubble({
  message,
  visible,
  align = 'left',
  tourStatus = null,
  knowledgeAction = null,
  isListening = false,
  suggestedChips = [],
  onAction,
  onDismiss,
  onSelectChip,
  onAskQuestion,
  onMouseEnter,
  onMouseLeave,
  onInputFocusChange,
}: SpeechBubbleProps) {
  const [inputQuery, setInputQuery] = useState('')

  // Handle Escape key to dismiss bubble smoothly
  React.useEffect(() => {
    if (!visible) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onDismiss?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visible, onDismiss])

  // Determine positioning classes: dock securely ABOVE CyberBot
  let positionClasses = 'bottom-[104%] right-0'
  let tailClasses = '-bottom-2 right-12 border-r border-b border-purple-500/40 rotate-45'

  if (align === 'right') {
    // Bot is near left edge -> bubble docks above, aligned left
    positionClasses = 'bottom-[104%] left-0'
    tailClasses = '-bottom-2 left-12 border-l border-b border-purple-500/40 rotate-45'
  } else if (align === 'center') {
    // Bot is centered -> bubble centered above
    positionClasses = 'bottom-[104%] left-1/2 -translate-x-1/2'
    tailClasses = '-bottom-2 left-1/2 -translate-x-1/2 border-r border-b border-purple-500/40 rotate-45'
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputQuery.trim()) return
    onAskQuestion?.(inputQuery.trim())
    setInputQuery('')
    onInputFocusChange?.(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={`absolute w-80 sm:w-88 max-w-[calc(100vw-32px)] pointer-events-auto select-none z-50 ${positionClasses}`}
        >
          {/* Main Card with solid high-contrast dark surface to prevent text bleed-through */}
          <div className="rounded-2xl p-4 border border-purple-500/30 shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative bg-[#0b0f17]/96 text-slate-100">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
                </span>
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
                  {isListening ? (
                    <span className="text-emerald-400 flex items-center gap-1.5 animate-pulse">
                      <Mic className="size-3" /> Listening...
                    </span>
                  ) : tourStatus ? (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Compass className="size-3" /> Tour: {tourStatus.title} ({tourStatus.current}/{tourStatus.total})
                    </span>
                  ) : (
                    <span className="text-purple-300 flex items-center gap-1">
                      🤖 CyberBot AI Companion
                    </span>
                  )}
                </span>
              </div>
              {onDismiss && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss()
                  }}
                  className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
                  title="Close message (Esc)"
                  aria-label="Close speech bubble"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Listening Banner */}
            {isListening && (
              <div className="mb-2.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-[11px] text-emerald-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Speak: &quot;flip&quot;, &quot;projects&quot;, &quot;tour&quot;, &quot;dance&quot;, or ask a question!</span>
              </div>
            )}

            {/* Message Body */}
            <p className="text-[12.5px] text-slate-100 font-medium leading-relaxed mb-2.5">
              {message}
            </p>

            {/* Knowledge Action Link if query produced a deep link */}
            {knowledgeAction && (
              <div className="mb-2.5">
                <a
                  href={knowledgeAction.url}
                  target={knowledgeAction.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/50 transition-all active:scale-95"
                >
                  <span>{knowledgeAction.label}</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}

            {/* Suggested Question Chips (Compact Horizontal Flow) */}
            {!tourStatus && suggestedChips.length > 0 && (
              <div className="mb-2.5 pt-1.5 border-t border-white/10 flex flex-wrap gap-1.5">
                {suggestedChips.slice(0, 3).map((chip) => (
                  <button
                    key={chip}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectChip?.(chip)
                    }}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-white/10 hover:border-purple-500/40 transition-all active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Integrated Semantic Search Input */}
            {!tourStatus && (
              <form onSubmit={handleSearchSubmit} className="mb-3 relative flex items-center">
                <div className="absolute left-2.5 pointer-events-none text-slate-400">
                  <Search className="size-3.5" />
                </div>
                <input
                  id="cyberbot-query"
                  name="query"
                  type="text"
                  placeholder="Ask anything about Durgesh..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onFocus={() => onInputFocusChange?.(true)}
                  onBlur={() => onInputFocusChange?.(false)}
                  onClick={(e) => e.stopPropagation()}
                  autoComplete="off"
                  aria-label="Ask anything about Durgesh"
                  className="w-full pl-8 pr-8 py-1.5 text-xs rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-all"
                />
                <button
                  type="submit"
                  onClick={(e) => e.stopPropagation()}
                  disabled={!inputQuery.trim()}
                  className="absolute right-1 p-1 rounded-lg bg-purple-500 text-white disabled:opacity-30 disabled:hover:bg-purple-500 hover:bg-purple-600 transition-all active:scale-90"
                  title="Ask CyberBot"
                  aria-label="Submit question"
                >
                  <ArrowRight className="size-3" />
                </button>
              </form>
            )}

            {/* Quick Action Grid - Clean 2x2 layout prevents awkward orphan wrapping */}
            <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10">
              {tourStatus ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('tour-next')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>⏭️</span>
                    <span>{tourStatus.current === tourStatus.total ? 'Finish Tour' : 'Next Stop'}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('tour-stop')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/40 hover:bg-rose-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>⏹️</span>
                    <span>Exit Tour</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('flip')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <RotateCw className="size-3" />
                    <span>360° Stunt</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('quick-dial')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Zap className="size-3" />
                    <span>Quick-Dial</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('flip')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <RotateCw className="size-3" />
                    <span>360° Stunt</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('quick-dial')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Zap className="size-3" />
                    <span>Quick-Dial</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('tour-start')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Compass className="size-3" />
                    <span>Guided Tour</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('dance')
                    }}
                    className="px-2 py-1.5 rounded-lg text-[10.5px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/40 hover:bg-sky-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Music className="size-3" />
                    <span>Beat Dance</span>
                  </button>
                </>
              )}
            </div>

            {/* Directional Tail Pointer with matching dark solid background */}
            <div className={`absolute w-3.5 h-3.5 bg-[#0b0f17] ${tailClasses}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
