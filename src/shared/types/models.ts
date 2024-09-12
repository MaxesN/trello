export interface Person {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface Task {
  id: string
  name: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  priority?: 'high' | 'medium' | 'low'
  performers?: Person[]
  responsiblePerson?: Person
}
