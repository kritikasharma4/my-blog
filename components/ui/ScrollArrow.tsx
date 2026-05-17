'use client'

import { motion } from 'framer-motion'

export function ScrollArrow() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 text-text-muted"
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
    >
      <span className="text-xs font-inter uppercase tracking-widest">Scroll</span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <path d="M8 0v20M1 13l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  )
}
