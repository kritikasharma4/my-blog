import { Post } from '@/lib/sanity'
import { PostCard } from '@/components/feed/PostCard'

interface Props {
  posts: Post[]
}

export function RelatedPosts({ posts }: Props) {
  if (!posts.length) return null

  return (
    <section className="max-w-6xl mx-auto px-6 mt-20 pb-24">
      <h2 className="font-playfair text-2xl font-semibold text-text-primary mb-8">
        Keep reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  )
}
