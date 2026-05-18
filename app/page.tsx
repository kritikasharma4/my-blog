import { getAllPosts, getAllCategories } from '@/lib/sanity'
import { CategoryFilter } from '@/components/feed/CategoryFilter'
import { ScrollArrow } from '@/components/ui/ScrollArrow'
import { HomeHero } from '@/components/layout/HomeHero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kritika Sharma',
  description: 'Essays, design inspiration, and personal writing.',
}

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  return (
    <>
      <HomeHero />

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <CategoryFilter posts={posts} categories={categories} />
      </section>
    </>
  )
}
