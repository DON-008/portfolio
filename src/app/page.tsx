export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-teal">
        angular · typescript · ngrx
      </p>
      <h1 className="font-display text-4xl font-semibold text-text sm:text-6xl">
        Zero Gravity — token check
      </h1>
      <p className="max-w-xl font-sans text-muted">
        Space Grotesk display, Inter body, JetBrains Mono labels. Void
        background, panel surface below, indigo / teal / amber accents.
      </p>
      <div className="mt-4 rounded-xl border border-line bg-panel/80 p-6 backdrop-blur">
        <p className="font-sans text-text">Panel surface with backdrop blur.</p>
        <div className="mt-3 flex gap-3">
          <span className="rounded-full bg-indigo px-3 py-1 font-mono text-xs text-void">
            indigo
          </span>
          <span className="rounded-full bg-teal px-3 py-1 font-mono text-xs text-void">
            teal
          </span>
          <span className="rounded-full bg-amber px-3 py-1 font-mono text-xs text-void">
            amber
          </span>
        </div>
      </div>
      <a
        href="#"
        className="mt-6 rounded-full border border-line px-4 py-2 font-sans text-sm text-text transition-colors hover:border-indigo focus-visible:border-indigo"
      >
        focus-visible check (tab to me)
      </a>
    </main>
  );
}
