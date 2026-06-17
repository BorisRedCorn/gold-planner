import type { Task, TaskCategory, TaskPriority } from '../types/task'

export type TaskDraft = Omit<Task, 'id' | 'completed'>

export const emptyTaskDraft = (): TaskDraft => ({
  title: '',
  description: '',
  category: 'kitchen',
  priority: 'medium',
  assignee: '',
  dueDate: new Date().toISOString().slice(0, 10),
  location: '',
})

export function taskToDraft(task: Task): TaskDraft {
  return {
    title: task.title,
    description: task.description,
    category: task.category,
    priority: task.priority,
    assignee: task.assignee,
    dueDate: task.dueDate,
    location: task.location,
  }
}

export function createId(): string {
  return crypto.randomUUID()
}

export const allCategories: TaskCategory[] = [
  'kitchen',
  'service',
  'wine',
  'events',
  'suppliers',
  'staff',
  'menu',
]

export const allPriorities: TaskPriority[] = ['urgent', 'high', 'medium', 'low']
