import { useCallback, useEffect, useState } from 'react'
import { mockTasks } from '../data/mockTasks'
import type { Task } from '../types/task'

function storageKey(userId?: number) {
  return userId ? `gold-planner-tasks-${userId}` : 'gold-planner-tasks-local'
}

function loadTasks(key: string): Task[] {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = JSON.parse(saved) as Task[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    /* ignore corrupted storage */
  }
  return JSON.parse(JSON.stringify(mockTasks)) as typeof mockTasks
}

export function useTasks(userId?: number) {
  const key = storageKey(userId)
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(key))

  useEffect(() => {
    setTasks(loadTasks(key))
  }, [key])

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks))
  }, [tasks, key])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }, [])

  return { tasks, toggleTask }
}
