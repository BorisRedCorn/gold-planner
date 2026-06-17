export function Header() {
  return (
    <header className="relative mb-12 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
        <span className="font-serif text-3xl text-gold-400">✦</span>
      </div>

      <p className="mb-3 text-sm tracking-[0.2em] text-gold-600/70">
        сделано Бубзиком
      </p>

      <h1 className="gold-gradient-text gold-shimmer mb-4 font-serif text-5xl font-bold tracking-wide text-gold-400 md:text-7xl">
        Gold Planner
      </h1>

      <div className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
    </header>
  )
}
