import { useCallback, useEffect, useState } from 'react'
import {
  createCategoryId,
  resetCategoriesToDefault,
  type Category,
} from '../types/category'

function storageKey(userId?: number) {
  return userId ? `gold-planner-categories-${userId}` : 'gold-planner-categories-local'
}

function loadCategories(key: string): Category[] | null {
  try {
    const saved = localStorage.getItem(key)
    if (saved) {
      const parsed = JSON.parse(saved) as Category[]
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {
    /* ignore */
  }
  return null
}

export function useCategories(userId?: number) {
  const key = storageKey(userId)
  const [categories, setCategories] = useState<Category[]>(
    () => loadCategories(key) ?? resetCategoriesToDefault(),
  )
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    setCategories(loadCategories(key) ?? resetCategoriesToDefault())
    setInitialized(true)
  }, [key])

  useEffect(() => {
    if (!initialized) return
    localStorage.setItem(key, JSON.stringify(categories))
  }, [categories, key, initialized])

  const addCategory = useCallback((label: string, icon: string) => {
    const trimmed = label.trim()
    if (!trimmed) return null
    const category: Category = {
      id: createCategoryId(),
      label: trimmed,
      icon: icon.trim() || '◆',
    }
    setCategories((prev) => [...prev, category])
    return category
  }, [])

  const updateCategory = useCallback((id: string, label: string, icon: string) => {
    const trimmed = label.trim()
    if (!trimmed) return
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, label: trimmed, icon: icon.trim() || '◆' } : c,
      ),
    )
  }, [])

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const resetCategories = useCallback(() => {
    setCategories(resetCategoriesToDefault())
  }, [])

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetCategories,
  }
}
