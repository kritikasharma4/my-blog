'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'

type Message = { role: 'user' | 'assistant'; content: string }

const RATE_LIMIT_KEY = 'ask_author_count'
const RATE_LIMIT_DATE_KEY = 'ask_author_date'
const DAILY_LIMIT = 10

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function AskAuthorChat({ isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Ask me anything — I'll answer from my writing." },
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const today = new Date().toDateString()
    const savedDate = localStorage.getItem(RATE_LIMIT_DATE_KEY)
    if (savedDate !== today) {
      localStorage.setItem(RATE_LIMIT_DATE_KEY, today)
      localStorage.setItem(RATE_LIMIT_KEY, '0')
    }
    const count = parseInt(localStorage.getItem(RATE_LIMIT_KEY) ?? '0')
    if (count >= DAILY_LIMIT) setRateLimited(true)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (question: string) => {
    if (isStreaming || rateLimited) return

    const count = parseInt(localStorage.getItem(RATE_LIMIT_KEY) ?? '0')
    localStorage.setItem(RATE_LIMIT_KEY, String(count + 1))
    if (count + 1 >= DAILY_LIMIT) setRateLimited(true)

    setMessages((prev) => [...prev, { role: 'user', content: question }])
    setIsStreaming(true)
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })

      if (!res.ok || !res.body) throw new Error('Request failed')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        accumulated += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: accumulated }
          return updated
        })
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong — try asking again.',
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-50 w-[360px] rounded-2xl border border-border overflow-hidden"
          style={{
            background: '#231c16',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <p className="font-playfair text-base font-semibold text-text-primary">Ask the Author</p>
              <p className="font-inter text-[11px] text-text-muted tracking-wide">
                Answers from my writing
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors text-xl leading-none"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="h-72 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <ChatMessage
                key={i}
                role={msg.role}
                content={msg.content}
                isStreaming={isStreaming && i === messages.length - 1 && msg.role === 'assistant'}
              />
            ))}
            {rateLimited && (
              <p className="text-center font-inter text-[12px] text-text-muted mt-2">
                Daily limit reached — come back tomorrow.
              </p>
            )}
          </div>

          <ChatInput onSend={handleSend} disabled={isStreaming || rateLimited} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
