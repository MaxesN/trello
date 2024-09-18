<script setup lang="ts">
import { TaskList } from '@/feature/task-list'
import { useTask } from '@/feature/task-list/stores/task'
import draggable from 'vuedraggable'

const { taskLists } = useTask()
</script>

<template>
  <div class="flex gap-4 items-start overflow-x-auto">
    <draggable
      :list="taskLists"
      item-key="id"
      class="flex gap-4 justify-start w-full list"
    >
      <template #item="{ element }">
        <div
          class="w-full"
        >
          <TaskList v-bind="element" />
        </div>
      </template>
    </draggable>
  </div>
</template>
