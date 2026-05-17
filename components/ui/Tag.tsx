interface Props {
  label: string
  className?: string
}

export function Tag({ label, className }: Props) {
  return (
    <span
      className={`inline-block text-[11px] font-inter font-medium uppercase tracking-[0.1em] text-accent-gold ${className ?? ''}`}
    >
      {label}
    </span>
  )
}
