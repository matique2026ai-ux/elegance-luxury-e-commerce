import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-8xl tracking-tight mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <Link href="/" className="bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors inline-block">Back to Home</Link>
      </div>
    </div>
  )
}
