import type { TaskList } from '@/shared/types'

export const initTaskLists: TaskList[] = [
  {
    id: '0b761689-6afa-402d-8886-7d6fd81a63f5',
    name: 'TODO',
    tasks: [{
      id: '0b711689-6afa-402d-8886-7d6fd81a63f5',
      name: 'todo something todo something',
      description: 'lorem inpt',
      users: [],
      responsibleUser: null,
      priority: null,
    }],
  },
  {
    id: '0b761689-6efw-422d-8886-7d6fd81a63f5',
    name: 'In progress',
    tasks: [],
  },
  {
    id: '0b761689-6afs-402d-8886-7d6fd81a63f5',
    name: 'Done',
    tasks: [],
  },
]
