import Image from 'next/image'
import { getAuthor, urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'A little about Kritika Sharma.',
}

const CURRENTLY = {
  reading: 'Braiding Sweetgrass — Robin Wall Kimmerer',
  listening: 'Cigarettes After Sex',
  thinking: 'How stillness looks in motion',
}

export default async function AboutPage() {
  const author = await getAuthor()

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
        {author?.photo?.asset && (
          <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
            <Image
              src={urlFor(author.photo.asset).width(384).height(384).url()}
              alt={author?.name ?? 'Author'}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-inter text-[12px] uppercase tracking-[0.2em] text-accent-gold mb-4">Hello, I&apos;m</p>
          <h1 className="font-playfair text-5xl font-bold text-text-primary mb-6">
            {author?.name ?? 'Kritika Sharma'}
          </h1>
          {author?.bio && (
            <p className="font-lora text-lg text-text-secondary leading-relaxed">{author.bio}</p>
          )}
        </div>
      </div>

      <div className="border-t border-border pt-12">
        <h2 className="font-playfair text-2xl font-semibold text-text-primary mb-8">Currently</h2>
        <dl className="space-y-5">
          {Object.entries(CURRENTLY).map(([key, value]) => (
            <div key={key} className="flex gap-6">
              <dt className="font-inter text-[12px] uppercase tracking-widest text-accent-gold w-24 flex-shrink-0 pt-0.5">
                {key}
              </dt>
              <dd className="font-lora text-[17px] text-text-secondary leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {author?.social && (
        <div className="border-t border-border pt-12 mt-12 flex gap-6">
          {author.social.twitter && (
            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-text-muted hover:text-accent-gold transition-colors tracking-wide">
              Twitter
            </a>
          )}
          {author.social.instagram && (
            <a href={author.social.instagram} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-text-muted hover:text-accent-gold transition-colors tracking-wide">
              Instagram
            </a>
          )}
          {author.social.website && (
            <a href={author.social.website} target="_blank" rel="noopener noreferrer"
              className="font-inter text-sm text-text-muted hover:text-accent-gold transition-colors tracking-wide">
              Website
            </a>
          )}
        </div>
      )}
    </div>
  )
}
