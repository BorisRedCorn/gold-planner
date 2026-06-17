import { useEffect, useState } from 'react'
import type { Category } from '../types/category'
import { IconButton } from './IconButton'

interface CategoryManagerModalProps {
  open: boolean
  categories: Category[]
  taskCounts: Record<string, number>
  onClose: () => void
  onAdd: (label: string, icon: string) => void
  onUpdate: (id: string, label: string, icon: string) => void
  onDelete: (id: string) => void
  onReset: () => void
}

const inputClass =
  'app-input w-full rounded-lg border border-gold-500/20 bg-black/40 px-3 py-2.5 text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-gold-500/50'

export function CategoryManagerModal({
  open,
  categories,
  taskCounts,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
  onReset,
}: CategoryManagerModalProps) {
  const [newLabel, setNewLabel] = useState('')
  const [newIcon, setNewIcon] = useState('◆')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editLabel, setEditLabel] = useState('')
  const [editIcon, setEditIcon] = useState('')

  useEffect(() => {
    if (open) {
      setNewLabel('')
      setNewIcon('◆')
      setEditingId(null)
    }
  }, [open])

  const startEdit = (cat: Category) => {
    setEditingId(cat.id)
    setEditLabel(cat.label)
    setEditIcon(cat.icon)
  }

  const saveEdit = () => {
    if (!editingId || !editLabel.trim()) return
    onUpdate(editingId, editLabel, editIcon)
    setEditingId(null)
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newLabel.trim()) return
    onAdd(newLabel, newIcon)
    setNewLabel('')
    setNewIcon('◆')
  }

  const handleDelete = (cat: Category) => {
    const count = taskCounts[cat.id] ?? 0
    if (count > 0) {
      window.alert(`Нельзя удалить: ${count} задач в категории «${cat.label}»`)
      return
    }
    if (categories.length <= 1) {
      window.alert('Должна остаться хотя бы одна категория')
      return
    }
    if (window.confirm(`Удалить категорию «${cat.label}»?`)) {
      onDelete(cat.id)
      if (editingId === cat.id) setEditingId(null)
    }
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
        <h2 className="gold-gradient-text mb-2 font-serif text-2xl font-bold text-gold-400">
          Категории
        </h2>
        <p className="mb-6 text-sm text-zinc-500">
          Переименуйте, добавьте или удалите категории задач
        </p>

        <ul className="mb-6 space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="rounded-xl border border-gold-500/15 bg-black/30 p-4"
            >
              {editingId === cat.id ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      dir="ltr"
                      className={`${inputClass} w-14 text-center`}
                      value={editIcon}
                      onChange={(e) => setEditIcon(e.target.value)}
                      maxLength={2}
                      placeholder="◆"
                    />
                    <input
                      dir="ltr"
                      className={`${inputClass} flex-1`}
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={saveEdit}
                      className="app-btn cursor-pointer rounded-lg border border-gold-500/40 bg-gold-500/15 px-4 py-2.5 text-sm text-gold-300"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="app-btn cursor-pointer rounded-lg px-4 py-2.5 text-sm text-zinc-500"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-lg text-gold-500">{cat.icon}</span>
                    <div className="min-w-0">
                      <p className="truncate text-zinc-200">{cat.label}</p>
                      <p className="text-xs text-zinc-600">
                        {taskCounts[cat.id] ?? 0} задач
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <IconButton label="Редактировать" onClick={() => startEdit(cat)}>
                      ✎
                    </IconButton>
                    <IconButton label="Удалить" variant="danger" onClick={() => handleDelete(cat)}>
                      ✕
                    </IconButton>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleAdd} className="mb-4 space-y-3 border-t border-gold-500/10 pt-4">
          <p className="text-xs tracking-widest text-gold-600/70 uppercase">
            Новая категория
          </p>
          <div className="flex gap-2">
            <input
              dir="ltr"
              className={`${inputClass} w-14 text-center`}
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              maxLength={2}
              placeholder="◆"
            />
            <input
              dir="ltr"
              className={`${inputClass} flex-1`}
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Название категории"
            />
          </div>
          <button
            type="submit"
            className="app-btn w-full cursor-pointer rounded-xl border border-gold-500/40 bg-gold-500/10 py-3 text-gold-400 transition-colors hover:bg-gold-500/20"
          >
            + Добавить категорию
          </button>
        </form>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Вернуть стандартные категории? Названия обновятся, задачи сохранятся.')) {
                onReset()
              }
            }}
            className="app-btn cursor-pointer rounded-lg border border-gold-500/15 px-4 py-2.5 text-sm text-zinc-500 hover:text-gold-500"
          >
            Сбросить к стандартным
          </button>
          <button
            type="button"
            onClick={onClose}
            className="app-btn ml-auto cursor-pointer rounded-lg border border-gold-500/30 px-4 py-2.5 text-sm text-gold-400"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  )
}
