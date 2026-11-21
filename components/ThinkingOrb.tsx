import React from 'react';
import { motion } from 'framer-motion';

interface ThinkingOrbProps {
  status?: 'idle' | 'listening' | 'thinking' | 'speaking';
  size?: number;
  showBetaBadge?: boolean;
}

export const ThinkingOrb: React.FC<ThinkingOrbProps> = ({
  status = 'thinking',
  size = 120,
  showBetaBadge = false
}) => {
  const getGlow = () => {
    switch (status) {
      case 'listening': return 'rgba(34, 197, 94, 0.4)';  // emerald
      case 'thinking': return 'rgba(168, 85, 247, 0.4)';  // purple
      case 'speaking': return 'rgba(6, 182, 212, 0.5)';   // cyan
      default: return 'rgba(148, 163, 184, 0.2)';         // slate
    }
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Outer ambient blur aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{ backgroundColor: getGlow() }}
      />

      {/* Pulsing core orb */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="relative z-10 w-2/3 h-2/3 rounded-full border border-white/20 bg-gradient-to-tr from-cyan-400/20 via-violet-500/20 to-fuchsia-500/20 backdrop-blur-md shadow-inner flex items-center justify-center"
      >
        {/* Core center dot */}
        <div className="w-3 h-3 rounded-full bg-white shadow-lg animate-ping" />
      </motion.div>

      {showBetaBadge && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/40 bg-purple-500/10 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-purple-300">
            <span className="size-1 rounded-full bg-purple-400 animate-pulse" />
            BETA • THINKING ORB
          </span>
        </div>
      )}
    </div>
  );
};
