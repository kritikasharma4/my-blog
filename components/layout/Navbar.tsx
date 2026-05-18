'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Essays', href: '/category/essays' },
  { label: 'Design', href: '/category/design' },
  { label: 'Thoughts', href: '/category/thoughts' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 100)
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim().length < 2) return
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  }

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

          {/* Search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-text-muted hover:text-accent-gold transition-colors"
            aria-label="Search"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 12l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

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

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-bg-base/90 backdrop-blur-md flex items-start justify-center pt-32 px-6"
            onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}
          >
            <motion.form
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSearch}
              className="w-full max-w-2xl"
            >
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by meaning — try: feeling lost, growing up..."
                  className="w-full bg-bg-surface border border-border rounded-xl px-6 py-5 font-lora text-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent-gold text-bg-base rounded-lg font-inter text-[13px] font-semibold hover:bg-accent-gold-hover transition-colors"
                >
                  Search
                </button>
              </div>
              <p className="font-inter text-[12px] text-text-muted mt-3 text-center tracking-wide">
                Press Enter to search · Esc to close
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
