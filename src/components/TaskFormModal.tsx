import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Task } from '../types/task'
import {
  allCategories,
  allPriorities,
  emptyTaskDraft,
  taskToDraft,
  type TaskDraft,
} from '../utils/taskHelpers'
import { categoryLabels, priorityLabels } from '../types/task'

interface TaskFormModalProps {
  open: boolean
  task?: Task | null
  onClose: () => void
  onSave: (draft: TaskDraft) => void
}

const inputClass =
  'w-full rounded-lg border border-gold-500/20 bg-black/40 px-4 py-3 text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-gold-500/50'

const labelClass = 'mb-1.5 block text-xs tracking-widest text-gold-600/70 uppercase'

export function TaskFormModal({ open, task, onClose, onSave }: TaskFormModalProps) {
  const [draft, setDraft] = useState<TaskDraft>(emptyTaskDraft)
  const isEdit = Boolean(task)

  useEffect(() => {
    if (open) {
      setDraft(task ? taskToDraft(task) : emptyTaskDraft())
    }
  }, [open, task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!draft.title.trim()) return
    onSave({ ...draft, title: draft.title.trim() })
    onClose()
  }

  const set = <K extends keyof TaskDraft>(key: K, value: TaskDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="glass-card gold-border-glow max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gold-500/30 p-6"
            onClick={(e) => e.stopPropagation()}
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
                  className={inputClass}
                  value={draft.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Например: Заказ продуктов на выходные"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="description">
                  Описание
                </label>
                <textarea
                  id="description"
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
                    className={inputClass}
                    value={draft.category}
                    onChange={(e) => set('category', e.target.value as TaskDraft['category'])}
                  >
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
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
                  className="flex-1 cursor-pointer rounded-xl border border-gold-500/50 bg-gold-500/15 py-3 font-serif text-lg text-gold-300 transition-all hover:bg-gold-500/25 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                >
                  {isEdit ? 'Сохранить' : 'Добавить'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer rounded-xl border border-gold-500/15 px-6 py-3 text-zinc-500 transition-colors hover:border-gold-500/30 hover:text-zinc-300"
                >
                  Отмена
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
