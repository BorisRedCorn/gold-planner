import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Task } from './types/task'
import type { TaskDraft } from './utils/taskHelpers'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { CategoryFilter } from './components/CategoryFilter'
import { CategoryManagerModal } from './components/CategoryManagerModal'
import { TaskCard } from './components/TaskCard'
import { TaskFormModal } from './components/TaskFormModal'
import { useTasks } from './hooks/useTasks'
import { useCategories } from './hooks/useCategories'
import { useTelegram } from './hooks/useTelegram'

function App() {
  const { isTelegram, user } = useTelegram()
  const {
    tasks,
    toggleTask,
    addTask,
    updateTask,
    deleteTask,
    clearAllTasks,
  } = useTasks(user?.id)

  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetCategories,
  } = useCategories(user?.id)

  const defaultCategoryId = categories[0]?.id ?? 'kitchen'

  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const openCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEdit = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  const handleSave = (draft: TaskDraft) => {
    if (editingTask) {
      updateTask(editingTask.id, draft)
    } else {
      addTask(draft)
    }
  }

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id)
    if (activeCategory === id) setActiveCategory('all')
  }

  const stats = useMemo(() => {
    const completed = tasks.filter((t) => t.completed).length
    const urgent = tasks.filter((t) => t.priority === 'urgent' && !t.completed).length
    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      urgent,
    }
  }, [tasks])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tasks.length }
    categories.forEach((c) => {
      counts[c.id] = 0
    })
    tasks.forEach((t) => {
      if (counts[t.category] !== undefined) {
        counts[t.category]++
      } else {
        counts[t.category] = (counts[t.category] ?? 0) + 1
      }
    })
    return counts
  }, [tasks, categories])

  const filteredTasks = useMemo(() => {
    if (activeCategory === 'all') return tasks
    return tasks.filter((t) => t.category === activeCategory)
  }, [tasks, activeCategory])

  const sortedTasks = useMemo(
    () =>
      [...filteredTasks].sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }),
    [filteredTasks],
  )

  return (
    <div className={`radial-gold-bg min-h-screen ${isTelegram ? 'telegram-app' : ''}`}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gold-500/8 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-gold-600/5 blur-[100px]" />
      </div>

      <main
        className={`relative mx-auto max-w-4xl px-4 md:px-8 ${
          isTelegram ? 'py-6 pb-24' : 'py-12 pb-24 md:py-16'
        }`}
      >
        <Header />

        {isTelegram && user && (
          <p className="-mt-6 mb-8 text-center text-sm text-gold-600/50">
            {user.first_name}, ваш личный планировщик ✦
          </p>
        )}

        <StatsBar {...stats} />

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={openCreate}
            className="app-btn min-h-11 cursor-pointer rounded-full border border-gold-500/50 bg-gold-500/15 px-6 py-3 font-serif text-lg text-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all hover:bg-gold-500/25"
          >
            ✦ Новая задача
          </button>
          <button
            type="button"
            onClick={() => setCategoriesOpen(true)}
            className="app-btn min-h-11 cursor-pointer rounded-full border border-gold-500/30 px-5 py-3 text-sm text-gold-500/80 transition-colors hover:border-gold-500/50 hover:text-gold-400"
          >
            ⚙ Категории
          </button>
          {tasks.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Удалить все задачи?')) clearAllTasks()
              }}
              className="app-btn min-h-11 cursor-pointer rounded-full border border-gold-500/10 px-5 py-3 text-sm text-zinc-600 transition-colors hover:border-red-500/30 hover:text-red-400/80"
            >
              Очистить всё
            </button>
          )}
        </div>

        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />

        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                categories={categories}
                onToggle={toggleTask}
                onEdit={openEdit}
                onDelete={deleteTask}
              />
            ))}
          </AnimatePresence>
        </div>

        {sortedTasks.length === 0 && (
          <div className="glass-card rounded-xl border border-gold-500/15 p-12 text-center">
            <p className="mb-2 font-serif text-xl text-gold-500/50">
              {tasks.length === 0 ? 'Задач пока нет' : 'Нет задач в этой категории'}
            </p>
            <p className="text-sm text-zinc-600">
              Нажмите «✦ Новая задача», чтобы добавить свою
            </p>
          </div>
        )}

        <footer className="mt-16 border-t border-gold-500/10 pt-8 text-center">
          <p className="text-sm tracking-[0.2em] text-gold-700/50">
            сделано Бубзиком · Gold Planner · 2026
          </p>
        </footer>
      </main>

      <TaskFormModal
        open={modalOpen}
        task={editingTask}
        categories={categories}
        defaultCategoryId={defaultCategoryId}
        onClose={closeModal}
        onSave={handleSave}
      />

      <CategoryManagerModal
        open={categoriesOpen}
        categories={categories}
        taskCounts={categoryCounts}
        onClose={() => setCategoriesOpen(false)}
        onAdd={addCategory}
        onUpdate={updateCategory}
        onDelete={handleDeleteCategory}
        onReset={resetCategories}
      />

      {isTelegram && (
        <button
          type="button"
          onClick={openCreate}
          aria-label="Новая задача"
          className="app-btn fixed right-5 bottom-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-gold-500/50 bg-gold-500/20 text-2xl text-gold-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] backdrop-blur-sm"
        >
          +
        </button>
      )}
    </div>
  )
}

export default App
