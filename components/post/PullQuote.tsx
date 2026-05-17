'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
}

export function PullQuote({ children }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-10 pl-6 border-l-[3px] border-accent-gold font-lora text-xl italic text-text-secondary leading-relaxed"
    >
      {children}
    </motion.blockquote>
  )
}
