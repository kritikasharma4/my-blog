import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  // Revalidate everything on any post/category change
  revalidateTag('posts')
  revalidateTag('categories')
  revalidateTag('author')

  try {
    const body = await request.json()
    const type = body._type as string
    if (type === 'post' && body.slug?.current) {
      revalidateTag(`post-${body.slug.current}`)
    }
    if (type === 'category' && body.slug?.current) {
      revalidateTag(`category-${body.slug.current}`)
    }
  } catch {
    // Body may be empty — that's fine, we already revalidated above
  }

  return NextResponse.json({ revalidated: true })
}
