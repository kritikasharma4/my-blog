'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import { urlFor, type Author } from '@/lib/sanity'

const CURRENTLY = {
  reading: 'Braiding Sweetgrass — Robin Wall Kimmerer',
  listening: 'Cigarettes After Sex',
  thinking: 'How stillness looks in motion',
}

const easeOut: Transition = { duration: 0.55, ease: [0.16, 1, 0.3, 1] }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { ...easeOut, delay } as Transition,
})

export function AboutContent({ author }: { author: Author | null }) {
  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
        {author?.photo?.asset && (
          <motion.div
            className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-2 border-border"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04 }}
          >
            <Image
              src={urlFor(author.photo.asset).width(384).height(384).url()}
              alt={author?.name ?? 'Author'}
              fill
              className="object-cover"
            />
          </motion.div>
        )}
        <div>
          <motion.p
            className="font-inter text-[12px] uppercase tracking-[0.2em] text-accent-gold mb-4"
            {...fadeUp(0.15)}
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            className="font-playfair text-5xl font-bold text-text-primary mb-6"
            {...fadeUp(0.25)}
          >
            {author?.name ?? 'Kritika Sharma'}
          </motion.h1>
          {author?.bio && (
            <motion.p
              className="font-lora text-lg text-text-secondary leading-relaxed"
              {...fadeUp(0.35)}
            >
              {author.bio}
            </motion.p>
          )}
        </div>
      </div>

      {/* Currently section */}
      <motion.div
        className="border-t border-border pt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.h2
          className="font-playfair text-2xl font-semibold text-text-primary mb-8"
          {...fadeUp(0.55)}
        >
          Currently
        </motion.h2>
        <dl className="space-y-5">
          {Object.entries(CURRENTLY).map(([key, value], i) => (
            <motion.div
              key={key}
              className="flex gap-6 group"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.65 + i * 0.1, ease: 'easeOut' }}
            >
              <dt className="font-inter text-[12px] uppercase tracking-widest text-accent-gold w-24 flex-shrink-0 pt-0.5">
                {key}
              </dt>
              <dd className="font-lora text-[17px] text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-200">
                {value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>

      {/* Social links */}
      {author?.social && (
        <motion.div
          className="border-t border-border pt-12 mt-12 flex gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          {author.social.twitter && (
            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-text-muted hover:text-accent-gold transition-colors tracking-wide group flex items-center gap-1.5">
              <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-accent-gold">→</span>
              Twitter
            </a>
          )}
          {author.social.instagram && (
            <a href={author.social.instagram} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-text-muted hover:text-accent-gold transition-colors tracking-wide group flex items-center gap-1.5">
              <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-accent-gold">→</span>
              Instagram
            </a>
          )}
          {author.social.website && (
            <a href={author.social.website} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-text-muted hover:text-accent-gold transition-colors tracking-wide group flex items-center gap-1.5">
              <span className="w-0 group-hover:w-2 overflow-hidden transition-all duration-200 text-accent-gold">→</span>
              Website
            </a>
          )}
        </motion.div>
      )}
    </div>
  )
}
