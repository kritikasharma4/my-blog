'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AskAuthorChat } from './AskAuthorChat'

export function AskAuthorButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-20 z-50 w-12 h-12 rounded-full bg-bg-surface border border-border flex items-center justify-center hover:border-accent-gold transition-colors"
        style={{ boxShadow: 'var(--shadow-md)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Ask the Author"
        title="Ask the Author"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 3V4z"
            stroke="#c9933a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 7h8M6 10h5" stroke="#c9933a" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.button>

      <AskAuthorChat isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
