import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { embedText } from '@/lib/embeddings'
import type { ChunkRow } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] })
  }

  let queryEmbedding: number[]
  try {
    queryEmbedding = await embedText(query.trim())
  } catch {
    return NextResponse.json({ error: 'Embedding failed' }, { status: 500 })
  }

  const { data: chunks, error } = await supabase.rpc('match_chunks', {
    query_embedding: `[${queryEmbedding.join(',')}]`,
    match_count: 10,
  })

  if (error || !chunks?.length) {
    return NextResponse.json({ results: [] })
  }

  // Deduplicate by post slug, keep highest similarity
  const seen = new Map<string, ChunkRow>()
  for (const chunk of chunks as ChunkRow[]) {
    if (!seen.has(chunk.post_slug) || chunk.similarity > seen.get(chunk.post_slug)!.similarity) {
      seen.set(chunk.post_slug, chunk)
    }
  }

  const results = Array.from(seen.values())
    .sort((a, b) => b.similarity - a.similarity)
    .map((c) => ({
      slug: c.post_slug,
      title: c.post_title,
      excerpt: c.chunk_text.slice(0, 160) + '...',
      similarity: Math.round(c.similarity * 100),
    }))

  return NextResponse.json({ results })
}
