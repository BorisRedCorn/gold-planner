export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low'

export type TaskCategory =
  | 'kitchen'
  | 'service'
  | 'wine'
  | 'events'
  | 'suppliers'
  | 'staff'
  | 'menu'

export interface Task {
  id: string
  title: string
  description: string
  category: TaskCategory
  priority: TaskPriority
  assignee: string
  dueDate: string
  location: string
  completed: boolean
}

export const categoryLabels: Record<TaskCategory, string> = {
  kitchen: 'Кухня',
  service: 'Сервис',
  wine: 'Винный погреб',
  events: 'Приватные события',
  suppliers: 'Поставщики',
  staff: 'Персонал',
  menu: 'Меню & R&D',
}

export const priorityLabels: Record<TaskPriority, string> = {
  urgent: 'Срочно',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}
