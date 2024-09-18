<script setup lang="ts">
import { TButton, TEdit } from '@/shared/ui'
import { ref } from 'vue'

import draggable from 'vuedraggable'
import type { Task, TaskList } from '@/shared/types'
import { CardTask } from './card'
import { EditTask } from './edit-task'
import { useTask } from './stores/task/task'

const { tasks, name, id } = defineProps<TaskList>()
const { changeTaskListName, addTask } = useTask()

const taskEditing = ref<null | Task>(null)
</script>

<template>
  <div class="w-full min-w-[150px] flex flex-col gap-2 p-2 rounded-md bg-[#F1F2F4]">
    <TEdit :value="name" @change-name="(value) => changeTaskListName(id, value)" />
    <draggable
      group="{
          name: 'items',
          pull: true,
          put: true
        }"
      :list="tasks"
      item-key="id"
      class="flex flex-col gap-2"
    >
      <template #item="{ element }">
        <div>
          <button class="w-full" @click="taskEditing = element">
            <CardTask v-bind="element" />
          </button>
        </div>
      </template>
    </draggable>
    <TButton class="text-sm text-left flex items-center gap-1" @click="addTask(id)">
      <img class="opacity-80" src="./assets/plus.svg" width="12px" alt="plus"> Add a card
    </TButton>
  </div>
  <EditTask v-if="!!taskEditing" v-bind="taskEditing" :list-name="name" :list-id="id" @close="() => taskEditing = null" />
</template>
