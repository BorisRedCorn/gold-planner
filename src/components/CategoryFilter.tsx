import { motion } from 'framer-motion'
import type { TaskCategory } from '../types/task'
import { categoryLabels } from '../types/task'

interface CategoryFilterProps {
  active: TaskCategory | 'all'
  onChange: (category: TaskCategory | 'all') => void
  counts: Record<TaskCategory | 'all', number>
}

const categories: (TaskCategory | 'all')[] = [
  'all',
  'kitchen',
  'service',
  'wine',
  'events',
  'suppliers',
  'staff',
  'menu',
]

const filterLabels: Record<TaskCategory | 'all', string> = {
  all: 'Все',
  ...categoryLabels,
}

export function CategoryFilter({ active, onChange, counts }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-8 flex flex-wrap justify-center gap-2"
    >
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm tracking-wide transition-all duration-300 ${
            active === cat
              ? 'border-gold-500/60 bg-gold-500/15 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
              : 'border-gold-500/15 bg-black/30 text-zinc-500 hover:border-gold-500/35 hover:text-gold-400/80'
          }`}
        >
          {filterLabels[cat]}
          <span className="ml-1.5 text-xs opacity-60">({counts[cat]})</span>
          {active === cat && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 -z-10 rounded-full bg-gold-500/5"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  )
}
