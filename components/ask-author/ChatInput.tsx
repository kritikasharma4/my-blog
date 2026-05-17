'use client'

import { useRef } from 'react'

interface Props {
  onSend: (question: string) => void
  disabled: boolean
}

export function ChatInput({ onSend, disabled }: Props) {
  const ref = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    const value = ref.current?.value.trim()
    if (!value || disabled) return
    onSend(value)
    if (ref.current) ref.current.value = ''
  }

  return (
    <div className="flex gap-2 p-3 border-t border-border">
      <input
        ref={ref}
        type="text"
        placeholder="Ask me anything..."
        disabled={disabled}
        className="flex-1 bg-bg-base border border-border rounded-lg px-4 py-2.5 text-[14px] font-inter text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold transition-colors disabled:opacity-50"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="px-4 py-2.5 bg-accent-gold text-bg-base rounded-lg font-inter text-[13px] font-semibold hover:bg-accent-gold-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ask
      </button>
    </div>
  )
}
