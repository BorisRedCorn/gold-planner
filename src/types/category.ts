export interface Category {
  id: string
  label: string
  icon: string
}

export const defaultCategories: Category[] = [
  { id: 'kitchen', label: 'Кухня', icon: '◆' },
  { id: 'service', label: 'Сервис', icon: '◇' },
  { id: 'wine', label: 'Винный погреб', icon: '◈' },
  { id: 'events', label: 'Приватные события', icon: '✦' },
  { id: 'suppliers', label: 'Поставщики', icon: '◉' },
  { id: 'staff', label: 'Персонал', icon: '◎' },
  { id: 'menu', label: 'Меню & R&D', icon: '❖' },
]

export function findCategory(categories: Category[], id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function categoryLabel(categories: Category[], id: string): string {
  return findCategory(categories, id)?.label ?? 'Без категории'
}

export function categoryIcon(categories: Category[], id: string): string {
  return findCategory(categories, id)?.icon ?? '○'
}

export function createCategoryId(): string {
  return crypto.randomUUID()
}

export function resetCategoriesToDefault(): Category[] {
  return JSON.parse(JSON.stringify(defaultCategories)) as Category[]
}
