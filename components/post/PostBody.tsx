import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { PullQuote } from './PullQuote'

const components = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-10 -mx-8 md:-mx-16">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={urlFor(value.asset).width(1200).height(675).url()}
            alt={value.alt ?? ''}
            fill
            className="object-cover rounded-sm"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-[13px] font-inter text-text-muted mt-3 tracking-wide">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="font-playfair text-3xl font-semibold text-text-primary mt-14 mb-5 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-playfair text-2xl font-medium text-accent-gold mt-10 mb-4">
        {children}
      </h3>
    ),
    blockquote: ({ children }: any) => <PullQuote>{children}</PullQuote>,
    normal: ({ children }: any) => (
      <p className="font-lora text-[18px] text-text-primary leading-[1.85] mb-7">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-accent-warm-white">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
}

interface Props {
  body: unknown[]
}

export function PostBody({ body }: Props) {
  return (
    <div className="max-w-reading mx-auto px-6">
      <PortableText value={body as any} components={components} />
    </div>
  )
}
