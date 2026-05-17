import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import post from './schemas/post'
import category from './schemas/category'
import author from './schemas/author'
import blockContent from './schemas/blockContent'

export default defineConfig({
  name: 'default',
  title: 'My Blog',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: [post, category, author, blockContent] },
})
