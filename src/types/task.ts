export type TaskPriority = 'urgent' | 'high' | 'medium' | 'low'

export interface Task {
  id: string
  title: string
  description: string
  category: string
  priority: TaskPriority
  assignee: string
  dueDate: string
  location: string
  completed: boolean
}

export const priorityLabels: Record<TaskPriority, string> = {
  urgent: 'Срочно',
  high: 'Высокий',
  medium: 'Средний',
  low: 'Низкий',
}
