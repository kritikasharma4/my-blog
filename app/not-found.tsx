import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="font-inter text-[12px] uppercase tracking-[0.2em] text-accent-gold mb-4">404</p>
      <h1 className="font-playfair text-5xl font-bold text-text-primary mb-6">Page not found</h1>
      <p className="font-lora text-lg text-text-secondary mb-10">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="font-inter text-sm uppercase tracking-widest text-accent-gold border border-accent-gold px-6 py-3 hover:bg-accent-gold hover:text-bg-base transition-colors duration-200"
      >
        Go home
      </Link>
    </div>
  )
}
