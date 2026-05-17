'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  text: string
  className?: string
  wordClassName?: string
  staggerDelay?: number
}

export function StaggeredText({ text, className, wordClassName, staggerDelay = 0.06 }: Props) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  if (shouldReduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.25em] ${wordClassName ?? ''}`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
