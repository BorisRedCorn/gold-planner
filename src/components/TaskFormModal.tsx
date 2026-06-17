import { useEffect, useState } from 'react'
import type { Category } from '../types/category'
import type { Task } from '../types/task'
import { priorityLabels } from '../types/task'
import {
  allPriorities,
  emptyTaskDraft,
  taskToDraft,
  type TaskDraft,
} from '../utils/taskHelpers'

interface TaskFormModalProps {
  open: boolean
  task?: Task | null
  categories: Category[]
  defaultCategoryId: string
  onClose: () => void
  onSave: (draft: TaskDraft) => void
}

const inputClass =
  'app-input w-full rounded-lg border border-gold-500/20 bg-black/40 px-4 py-3 text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-gold-500/50'

const labelClass = 'mb-1.5 block text-xs tracking-widest text-gold-600/70 uppercase'

export function TaskFormModal({
  open,
  task,
  categories,
  defaultCategoryId,
  onClose,
  onSave,
}: TaskFormModalProps) {
  const [draft, setDraft] = useState<TaskDraft>(() => emptyTaskDraft(defaultCategoryId))
  const isEdit = Boolean(task)

  useEffect(() => {
    if (open) {
      setDraft(task ? taskToDraft(task) : emptyTaskDraft(defaultCategoryId))
    }
  }, [open, task, defaultCategoryId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    onSave({ ...draft, title: draft.title.trim() })
    onClose()
  }

  const set = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="glass-card gold-border-glow max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold-500/30 p-6"
        onClick={(e) => e.stopPropagation()}
        dir="ltr"
      >
        <h2 className="gold-gradient-text mb-6 font-serif text-2xl font-bold text-gold-400">
          {isEdit ? 'Редактировать задачу' : 'Новая задача'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="title">
              Название *
            </label>
            <input
              id="title"
              dir="ltr"
              className={inputClass}
              value={draft.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Например: Заказ продуктов на выходные"
              required
              autoComplete="off"
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="description">
              Описание
            </label>
            <textarea
              id="description"
              dir="ltr"
              className={`${inputClass} min-h-24 resize-none`}
              value={draft.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Подробности задачи..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="category">
                Категория
              </label>
              <select
                id="category"
                dir="ltr"
                className={inputClass}
                value={draft.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="priority">
                Приоритет
              </label>
              <select
                id="priority"
                dir="ltr"
                className={inputClass}
                value={draft.priority}
                onChange={(e) => set('priority', e.target.value as TaskDraft['priority'])}
              >
                {allPriorities.map((p) => (
                  <option key={p} value={p}>
                    {priorityLabels[p]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="assignee">
              Ответственный
            </label>
            <input
              id="assignee"
              dir="ltr"
              className={inputClass}
              value={draft.assignee}
              onChange={(e) => set('assignee', e.target.value)}
              placeholder="Имя"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="dueDate">
                Срок
              </label>
              <input
                id="dueDate"
                type="date"
                dir="ltr"
                className={inputClass}
                value={draft.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="location">
                Локация
              </label>
              <input
                id="location"
                dir="ltr"
                className={inputClass}
                value={draft.location}
                onChange={(e) => set('location', e.target.value)}
                placeholder="Где выполнять"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="app-btn flex-1 cursor-pointer rounded-xl border border-gold-500/50 bg-gold-500/15 py-3 font-serif text-lg text-gold-300 transition-all hover:bg-gold-500/25"
            >
              {isEdit ? 'Сохранить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="app-btn cursor-pointer rounded-xl border border-gold-500/15 px-6 py-3 text-zinc-500 transition-colors hover:border-gold-500/30 hover:text-zinc-300"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
