import { MetadataRoute } from 'next'
import { getAllPosts, getAllCategories } from '@/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  const postUrls = posts.map((post) => ({
    url: `https://yourdomain.com/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
  }))

  const categoryUrls = categories.map((cat) => ({
    url: `https://yourdomain.com/category/${cat.slug.current}`,
  }))

  return [
    { url: 'https://yourdomain.com' },
    { url: 'https://yourdomain.com/about' },
    ...categoryUrls,
    ...postUrls,
  ]
}
