type Block = { _type: string; children?: { text?: string }[] }

export function chunkText(text: string, maxTokens = 400): string[] {
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 30)
  const chunks: string[] = []
  let current = ''

  for (const para of paragraphs) {
    const combined = current ? `${current}\n\n${para}` : para
    if (combined.length / 4 > maxTokens && current) {
      chunks.push(current.trim())
      current = para
    } else {
      current = combined
    }
  }
  if (current.trim()) chunks.push(current.trim())

  return chunks
}

export function extractTextFromPortableText(body: unknown[]): string {
  if (!body) return ''
  return (body as Block[])
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children ?? []).map((child) => child.text ?? '').join('')
    )
    .join('\n\n')
}

export async function embedText(text: string): Promise<number[]> {
  const response = await fetch(
    'https://router.huggingface.co/hf-inference/models/BAAI/bge-base-en-v1.5/pipeline/feature-extraction',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  )

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`HuggingFace embed error: ${err}`)
  }

  const data = await response.json()
  return Array.isArray(data[0]) ? data[0] : data
}
