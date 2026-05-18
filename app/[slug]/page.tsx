import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts } from '@/lib/sanity'
import { HeroSection } from '@/components/post/HeroSection'
import { PostBody } from '@/components/post/PostBody'
import { AuthorCard } from '@/components/post/AuthorCard'
import { RelatedPosts } from '@/components/post/RelatedPosts'
import { MeltingCandle } from '@/components/ui/MeltingCandle'
import { AskAuthorButton } from '@/components/ask-author/AskAuthorButton'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const categoryIds = post.categories?.map((c) => c._id) ?? []
  const related = await getRelatedPosts(categoryIds, slug)

  return (
    <article>
      <HeroSection post={post} />
      <div className="py-16">
        <PostBody body={post.body} />
        {post.author && <AuthorCard author={post.author} />}
      </div>
      <RelatedPosts posts={related} />
      <MeltingCandle />
      <AskAuthorButton />
    </article>
  )
}
