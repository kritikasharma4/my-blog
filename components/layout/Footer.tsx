'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer ref={ref} className="mt-24 px-6 pb-12">
      {/* Glowing divider */}
      <div className="relative max-w-6xl mx-auto mb-12">
        <div className="h-px bg-border" />
        <motion.div
          className="absolute inset-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, var(--accent-gold) 50%, transparent 100%)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.5 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <Link href="/" className="font-playfair text-lg font-bold text-text-primary hover:text-accent-gold transition-colors">
            Kritika Sharma
          </Link>
          <span className="hidden md:block text-border">·</span>
          <p className="font-lora text-sm text-text-muted italic tracking-wide">
            Writing from wherever the light is good.
          </p>
        </div>

        <div className="flex items-center gap-6 text-text-muted font-inter text-[12px] uppercase tracking-widest">
          <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
          <Link href="/about" className="hover:text-accent-gold transition-colors">About</Link>
          <Link href="/search" className="hover:text-accent-gold transition-colors">Search</Link>
        </div>
      </motion.div>

      <motion.p
        className="text-center font-inter text-[11px] text-text-muted/50 tracking-wider mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        © {new Date().getFullYear()} — Built with care
      </motion.p>
    </footer>
  )
}
