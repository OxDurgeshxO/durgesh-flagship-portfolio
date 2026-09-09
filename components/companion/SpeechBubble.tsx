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
  align = 'center',
  onAction,
  onDismiss,
}: SpeechBubbleProps) {
  // Determine positioning classes based on screen alignment
  let positionClasses = '-top-32 left-1/2 -translate-x-1/2'
  let tailClasses = '-bottom-2 left-1/2 -translate-x-1/2'

  if (align === 'left') {
    // Bot is near right edge -> bubble appears to the left of bot
    positionClasses = 'top-0 right-[110%] -translate-y-4'
    tailClasses = 'top-8 -right-2 border-r border-t border-cyan-400/40 rotate-45'
  } else if (align === 'right') {
    // Bot is near left edge -> bubble appears to the right of bot
    positionClasses = 'top-0 left-[110%] -translate-y-4'
    tailClasses = 'top-8 -left-2 border-l border-b border-cyan-400/40 rotate-45'
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 6 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className={`absolute w-64 md:w-72 pointer-events-auto select-none z-50 ${positionClasses}`}
        >
          <div className="glass rounded-2xl p-4 border border-cyan-400/40 shadow-2xl shadow-cyan-500/25 backdrop-blur-2xl relative bg-slate-950/90">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  🧑‍💻 Durgesh • 3D Avatar
                </span>
              </div>
              {onDismiss && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDismiss()
                  }}
                  className="text-slate-400 hover:text-white text-xs px-1 hover:bg-white/10 rounded transition-colors"
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
            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
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
                className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/35 transition-all active:scale-95"
              >
                🚀 Top Projects
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
