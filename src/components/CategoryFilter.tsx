import type { Category } from '../types/category'

interface CategoryFilterProps {
  categories: Category[]
  active: string
  onChange: (categoryId: string) => void
  counts: Record<string, number>
}

const filterBtn =
  'app-btn relative cursor-pointer rounded-full border px-4 py-2.5 text-sm tracking-wide transition-all duration-300 min-h-11'

export function CategoryFilter({ categories, active, onChange, counts }: CategoryFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={`${filterBtn} ${
          active === 'all'
            ? 'border-gold-500/60 bg-gold-500/15 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
            : 'border-gold-500/15 bg-black/30 text-zinc-500 hover:border-gold-500/35 hover:text-gold-400/80'
        }`}
      >
        Все
        <span className="ml-1.5 text-xs opacity-60">({counts.all ?? 0})</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onChange(cat.id)}
          className={`${filterBtn} ${
            active === cat.id
              ? 'border-gold-500/60 bg-gold-500/15 text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
              : 'border-gold-500/15 bg-black/30 text-zinc-500 hover:border-gold-500/35 hover:text-gold-400/80'
          }`}
        >
          <span className="mr-1 text-gold-500">{cat.icon}</span>
          {cat.label}
          <span className="ml-1.5 text-xs opacity-60">({counts[cat.id] ?? 0})</span>
        </button>
      ))}
    </div>
  )
}
