<script setup lang="ts">
import { CardTask } from '@/entity/task/ui'
import { TButton } from '@/shared/ui'
import { nextTick, ref, watch } from 'vue'
import type { Task } from '@/shared/types'

interface Props {
  tasks: Pick<Task, 'id' | 'name' | 'performers'>[]
}

const { tasks } = defineProps<Props>()

const input = ref<HTMLElement>()
const isChangeName = ref(false)

watch(isChangeName, async () => {
  if (isChangeName.value && input.value) {
    await nextTick()
    input.value.focus()
  }
})

const todo = 'TODO'
</script>

<template>
  <div class="max-w-[280px] w-full flex flex-col gap-2 p-2 rounded-md bg-[#F1F2F4]">
    <div>
      <button v-show="!isChangeName" @click="isChangeName = true">
        <p class="ml-2 font-medium text-sm">
          {{ todo }}
        </p>
      </button>
      <input
        v-show="isChangeName"
        ref="input"
        :value="todo"
        type="text"
        placeholder="name"
        class="focus:outline-blue-700 px-2 py-1 text-sm"
        @focusout="isChangeName = false"
      >
    </div>
    <CardTask v-for="task in tasks" :key="task.id" v-bind="task" />
    <TButton class="text-sm text-left flex items-center gap-1">
      <img class="opacity-80" src="./assets/plus.svg" width="12px" alt="plus"> Add a card
    </TButton>
  </div>
</template>
