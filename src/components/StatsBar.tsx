import { motion } from 'framer-motion'

interface StatsBarProps {
  total: number
  completed: number
  pending: number
  urgent: number
}

const stats = [
  { key: 'total', label: 'Всего задач', getValue: (p: StatsBarProps) => p.total },
  { key: 'pending', label: 'В работе', getValue: (p: StatsBarProps) => p.pending },
  { key: 'completed', label: 'Выполнено', getValue: (p: StatsBarProps) => p.completed },
  { key: 'urgent', label: 'Срочных', getValue: (p: StatsBarProps) => p.urgent },
] as const

export function StatsBar(props: StatsBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
          className="glass-card gold-border-glow rounded-xl border border-gold-500/15 p-5 text-center transition-all duration-500"
        >
          <div className="gold-gradient-text mb-1 font-serif text-3xl font-bold md:text-4xl">
            {stat.getValue(props)}
          </div>
          <div className="text-xs tracking-[0.2em] text-gold-600/60 uppercase">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
