'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'

type Result = {
  slug: string
  title: string
  excerpt: string
  similarity: number
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = async (q: string) => {
    if (q.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      setResults(data.results ?? [])
      setSearched(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialQuery) search(initialQuery)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 500)
  }

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
      <p className="font-inter text-[12px] uppercase tracking-[0.2em] text-accent-gold mb-4">
        Semantic Search
      </p>
      <h1 className="font-playfair text-5xl font-bold text-text-primary mb-3">
        Search by meaning
      </h1>
      <p className="font-lora text-lg text-text-secondary mb-10">
        Not just keywords — find posts by what they feel like.
      </p>

      {/* Search input */}
      <div className="relative mb-12">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Try: feeling lost, growing up, quiet mornings..."
          className="w-full bg-bg-surface border border-border rounded-xl px-6 py-4 font-lora text-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors"
          autoFocus
        />
        {loading && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 rounded-full border-2 border-accent-gold border-t-transparent animate-spin" />
          </div>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {searched && !loading && (
          <motion.div
            key={query}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {results.length === 0 ? (
              <div className="text-center py-16">
                <p className="font-lora text-xl text-text-muted">
                  Nothing found — try different words or feelings.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="font-inter text-[12px] uppercase tracking-widest text-text-muted mb-6">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
                {results.map((result, i) => (
                  <motion.div
                    key={result.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link href={`/${result.slug}`}>
                      <div className="group p-6 border border-border rounded-xl hover:border-accent-gold transition-colors duration-200 bg-bg-surface">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h2 className="font-playfair text-xl font-semibold text-text-primary group-hover:text-accent-gold transition-colors">
                            {result.title}
                          </h2>
                          <span className="font-inter text-[11px] text-accent-gold border border-accent-gold/30 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                            {result.similarity}% match
                          </span>
                        </div>
                        <p className="font-lora text-[15px] text-text-secondary leading-relaxed">
                          {result.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
