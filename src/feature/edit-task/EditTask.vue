<script setup lang="ts">
import { TAvatar, TButton, TInput } from '@/shared/ui'
</script>

<template>
  <div class="absolute w-full min-h-screen flex justify-center p-10 overflow-auto items-center bg-black/40 z-50 top-0">
    <div class="bg-white/80 flex flex-col gap-6 max-w-[500px] min-h-[400px] w-full p-4 rounded-md relative">
      <div class="text-sm flex items-start justify-between">
        <div class="w-full">
          <div class="flex items-start gap-2">
            <img src="./assets/file.svg" width="20px" alt="file">
            <div class="w-full">
              <TInput variant="input" value="TODO" />
              <p class="text-xs">
                in a list of <button class="underline">
                  TODO
                </button>
              </p>
            </div>
          </div>
        </div>
        <TButton class="max-w-[35px]">
          <img src="./assets/x.svg" width="20px" alt="x">
        </TButton>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex gap-4 text-xs">
            <div class="flex flex-col items-center">
              <p>
                members
              </p>
              <div class="flex">
                <TAvatar v-for="user in [{ id: 'eqweqw', firstName: 'eqwew', lastName: 'eqwewq' }, { id: 'eqweqw', firstName: 'eqwew', lastName: 'eqwewq' }]" :key="user.id" v-bind="user" />
              </div>
            </div>
            <div class="select-none">
              <p>
                priority
              </p>
              <div class="w-10 mt-1 h-6 flex justify-center items-center text-white bg-red-600">
                high
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="flex justify-between gap-4 w-full">
              <div class="flex w-full items-start gap-2">
                <img src="./assets/desc.svg" width="20px" alt="desc-icon">
                <div class="w-full">
                  <div class="flex justify-between items-center">
                    <p>Description</p>
                  </div>
                  <div>
                    <TInput value="eqweqweqwe" variant="textarea" />
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
          <TButton>
            <div class="flex gap-2">
              <img src="./assets/resp_person.svg" width="14px" alt="person">
              <span>
                responsibility
              </span>
            </div>
          </TButton>
          <TButton>
            <div class="flex gap-2">
              <img src="./assets/person.svg" width="14px" alt="person">
              <span>
                performers
              </span>
            </div>
          </TButton>
          <TButton>
            <div class="flex gap-2">
              <img src="./assets/priority.svg" width="14px" alt="priority">
              <span>
                priority
              </span>
            </div>
          </TButton>
          <TButton>
            <div class="flex gap-2">
              <img src="./assets/arrow.svg" width="14px" alt="arrow">
              <span>
                relocate
              </span>
            </div>
          </TButton>
        </div>
      </div>
    </div>
  </div>
</template>
