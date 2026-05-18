'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Category, Post } from '@/lib/sanity'
import { cn } from '@/lib/utils'
import { PostCard } from './PostCard'

interface Props {
  posts: Post[]
  categories: Category[]
}

const allPills = [{ _id: '__all__', title: 'All', slug: { current: null } }] as const

export function CategoryFilter({ posts, categories }: Props) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active
    ? posts.filter((p) => p.categories?.some((c) => c.slug.current === active))
    : posts

  const pills = [
    { _id: '__all__', title: 'All', slug: null },
    ...categories.map((c) => ({ _id: c._id, title: c.title, slug: c.slug.current })),
  ]

  return (
    <div>
      {/* Pills */}
      <div className="flex flex-wrap gap-2 mb-12">
        {pills.map(({ _id, title, slug }) => {
          const isActive = slug === active
          return (
            <button
              key={_id}
              onClick={() => setActive(slug ?? null)}
              className={cn(
                'relative px-5 py-2 rounded-full text-[12px] font-inter uppercase tracking-widest transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent-gold',
                isActive ? 'text-bg-base' : 'text-text-muted hover:text-text-primary border border-border hover:border-text-muted/50'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="pill-active"
                  className="absolute inset-0 rounded-full bg-accent-gold"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{title}</span>
            </button>
          )
        })}
      </div>

      {/* Post count */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active ?? 'all'}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="font-inter text-[11px] uppercase tracking-widest text-text-muted mb-8"
        >
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        </motion.p>
      </AnimatePresence>

      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, delay: i * 0.04, ease: 'easeOut' }}
              className="break-inside-avoid"
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
