import Image from 'next/image'
import { Author, urlFor } from '@/lib/sanity'

interface Props {
  author: Author
}

export function AuthorCard({ author }: Props) {
  return (
    <div className="max-w-reading mx-auto px-6 mt-16 pt-12 border-t border-border">
      <div className="flex items-start gap-5">
        {author.photo?.asset && (
          <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={urlFor(author.photo.asset).width(112).height(112).url()}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-inter text-[11px] uppercase tracking-[0.1em] text-text-muted mb-1">Written by</p>
          <p className="font-playfair text-lg font-semibold text-text-primary mb-2">{author.name}</p>
          {author.bio && (
            <p className="font-lora text-[15px] text-text-secondary leading-relaxed">{author.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}
