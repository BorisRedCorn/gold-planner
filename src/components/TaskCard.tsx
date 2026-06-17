import type { Task } from '../types/task'
import type { Category } from '../types/category'
import { categoryIcon, categoryLabel } from '../types/category'
import { priorityLabels } from '../types/task'
import { GoldCheckbox } from './GoldCheckbox'
import { IconButton } from './IconButton'

interface TaskCardProps {
  task: Task
  categories: Category[]
  onToggle: (id: string) => void
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
}

const priorityStyles: Record<Task['priority'], string> = {
  urgent: 'border-red-500/40 text-red-300 bg-red-950/30',
  high: 'border-orange-500/40 text-orange-300 bg-orange-950/30',
  medium: 'border-gold-500/40 text-gold-300 bg-gold-950/20',
  low: 'border-zinc-500/40 text-zinc-400 bg-zinc-900/30',
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function TaskCard({ task, categories, onToggle, onEdit, onDelete }: TaskCardProps) {
  const handleDelete = () => {
    if (window.confirm('Удалить эту задачу?')) {
      onDelete(task.id)
    }
  }

  return (
    <article className="group glass-card gold-border-glow relative overflow-hidden rounded-xl border border-gold-500/20 p-4 sm:p-6">
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gold-600/5 blur-xl" />

      <div className="relative z-10 flex items-start gap-3 sm:gap-5">
        <div className="shrink-0 pt-1">
          <GoldCheckbox
            id={`task-${task.id}`}
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-gold-500/5 px-3 py-0.5 text-xs tracking-widest text-gold-400/90 uppercase">
                <span className="text-gold-500">{categoryIcon(categories, task.category)}</span>
                {categoryLabel(categories, task.category)}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs tracking-wide uppercase ${priorityStyles[task.priority]}`}
              >
                {priorityLabels[task.priority]}
              </span>
            </div>

            <div className="flex shrink-0 gap-1.5">
              <IconButton label="Редактировать" onClick={() => onEdit(task)}>
                ✎
              </IconButton>
              <IconButton label="Удалить" variant="danger" onClick={handleDelete}>
                ✕
              </IconButton>
            </div>
          </div>

          <h3
            className={`mb-2 font-serif text-xl leading-snug font-semibold tracking-wide md:text-2xl ${
              task.completed
                ? 'text-gold-700/45 line-through decoration-gold-700/50'
                : 'text-gold-100'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className={`mb-4 text-base leading-relaxed ${
                task.completed ? 'text-gold-800/35' : 'text-zinc-400/90'
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-gold-500/10 pt-4 text-sm text-zinc-500">
            {task.assignee && (
              <div className="flex items-center gap-2">
                <span className="text-gold-600/80">◈</span>
                <span className="text-gold-500/60">Ответственный:</span>
                <span className="text-zinc-300">{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <span className="text-gold-600/80">◷</span>
                <span className="text-gold-500/60">Срок:</span>
                <span className="text-zinc-300">{formatDate(task.dueDate)}</span>
              </div>
            )}
            {task.location && (
              <div className="flex items-center gap-2">
                <span className="text-gold-600/80">◉</span>
                <span className="text-gold-500/60">Локация:</span>
                <span className="text-zinc-300">{task.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
