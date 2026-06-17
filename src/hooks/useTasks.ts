import { useCallback, useEffect, useState } from 'react'
import { mockTasks } from '../data/mockTasks'
import type { Task } from '../types/task'
import type { TaskDraft } from '../utils/taskHelpers'
import { createId } from '../utils/taskHelpers'

function storageKey(userId?: number) {
  return userId ? `gold-planner-tasks-${userId}` : 'gold-planner-tasks-local'
}

function loadTasks(key: string): Task[] | null {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = JSON.parse(saved) as Task[]
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    /* ignore corrupted storage */
  }
  return null
}

export function useTasks(userId?: number) {
  const key = storageKey(userId)
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(key) ?? [])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const saved = loadTasks(key)
    setTasks(saved ?? [])
    setInitialized(true)
  }, [key])

  useEffect(() => {
    if (!initialized) return
    localStorage.setItem(key, JSON.stringify(tasks))
  }, [tasks, key, initialized])

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }, [])

  const addTask = useCallback((draft: TaskDraft) => {
    const task: Task = { ...draft, id: createId(), completed: false }
    setTasks((prev) => [task, ...prev])
    return task
  }, [])

  const updateTask = useCallback((id: string, draft: TaskDraft) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...draft } : t)),
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const loadDemoTasks = useCallback(() => {
    setTasks(JSON.parse(JSON.stringify(mockTasks)) as Task[])
  }, [])

  const clearAllTasks = useCallback(() => {
    setTasks([])
  }, [])

  return {
    tasks,
    toggleTask,
    addTask,
    updateTask,
    deleteTask,
    loadDemoTasks,
    clearAllTasks,
  }
}
