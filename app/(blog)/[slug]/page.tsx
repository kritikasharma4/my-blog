import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts } from '@/lib/sanity'
import { HeroSection } from '@/components/post/HeroSection'
import { PostBody } from '@/components/post/PostBody'
import { AuthorCard } from '@/components/post/AuthorCard'
import { RelatedPosts } from '@/components/post/RelatedPosts'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  }
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  const categoryIds = post.categories?.map((c) => c._id) ?? []
  const related = await getRelatedPosts(categoryIds, params.slug)

  return (
    <article>
      <HeroSection post={post} />
      <div className="py-16">
        <PostBody body={post.body} />
        {post.author && <AuthorCard author={post.author} />}
      </div>
      <RelatedPosts posts={related} />
    </article>
  )
}
