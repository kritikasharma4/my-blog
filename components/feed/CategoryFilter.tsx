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

export function CategoryFilter({ posts, categories }: Props) {
  const [active, setActive] = useState<string | null>(null)

  const filtered = active
    ? posts.filter((p) => p.categories?.some((c) => c.slug.current === active))
    : posts

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActive(null)}
          className={cn(
            'px-4 py-1.5 rounded-full text-[12px] font-inter uppercase tracking-widest border transition-colors duration-200',
            active === null
              ? 'border-accent-gold text-accent-gold'
              : 'border-border text-text-muted hover:border-text-muted'
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setActive(cat.slug.current === active ? null : cat.slug.current)}
            className={cn(
              'px-4 py-1.5 rounded-full text-[12px] font-inter uppercase tracking-widest border transition-colors duration-200',
              active === cat.slug.current
                ? 'border-accent-gold text-accent-gold'
                : 'border-border text-text-muted hover:border-text-muted'
            )}
          >
            {cat.title}
          </button>
        ))}
      </div>

      <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
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
