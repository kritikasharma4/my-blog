import { getAllPosts, getAllCategories } from '@/lib/sanity'
import { CategoryFilter } from '@/components/feed/CategoryFilter'
import { StaggeredText } from '@/components/animations/StaggeredText'
import { ScrollArrow } from '@/components/ui/ScrollArrow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kritika Sharma',
  description: 'Essays, design inspiration, and personal writing.',
}

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-16 max-w-4xl mx-auto">
        <p className="font-inter text-[12px] uppercase tracking-[0.2em] text-accent-gold mb-6">
          A personal journal
        </p>
        <h1 className="font-playfair text-6xl md:text-8xl font-bold text-text-primary leading-tight mb-8">
          <StaggeredText text="Thoughts, essays & beautiful things." />
        </h1>
        <p className="font-lora text-xl text-text-secondary max-w-lg leading-relaxed mb-16">
          A space for writing slowly and thinking clearly.
        </p>
        <ScrollArrow />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <CategoryFilter posts={posts} categories={categories} />
      </section>
    </>
  )
}
