"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpeechBubbleProps {
  message: string
  visible: boolean
  align?: 'left' | 'right' | 'center'
  onAction?: (action: string) => void
  onDismiss?: () => void
}

export default function SpeechBubble({
  message,
  visible,
  align = 'left',
  onAction,
  onDismiss,
}: SpeechBubbleProps) {
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ type: 'spring', stiffness: 420, damping: 26 }}
          className={`absolute w-72 sm:w-80 max-w-[calc(100vw-32px)] pointer-events-auto select-none z-50 ${positionClasses}`}
        >
          <div className="glass rounded-2xl p-4 border border-purple-500/40 shadow-2xl shadow-purple-500/25 backdrop-blur-2xl relative bg-slate-950/95">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-400" />
                </span>
                <span className="text-[11px] font-mono font-bold tracking-wider text-purple-300 uppercase">
                  🤖 CyberBot • AI Companion
                </span>
              </div>
              {onDismiss && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss()
                  }}
                  className="text-slate-400 hover:text-white text-xs px-1.5 py-0.5 hover:bg-white/10 rounded transition-colors"
                  title="Close message"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Message Body */}
            <p className="text-xs text-slate-100 font-medium leading-relaxed mb-3">
              {message}
            </p>

            {/* Quick Action Pills */}
            <div className="flex items-center gap-2 pt-1 border-t border-white/5 flex-wrap">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onAction) onAction('flip')
                }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/35 transition-all active:scale-95"
              >
                🔄 360° Stunt
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onAction) onAction('projects')
                }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/35 transition-all active:scale-95"
              >
                🚀 Top Projects
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onAction) onAction('next')
                }}
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/35 transition-all active:scale-95"
              >
                💬 Next Insight
              </button>
            </div>

            {/* Directional Tail Pointer */}
            <div className={`absolute w-3.5 h-3.5 bg-slate-950 ${tailClasses}`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
