<script setup lang="ts">
import { users as availableUsers, priorities } from '@/shared/model'
import { TAvatar, TButton, TEdit, TMenu } from '@/shared/ui'

import classnames from 'classnames'
import { nextTick, ref, watch } from 'vue'
import type { Task } from '@/shared/types'

import { useTask } from '../stores/task'
import performersIcon from './assets/person.svg'
import priorityIcon from './assets/priority.svg'
import responsibilityIcon from './assets/resp_person.svg'
import { priorityColors } from './types'

interface Props extends Task {
  listName: string
  listId: string
  onClose: () => void
}

const {
  description,
  name,
  users,
  priority,
  responsibleUser,
  listName,
  id,
  listId,
  onClose,
} = defineProps<Props>()
const {
  taskLists,
  changeTaskDescription,
  changeTaskName,
  changeTaskStatus,
  addOrRemoveUsers,
  addOrRemoveResponsibility,
  addOrRemovePriority,
  deleteTask,
} = useTask()

const changesDescription = ref(description || '')
const isEditing = ref(false)
const textarea = ref<HTMLElement>()

watch(isEditing, async () => {
  if (isEditing.value && textarea.value) {
    await nextTick()
    textarea.value.focus()
  }
})

function handlerFocusOut() {
  changeTaskDescription(listId, id, changesDescription.value)
  isEditing.value = false
}

function handlerDeleteTask() {
  deleteTask(listId, id)
  onClose()
}

function handlerChangeTaskStatus(moveToId: string) {
  changeTaskStatus(listId, id, moveToId)
  onClose()
}
</script>

<template>
  <div class="absolute w-full min-h-screen flex justify-center p-10 overflow-auto items-center bg-black/40 z-50 top-0 left-0" @click="onClose">
    <div class="bg-white/80 flex flex-col gap-6 max-w-[500px] min-h-[400px] w-full p-4 rounded-md relative" @click.stop>
      <div class="flex items-start justify-between">
        <div class="w-full">
          <div class="flex items-start gap-2">
            <img src="./assets/file.svg" width="20px" alt="file">
            <div class="w-full">
              <TEdit
                :value="name"
                @change-name="(value) => changeTaskName(listId, id, value)"
              />
              <div class="text-xs flex justify-start items-center">
                <p>
                  in a list of
                </p>
                <div class="inline-block ml-1 min-w-[100px]">
                  <TMenu :label="listName" :is-button="false">
                    <div v-for="taskList in taskLists" :key="taskList.id" class="flex justify-center gap-1">
                      <TButton :class="classnames(['truncate', listId === taskList.id ? 'bg-sky-300 text-white hover:bg-sky-400' : ''])" @click="handlerChangeTaskStatus(taskList.id)">
                        {{ taskList.name }}
                      </TButton>
                    </div>
                  </TMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TButton class="max-w-[35px]" @click="onClose">
          <img src="./assets/x.svg" width="20px" alt="x">
        </TButton>
      </div>
      <div class="flex justify-between gap-4">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex gap-4 text-xs">
            <div v-if="responsibleUser">
              <p>
                responsible
              </p>
              <div class="flex justify-center">
                <TAvatar v-bind="responsibleUser" />
              </div>
            </div>
            <div v-if="users.length > 0" class="flex flex-col items-center">
              <p>
                performers
              </p>
              <div class="flex">
                <TAvatar v-for="user in users" :key="user.id" v-bind="user" />
              </div>
            </div>
            <div v-if="priority" class="select-none">
              <p>
                priority
              </p>
              <div :class="classnames(['px-2 mt-1 h-6 flex justify-center items-center text-white', priorityColors[priority]])">
                {{ priority }}
              </div>
            </div>
          </div>
          <div class="flex justify-between text-xs">
            <div class="flex justify-between gap-4 w-full">
              <div class="flex w-full items-start gap-2">
                <img src="./assets/desc.svg" width="20px" alt="desc-icon" class="mt-1">
                <div class="w-full">
                  <div>
                    <div class="flex justify-between mb-2 items-center">
                      <p>Description</p>
                      <div class="w-[100px]">
                        <TButton v-if="!isEditing" @click="isEditing = true">
                          Edit
                        </TButton>
                      </div>
                    </div>
                    <button v-show="!isEditing" @click="isEditing = true">
                      <p>
                        {{ description }}
                      </p>
                    </button>
                    <textarea v-show="isEditing" ref="textarea" v-model="changesDescription" class="w-full px-2 py-1" rows="6" @focusout="handlerFocusOut" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-[110px] text-xs text-start flex flex-col gap-1 w-full">
          <p>
            Actions
          </p>
          <TMenu :icon="responsibilityIcon" label="responsible">
            <TButton
              v-for="user in availableUsers"
              :key="user.id"
              :class="responsibleUser?.id === user.id
                ? 'bg-blue-100 hover:bg-blue-300'
                : ''"
              @click="addOrRemoveResponsibility(listId, id, user)"
            >
              <div class="flex items-center gap-2 px-2 justify-start">
                <span>
                  <TAvatar v-bind="user" />
                </span>
                <span class="text-[10px]">
                  {{ user.firstName }} {{ user.lastName }}
                </span>
              </div>
            </TButton>
          </TMenu>
          <TMenu :icon="performersIcon" label="performers">
            <TButton
              v-for="user in availableUsers"
              :key="user.id"
              :class="classnames({ 'bg-blue-100 hover:bg-blue-300': users.find(el => el.id === user.id) })"
              @click="addOrRemoveUsers(listId, id, user)"
            >
              <div class="flex items-center gap-2 px-2 justify-start">
                <span>
                  <TAvatar v-bind="user" />
                </span>
                <span class="text-[10px]">
                  {{ user.firstName }} {{ user.lastName }}
                </span>
              </div>
            </TButton>
          </TMenu>
          <TMenu :icon="priorityIcon" label="priority">
            <TButton
              v-for="priorityType in priorities"
              :key="priorityType"
              :class="classnames([priorityType === priority ? `${priorityColors[priorityType]} text-white` : ''])"
              @click="addOrRemovePriority(listId, id, priorityType)"
            >
              <div class="flex items-center gap-2 justify-center">
                <span class="text-[10px]">
                  {{ priorityType }}
                </span>
              </div>
            </TButton>
          </TMenu>
          <TButton @click="handlerDeleteTask">
            <div class="flex gap-2">
              <img width="14px" src="./assets/trash.svg" alt="delete">
              delete
            </div>
          </TButton>
        </div>
      </div>
    </div>
  </div>
</template>
