import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text', validation: (Rule: any) => Rule.required() }],
    }),
    defineField({ name: 'body', type: 'blockContent' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Published At, New', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
})
