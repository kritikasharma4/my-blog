interface Props {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export function ChatMessage({ role, content, isStreaming }: Props) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-xl text-[15px] leading-relaxed ${
          isUser
            ? 'bg-accent-gold text-bg-base font-inter font-medium rounded-br-sm'
            : 'bg-bg-base border border-border text-text-primary font-lora rounded-bl-sm'
        }`}
      >
        {content}
        {isStreaming && (
          <span className="inline-block w-1.5 h-4 bg-accent-gold ml-1 animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  )
}
