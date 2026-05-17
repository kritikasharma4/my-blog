'use client'

import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { Post, urlFor } from '@/lib/sanity'
import { Tag } from '@/components/ui/Tag'
import { StaggeredText } from '@/components/animations/StaggeredText'
import { formatDate, readTime } from '@/lib/utils'

interface Props {
  post: Post
}

export function HeroSection({ post }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const hasImage = !!post.coverImage?.asset

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      {hasImage ? (
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={urlFor(post.coverImage!.asset).width(1920).height(1080).url()}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 40%, #2d2318 0%, #1a1410 70%)' }}
        />
      )}

      <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 pb-20 w-full"
      >
        <div className="flex items-center gap-4 mb-6">
          {post.categories?.[0] && <Tag label={post.categories[0].title} />}
          <span className="text-[13px] font-inter text-text-muted tracking-wide">
            {formatDate(post.publishedAt)} · {readTime(post.body ?? [])} min read
          </span>
        </div>
        <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ color: 'var(--accent-warm-white)' }}>
          <StaggeredText text={post.title} />
        </h1>
        {post.excerpt && (
          <p className="font-lora text-xl text-text-secondary max-w-2xl leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </motion.div>
    </section>
  )
}
