'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const isHovering = useMotionValue(false)

  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onEnter = () => isHovering.set(true)
    const onLeave = () => isHovering.set(false)

    window.addEventListener('mousemove', onMove)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [mouseX, mouseY, isHovering])

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-accent-gold mix-blend-difference hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 10,
        height: 10,
      }}
    />
  )
}
