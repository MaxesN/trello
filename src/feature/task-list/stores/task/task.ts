import { defineStore } from 'pinia'
import { v4 } from 'uuid'

import type { Priority, User } from '@/shared/types'
import { initTaskLists } from './'

export const useTask = defineStore('task', {
  state: () => ({
    taskLists: [...initTaskLists],
  }),

  actions: {
    changeTaskListName(id: string, name: string) {
      const taskList = this.taskLists.find(el => el.id === id)

      if (taskList) {
        taskList.name = name
      }
    },

    changeTaskName(listId: string, id: string, name: string) {
      const task = this.taskLists.find(list => list.id === listId)?.tasks.find(task => task.id === id)

      if (task) {
        task.name = name
      }
    },

    changeTaskDescription(listId: string, id: string, description: string) {
      const task = this.taskLists.find(list => list.id === listId)?.tasks.find(task => task.id === id)

      if (task) {
        task.description = description
      }
    },

    changeTaskStatus(listId: string, id: string, moveToId: string) {
      const taskList = this.taskLists.find(list => list.id === listId)
      const taskToReplace = taskList?.tasks.find(task => task.id === id)
      const listToMove = this.taskLists.find(list => list.id === moveToId)

      if (taskList?.tasks && taskToReplace && moveToId) {
        listToMove?.tasks.push(taskToReplace)
        taskList.tasks = taskList.tasks.filter(task => task.id !== taskToReplace.id)
      }
    },

    addTask(taskListId: string) {
      const taskList = this.taskLists.find(list => list.id === taskListId)

      if (taskList) {
        taskList.tasks.push({
          id: v4(),
          name: 'New Task',
          users: [],
          responsibleUser: null,
          priority: null,
        })
      }
    },

    addOrRemoveUsers(listId: string, id: string, user: User) {
      const task = this.taskLists.find(list => list.id === listId)?.tasks.find(task => task.id === id)

      if (task) {
        if (task.users.find(el => el.id === user.id)) {
          task.users = task.users.filter(el => el.id !== user.id)
        }
        else {
          task.users.push(user)
        }
      }
    },

    addOrRemoveResponsibility(listId: string, id: string, user: User) {
      const task = this.taskLists.find(list => list.id === listId)?.tasks.find(task => task.id === id)

      if (task) {
        if (task.responsibleUser?.id === user.id) {
          task.responsibleUser = null
        }
        else {
          task.responsibleUser = user
        }
      }
    },

    addOrRemovePriority(listId: string, id: string, priority: Priority) {
      const task = this.taskLists.find(list => list.id === listId)?.tasks.find(task => task.id === id)
      if (task) {
        if (task.priority === priority) {
          task.priority = null
        }
        else {
          task.priority = priority
        }
      }
    },

    deleteTask(listId: string, id: string) {
      const taskList = this.taskLists.find(list => list.id === listId)
      if (taskList?.tasks) {
        taskList.tasks = taskList.tasks.filter(el => el.id !== id)
      }
    },
  },

})
