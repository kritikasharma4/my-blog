import { getAuthor } from '@/lib/sanity'
import { AboutContent } from '@/components/layout/AboutContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'A little about Kritika Sharma.',
}

export default async function AboutPage() {
  const author = await getAuthor()
  return <AboutContent author={author} />
}
