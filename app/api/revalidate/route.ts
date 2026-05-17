import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json()
  const type = body._type as string

  if (type === 'post') {
    revalidateTag('posts')
    revalidateTag(`post-${body.slug?.current}`)
  }
  if (type === 'category') {
    revalidateTag('categories')
    revalidateTag(`category-${body.slug?.current}`)
  }

  return NextResponse.json({ revalidated: true, type })
}
