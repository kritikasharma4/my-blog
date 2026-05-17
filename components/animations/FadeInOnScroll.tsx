'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeInOnScroll({ children, delay = 0, className }: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
