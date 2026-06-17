import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-12 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/30 bg-gold-500/5 shadow-[0_0_40px_rgba(212,175,55,0.15)]"
      >
        <span className="font-serif text-3xl text-gold-400">✦</span>
      </motion.div>

      <p className="mb-3 text-sm tracking-[0.2em] text-gold-600/70">
        сделано Бубзиком
      </p>

      <h1 className="gold-gradient-text gold-shimmer mb-4 font-serif text-5xl font-bold tracking-wide md:text-7xl">
        Gold Planner
      </h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mx-auto h-px w-48 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
      />
    </motion.header>
  )
}
