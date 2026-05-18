'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ScrollArrow } from '@/components/ui/ScrollArrow'

export function HomeHero() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-4xl mx-auto overflow-hidden">
      {/* Ambient orbs */}
      {!shouldReduce && (
        <>
          <motion.div
            className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(201,147,58,0.12) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[360px] h-[360px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(201,147,58,0.07) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      {/* Label */}
      <motion.p
        className="font-inter text-[12px] uppercase tracking-[0.25em] text-accent-gold mb-6"
        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        A personal journal
      </motion.p>

      {/* Headline — word by word */}
      <h1 className="font-playfair text-6xl md:text-8xl font-bold text-text-primary leading-tight mb-8">
        <AnimatedHeadline
          text="Thoughts, essays & beautiful things."
          shouldReduce={!!shouldReduce}
        />
      </h1>

      {/* Subtext */}
      <motion.p
        className="font-lora text-xl text-text-secondary max-w-lg leading-relaxed mb-16"
        initial={shouldReduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        A space for writing slowly and thinking clearly.
      </motion.p>

      {/* Divider line */}
      <motion.div
        className="w-16 h-px bg-accent-gold mb-16"
        initial={shouldReduce ? false : { scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
      />

      <ScrollArrow />
    </section>
  )
}

function AnimatedHeadline({ text, shouldReduce }: { text: string; shouldReduce: boolean }) {
  const words = text.split(' ')

  if (shouldReduce) return <span>{text}</span>

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 28, rotateX: -20 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.5, ease: 'easeOut' } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
