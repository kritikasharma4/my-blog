import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'bio', type: 'text', rows: 4 }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'social',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter / X' },
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'website', type: 'url', title: 'Website' },
      ],
    }),
  ],
})
