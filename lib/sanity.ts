import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  coverImage?: { asset: SanityImageSource; alt?: string }
  categories: Category[]
  author: Author
  body: unknown[]
  featured: boolean
}

export type Category = {
  _id: string
  title: string
  slug: { current: string }
  description?: string
}

export type Author = {
  _id: string
  name: string
  bio?: string
  photo?: { asset: SanityImageSource }
  social?: { twitter?: string; instagram?: string; website?: string }
}

const postFields = `
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  coverImage { asset, alt },
  "categories": categories[]->{ _id, title, slug },
  "author": author->{ _id, name, bio, photo, social },
  featured
`

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] | order(featured desc, publishedAt desc) { ${postFields} }`,
    {},
    { next: { tags: ['posts'] } }
  )
}

export async function getPostBySlug(slug: string): Promise<Post & { body: unknown[] }> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${postFields}, body }`,
    { slug },
    { next: { tags: [`post-${slug}`] } }
  )
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current && defined(publishedAt)] | order(publishedAt desc) { ${postFields} }`,
    { categorySlug },
    { next: { tags: [`category-${categorySlug}`] } }
  )
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) { _id, title, slug, description }`,
    {},
    { next: { tags: ['categories'] } }
  )
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] { _id, title, slug, description }`,
    { slug }
  )
}

export async function getRelatedPosts(categoryIds: string[], excludeSlug: string): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && count((categories[]._ref)[@ in $categoryIds]) > 0 && slug.current != $excludeSlug && defined(publishedAt)] | order(publishedAt desc)[0..2] { ${postFields} }`,
    { categoryIds, excludeSlug }
  )
}

export async function getAuthor(): Promise<Author> {
  return client.fetch(`*[_type == "author"][0] { _id, name, bio, photo, social }`)
}
