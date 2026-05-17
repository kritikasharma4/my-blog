export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted font-inter text-sm">
        <p>© {new Date().getFullYear()} Kritika Sharma</p>
        <p className="tracking-wide">Writing from wherever the light is good.</p>
      </div>
    </footer>
  )
}
