import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { supabase } from '@/lib/supabase'
import { embedText } from '@/lib/embeddings'
import type { ChunkRow } from '@/lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: NextRequest) {
  const { question } = await request.json()

  if (!question || typeof question !== 'string' || question.trim().length < 2) {
    return new Response(JSON.stringify({ error: 'Question required' }), { status: 400 })
  }

  let queryEmbedding: number[]
  try {
    queryEmbedding = await embedText(question.trim())
  } catch {
    return new Response(JSON.stringify({ error: 'Embedding failed' }), { status: 500 })
  }

  const { data: chunks, error } = await supabase.rpc('match_chunks', {
    query_embedding: queryEmbedding,
    match_count: 4,
  })

  if (error || !chunks?.length) {
    const stream = new ReadableStream({
      start(controller) {
        const text = "I haven't written about that yet — but it sounds like something I should."
        controller.enqueue(new TextEncoder().encode(text))
        controller.close()
      },
    })
    return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }

  const context = (chunks as ChunkRow[])
    .map((c) => `[From "${c.post_title}"]\n${c.chunk_text}`)
    .join('\n\n---\n\n')

  const groqStream = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    stream: true,
    max_tokens: 400,
    messages: [
      {
        role: 'system',
        content: `You are Kritika, a creative writer with a warm, reflective voice.
Answer the reader's question using ONLY the excerpts below from your own writing.
Write in first person, as if you are speaking directly to the reader.
If the excerpts don't contain enough to answer, say warmly that you haven't explored that topic in writing yet.
Keep your answer to 2-4 sentences. Do not mention "excerpts" or "passages" — just speak naturally.

Your writing:
${context}`,
      },
      { role: 'user', content: question },
    ],
  })

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of groqStream) {
        const text = chunk.choices[0]?.delta?.content ?? ''
        if (text) controller.enqueue(new TextEncoder().encode(text))
      }
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
