'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Post, urlFor } from '@/lib/sanity'
import { formatDate, readTime } from '@/lib/utils'
import { Tag } from '@/components/ui/Tag'

interface Props {
  post: Post
}

export function PostCard({ post }: Props) {
  const firstCategory = post.categories?.[0]
  const firstLetter = post.title?.[0]?.toUpperCase() ?? 'A'

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        href={`/${post.slug.current}`}
        className="group block bg-bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-gold/40"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        {post.coverImage?.asset ? (
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <Image
              src={urlFor(post.coverImage.asset).width(800).height(450).url()}
              alt={post.coverImage.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="w-full aspect-[16/9] flex items-center justify-center bg-bg-base border-b border-border relative overflow-hidden">
            <motion.span
              className="font-playfair text-[80px] font-bold text-border select-none leading-none"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {firstLetter}
            </motion.span>
            {/* subtle shimmer on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, transparent 40%, rgba(201,147,58,0.06) 50%, transparent 60%)' }} />
          </div>
        )}

        <div className="p-7">
          {firstCategory && (
            <Tag label={firstCategory.title} className="mb-3 block" />
          )}
          <h2 className="font-playfair text-xl font-semibold text-text-primary leading-snug mb-3 group-hover:text-accent-gold transition-colors duration-200">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="font-lora text-[15px] text-text-secondary leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[13px] font-inter text-text-muted tracking-wide">
              <span>{formatDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{readTime(post.body ?? [])} min read</span>
            </div>
            {/* Arrow that slides in on hover */}
            <span className="text-accent-gold opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 text-sm">
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
