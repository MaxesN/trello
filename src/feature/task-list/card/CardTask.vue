<script setup lang="ts">
import classnames from 'classnames'
import type { Task } from '@/shared/types/models'
import { priorityColors } from '../edit-task/types'

export type Props = Pick<Task, 'name' | 'users' | 'priority'>

const { name, users, priority } = defineProps<Props>()
</script>

<template>
  <div class="shadow-md py-2 w-full border-[1.5px] bg-white px-4 rounded-md text-sm hover:border-blue-400 text-start">
    <div v-if="priority" :class="classnames(priorityColors[priority], 'w-10 h-2 rounded-lg')" />
    <p>{{ name }}</p>
    <div class="flex justify-end">
      <button
        v-for="user in users"
        :key="user.id"
        class="hover:opacity-80 relative -ml-3 text-[10px] text-white w-6 h-6 rounded-full flex items-center bg-red-500 justify-center border border-white"
      >
        <img v-if="user.avatar" class="rounded-full w-full h-full" :src="user.avatar" alt="avatar">
        <span v-else>{{ `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>
