import type { priorities } from '../model'

export type Priority = typeof priorities[number]

export interface User {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface Task {
  id: string
  name: string
  description?: string
  priority: Priority | null
  users: User[]
  responsibleUser: User | null
}

export interface TaskList {
  id: string
  name: string
  tasks: Task[]
}
