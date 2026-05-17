import Link from 'next/link'
import Image from 'next/image'
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
    <Link
      href={`/${post.slug.current}`}
      className="group block bg-bg-surface border border-border rounded-lg overflow-hidden hover:bg-bg-surface-hover transition-colors duration-300"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {post.coverImage?.asset ? (
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={urlFor(post.coverImage.asset).width(800).height(450).url()}
            alt={post.coverImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)', opacity: 0.4 }} />
        </div>
      ) : (
        <div className="w-full aspect-[16/9] flex items-center justify-center bg-bg-base border-b border-border">
          <span className="font-playfair text-[80px] font-bold text-border select-none leading-none">
            {firstLetter}
          </span>
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
        <div className="flex items-center gap-3 text-[13px] font-inter text-text-muted tracking-wide">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span>{readTime(post.body ?? [])} min read</span>
        </div>
      </div>
    </Link>
  )
}
