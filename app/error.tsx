"use client"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-4xl mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">{error.message}</p>
        <button onClick={reset} className="bg-primary text-primary-foreground px-6 py-3 text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors">Try again</button>
      </div>
    </div>
  )
}
