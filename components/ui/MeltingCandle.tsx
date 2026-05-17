'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function MeltingCandle() {
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const pct = Math.min(scrollTop / docHeight, 1)
      setProgress(pct)
      if (pct >= 0.99) setFinished(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (shouldReduce) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border">
        <div
          className="h-full bg-accent-gold transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    )
  }

  const CANDLE_W = 48
  const CANDLE_H = 96
  const WAX_MAX_H = 64
  const WAX_MIN_H = 8

  const waxHeight = WAX_MAX_H - (WAX_MAX_H - WAX_MIN_H) * progress
  const waxY = CANDLE_H - waxHeight - 16

  const dripProgress = Math.max(0, (progress - 0.3) / 0.7)
  const dripY = waxY + waxHeight + dripProgress * 12

  const progressPct = Math.round(progress * 100)

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1 group"
      title={`${progressPct}% through`}
      role="progressbar"
      aria-valuenow={progressPct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <svg
        width={CANDLE_W}
        height={CANDLE_H + 20}
        viewBox={`0 0 ${CANDLE_W} ${CANDLE_H + 20}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!finished && (
          <motion.ellipse
            cx={CANDLE_W / 2}
            cy={waxY - 10}
            rx={5}
            ry={8}
            fill="#c9933a"
            animate={{
              cy: [waxY - 10, waxY - 13, waxY - 9, waxY - 12, waxY - 10],
              rx: [5, 4, 6, 4.5, 5],
              opacity: [0.9, 1, 0.85, 1, 0.9],
            }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        )}

        {finished && (
          <motion.path
            d={`M${CANDLE_W / 2} ${waxY - 4} Q${CANDLE_W / 2 - 4} ${waxY - 12} ${CANDLE_W / 2} ${waxY - 20}`}
            stroke="#6b5c4e"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        )}

        <line
          x1={CANDLE_W / 2}
          y1={waxY}
          x2={CANDLE_W / 2}
          y2={waxY - 6}
          stroke="#3d3028"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <motion.rect
          x={8}
          y={waxY}
          width={CANDLE_W - 16}
          height={waxHeight}
          rx={4}
          fill="#f0e6d3"
          animate={{ y: waxY, height: waxHeight }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />

        {dripProgress > 0 && (
          <motion.ellipse
            cx={CANDLE_W / 2 + 6}
            cy={dripY}
            rx={3}
            ry={4 * dripProgress}
            fill="#f0e6d3"
            opacity={dripProgress}
          />
        )}

        <rect
          x={4}
          y={CANDLE_H}
          width={CANDLE_W - 8}
          height={6}
          rx={2}
          fill="#3d3028"
        />
      </svg>

      <span className="text-[10px] font-inter text-text-muted opacity-0 group-hover:opacity-100 transition-opacity tracking-wide">
        {progressPct}%
      </span>
    </div>
  )
}
