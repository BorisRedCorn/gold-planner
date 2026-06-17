import { motion } from 'framer-motion'
import type { Task } from '../types/task'
import { categoryLabels, priorityLabels } from '../types/task'
import { GoldCheckbox } from './GoldCheckbox'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
}

const priorityStyles: Record<Task['priority'], string> = {
  urgent: 'border-red-500/40 text-red-300 bg-red-950/30',
  high: 'border-orange-500/40 text-orange-300 bg-orange-950/30',
  medium: 'border-gold-500/40 text-gold-300 bg-gold-950/20',
  low: 'border-zinc-500/40 text-zinc-400 bg-zinc-900/30',
}

const categoryIcons: Record<Task['category'], string> = {
  kitchen: '◆',
  service: '◇',
  wine: '◈',
  events: '✦',
  suppliers: '◉',
  staff: '◎',
  menu: '❖',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <motion.article
      layout
      initial={false}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group glass-card gold-border-glow relative overflow-hidden rounded-xl border border-gold-500/20 p-6 transition-all duration-500"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/5 blur-2xl transition-all duration-500 group-hover:bg-gold-400/10" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gold-600/5 blur-xl" />

      <div className="relative flex gap-5">
        <div className="pt-1">
          <GoldCheckbox
            id={`task-${task.id}`}
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-gold-500/5 px-3 py-0.5 text-xs tracking-widest text-gold-400/90 uppercase">
              <span className="text-gold-500">{categoryIcons[task.category]}</span>
              {categoryLabels[task.category]}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs tracking-wide uppercase ${priorityStyles[task.priority]}`}
            >
              {priorityLabels[task.priority]}
            </span>
          </div>

          <motion.h3
            className="mb-2 font-serif text-xl leading-snug font-semibold tracking-wide md:text-2xl"
            animate={{
              color: task.completed ? 'rgba(184, 134, 11, 0.45)' : 'rgba(254, 243, 199, 0.95)',
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="inline-block"
              animate={{
                textDecoration: task.completed ? 'line-through' : 'none',
                textDecorationColor: 'rgba(184, 134, 11, 0.5)',
              }}
              transition={{ duration: 0.4 }}
            >
              {task.title}
            </motion.span>
          </motion.h3>

          <motion.p
            className="mb-4 text-base leading-relaxed text-zinc-400/90"
            animate={{
              opacity: task.completed ? 0.45 : 1,
              color: task.completed ? 'rgba(161, 98, 7, 0.35)' : 'rgba(161, 161, 170, 0.9)',
            }}
            transition={{ duration: 0.4 }}
          >
            {task.description}
          </motion.p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-gold-500/10 pt-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="text-gold-600/80">◈</span>
              <span className="text-gold-500/60">Ответственный:</span>
              <span className="text-zinc-300">{task.assignee}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-600/80">◷</span>
              <span className="text-gold-500/60">Срок:</span>
              <span className="text-zinc-300">{formatDate(task.dueDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gold-600/80">◉</span>
              <span className="text-gold-500/60">Локация:</span>
              <span className="text-zinc-300">{task.location}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
