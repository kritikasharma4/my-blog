import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

type Block = { _type: string; children?: { text: string }[] }

export function readTime(body: unknown[]): number {
  if (!body) return 1
  const text = (body as Block[])
    .filter((block) => block._type === 'block')
    .map((block) => block.children?.map((c) => c.text).join('') ?? '')
    .join(' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
