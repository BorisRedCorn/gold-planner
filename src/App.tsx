import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { TaskCategory } from './types/task'
import { Header } from './components/Header'
import { StatsBar } from './components/StatsBar'
import { CategoryFilter } from './components/CategoryFilter'
import { TaskCard } from './components/TaskCard'
import { useTasks } from './hooks/useTasks'
import { useTelegram } from './hooks/useTelegram'

function App() {
  const { isTelegram, user } = useTelegram()
  const { tasks, toggleTask } = useTasks(user?.id)
  const [activeCategory, setActiveCategory] = useState<TaskCategory | 'all'>('all')

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
    const counts: Record<TaskCategory | 'all', number> = {
      all: tasks.length,
      kitchen: 0,
      service: 0,
      wine: 0,
      events: 0,
      suppliers: 0,
      staff: 0,
      menu: 0,
    }
    tasks.forEach((t) => {
      counts[t.category]++
    })
    return counts
  }, [tasks])

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
          isTelegram ? 'py-6 pb-10' : 'py-12 md:py-16'
        }`}
      >
        <Header />

        {isTelegram && user && (
          <p className="-mt-6 mb-8 text-center text-sm text-gold-600/50">
            {user.first_name}, ваш личный планировщик ✦
          </p>
        )}

        <StatsBar {...stats} />

        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          counts={categoryCounts}
        />

        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {sortedTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onToggle={toggleTask}
              />
            ))}
          </AnimatePresence>
        </div>

        {sortedTasks.length === 0 && (
          <div className="glass-card rounded-xl border border-gold-500/15 p-12 text-center">
            <p className="font-serif text-xl text-gold-500/50">
              Нет задач в этой категории
            </p>
          </div>
        )}

        <footer className="mt-16 border-t border-gold-500/10 pt-8 text-center">
          <p className="text-sm tracking-[0.2em] text-gold-700/50">
            сделано Бубзиком · Gold Planner · 2026
          </p>
        </footer>
      </main>
    </div>
  )
}

export default App
