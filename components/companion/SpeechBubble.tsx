"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Search, ExternalLink, ArrowRight } from 'lucide-react'

interface SpeechBubbleProps {
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
}: SpeechBubbleProps) {
  const [inputQuery, setInputQuery] = useState('')
  const [showInput, setShowInput] = useState(false)

  // Determine positioning classes: dock securely ABOVE CyberBot
  let positionClasses = 'bottom-[104%] right-0'
  let tailClasses = '-bottom-2 right-12 border-r border-b border-purple-400/50 rotate-45'

  if (align === 'right') {
    // Bot is near left edge -> bubble docks above, aligned left
    positionClasses = 'bottom-[104%] left-0'
    tailClasses = '-bottom-2 left-12 border-l border-b border-purple-400/50 rotate-45'
  } else if (align === 'center') {
    // Bot is centered -> bubble centered above
    positionClasses = 'bottom-[104%] left-1/2 -translate-x-1/2'
    tailClasses = '-bottom-2 left-1/2 -translate-x-1/2 border-r border-b border-purple-400/50 rotate-45'
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputQuery.trim()) return
    onAskQuestion?.(inputQuery.trim())
    setInputQuery('')
    setShowInput(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className={`absolute w-72 sm:w-80 max-w-[calc(100vw-32px)] pointer-events-auto select-none z-50 ${positionClasses}`}
        >
          <div className="glass rounded-2xl p-4 border border-primary/40 shadow-2xl shadow-purple-500/25 backdrop-blur-2xl relative bg-popover">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-400" />
                </span>
                <span className="text-[11px] font-mono font-bold tracking-wider text-primary uppercase flex items-center gap-1.5">
                  {isListening ? (
                    <span className="text-emerald-400 flex items-center gap-1 animate-pulse">
                      <Mic className="size-3" /> Listening...
                    </span>
                  ) : tourStatus ? (
                    <span className="text-amber-400">
                      🧭 Tour: {tourStatus.title} ({tourStatus.current}/{tourStatus.total})
                    </span>
                  ) : (
                    <span>🤖 CyberBot • AI Companion</span>
                  )}
                </span>
              </div>
              {onDismiss && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss()
                  }}
                  className="text-muted-foreground hover:text-ink text-xs px-1.5 py-0.5 hover:bg-accent rounded transition-colors"
                  title="Close message (Esc)"
                  aria-label="Close speech bubble"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Listening Banner */}
            {isListening && (
              <div className="mb-2.5 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Speak: &quot;flip&quot;, &quot;projects&quot;, &quot;tour&quot;, or ask anything!</span>
              </div>
            )}

            {/* Message Body */}
            <p className="text-xs text-ink font-medium leading-relaxed mb-2.5">
              {message}
            </p>

            {/* Knowledge Action Link if query produced a deep link */}
            {knowledgeAction && (
              <div className="mb-3">
                <a
                  href={knowledgeAction.url}
                  target={knowledgeAction.url.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 transition-all active:scale-95"
                >
                  <span>{knowledgeAction.label}</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}

            {/* Suggested Question Chips (Only when tour not active) */}
            {!tourStatus && suggestedChips.length > 0 && !showInput && (
              <div className="mb-2.5 pt-1.5 border-t border-border/40 flex flex-wrap gap-1.5">
                {suggestedChips.slice(0, 3).map((chip) => (
                  <button
                    key={chip}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectChip?.(chip)
                    }}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 hover:bg-primary/20 text-slate-300 hover:text-primary border border-white/10 hover:border-primary/40 transition-all active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Custom Question Search Box */}
            {showInput ? (
              <form onSubmit={handleSearchSubmit} className="mb-2.5 flex items-center gap-1.5">
                <input
                  type="text"
                  autoFocus
                  placeholder="Ask anything about Durgesh..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-2.5 py-1 text-xs rounded-lg bg-background border border-primary/40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  title="Ask CyberBot"
                  aria-label="Submit question"
                >
                  <ArrowRight className="size-3.5" />
                </button>
              </form>
            ) : null}

            {/* Quick Action Pills */}
            <div className="flex items-center gap-2 pt-1 border-t border-border/60 flex-wrap">
              {tourStatus ? (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('tour-next')
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    ⏭️ {tourStatus.current === tourStatus.total ? 'Finish Tour' : 'Next Stop'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('tour-stop')
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all active:scale-95"
                  >
                    ⏹️ Exit Tour
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('flip')
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-primary/10 text-primary border border-primary/40 hover:bg-purple-500/35 transition-all active:scale-95"
                  >
                    🔄 Stunt
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowInput((v) => !v)
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-primary/15 text-primary border border-primary/40 hover:bg-purple-500/35 transition-all active:scale-95 flex items-center gap-1"
                  >
                    <Search className="size-3" />
                    <span>{showInput ? 'Close' : 'Ask Bot'}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('flip')
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-primary/10 text-primary border border-primary/40 hover:bg-purple-500/35 transition-all active:scale-95"
                  >
                    🔄 360° Stunt
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('quick-dial')
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all active:scale-95"
                  >
                    ⚡ Quick-Dial
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onAction) onAction('tour-start')
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all active:scale-95"
                  >
                    🧭 Tour
                  </button>
                </>
              )}
            </div>

            {/* Directional Tail Pointer */}
            <div className={`absolute w-3.5 h-3.5 bg-slate-950 ${tailClasses}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
