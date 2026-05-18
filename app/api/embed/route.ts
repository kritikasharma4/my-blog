import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import { supabase } from '@/lib/supabase'
import { chunkText, extractTextFromPortableText, embedText } from '@/lib/embeddings'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json()
  if (body._type !== 'post') {
    return NextResponse.json({ message: 'Not a post, skipping' })
  }

  const slug = body.slug?.current
  if (!slug) {
    return NextResponse.json({ message: 'No slug, skipping' })
  }

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ title, body }`,
    { slug }
  )

  if (!post) {
    await supabase.from('post_chunks').delete().eq('post_slug', slug)
    return NextResponse.json({ message: 'Post deleted, chunks removed' })
  }

  const plainText = extractTextFromPortableText(post.body ?? [])
  if (!plainText.trim()) {
    return NextResponse.json({ message: 'No text content to embed' })
  }

  const chunks = chunkText(plainText)

  await supabase.from('post_chunks').delete().eq('post_slug', slug)

  const rows = []
  for (const chunk of chunks) {
    const embedding = await embedText(chunk)
    rows.push({
      post_slug: slug,
      post_title: post.title,
      chunk_text: chunk,
      embedding,
    })
  }

  const { error } = await supabase.from('post_chunks').insert(rows)
  if (error) {
    console.error('Supabase insert error:', error)
    return NextResponse.json({ message: 'DB insert failed', error }, { status: 500 })
  }

  return NextResponse.json({ message: 'Embedded', chunks: rows.length, slug })
}
