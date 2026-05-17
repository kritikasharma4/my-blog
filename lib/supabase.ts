import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export type ChunkRow = {
  id: string
  post_slug: string
  post_title: string
  chunk_text: string
  similarity: number
}
