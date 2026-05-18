import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/sanity'
import { PostCard } from '@/components/feed/PostCard'
import { FadeInOnScroll } from '@/components/animations/FadeInOnScroll'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((c) => ({ slug: c.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return {}
  return { title: category.title, description: category.description }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
  ])
  if (!category) notFound()

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="font-inter text-[12px] uppercase tracking-[0.2em] text-accent-gold mb-4">Category</p>
          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-text-primary mb-6">
            {category.title}
          </h1>
          {category.description && (
            <p className="font-lora text-xl text-text-secondary max-w-xl leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {posts.map((post, i) => (
            <FadeInOnScroll key={post._id} delay={i * 0.06} className="break-inside-avoid">
              <PostCard post={post} />
            </FadeInOnScroll>
          ))}
        </div>

        {posts.length === 0 && (
          <p className="font-lora text-xl text-text-muted text-center py-24">
            Nothing here yet — check back soon.
          </p>
        )}
      </div>
    </div>
  )
}
