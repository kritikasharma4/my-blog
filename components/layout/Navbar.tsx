'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Essays', href: '/category/essays' },
  { label: 'Design', href: '/category/design' },
  { label: 'Thoughts', href: '/category/thoughts' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-3 bg-bg-base/80 backdrop-blur-md border-b border-border'
            : 'py-6 bg-transparent'
        )}
      >
        <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="font-playfair text-xl font-bold text-text-primary hover:text-accent-gold transition-colors">
            Kritika Sharma
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'font-inter text-sm tracking-wide transition-colors relative group',
                    pathname === href ? 'text-accent-gold' : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {label}
                  <span className={cn(
                    'absolute -bottom-0.5 left-0 h-px bg-accent-gold transition-all duration-300',
                    pathname === href ? 'w-full' : 'w-0 group-hover:w-full'
                  )} />
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={cn('w-6 h-px bg-text-primary transition-all', menuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('w-6 h-px bg-text-primary transition-all', menuOpen && 'opacity-0')} />
            <span className={cn('w-6 h-px bg-text-primary transition-all', menuOpen && '-rotate-45 -translate-y-2')} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 z-40 bg-bg-base md:hidden flex flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-playfair text-4xl text-text-primary hover:text-accent-gold transition-colors"
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
