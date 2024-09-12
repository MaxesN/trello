<script setup lang="ts">
import type { Props } from './types'

const { name, performers } = defineProps<Props>()
</script>

<template>
  <button class="shadow-md py-2 w-full border-[1.5px] bg-white px-4 rounded-md text-sm hover:border-blue-400 text-start">
    <p>{{ name }}</p>
    <div class="flex justify-end">
      <button
        v-for="performer in performers"
        :key="performer.id"
        class="hover:opacity-80 relative -ml-3 text-[10px] text-white w-6 h-6 rounded-full flex items-center bg-red-500 justify-center border border-white"
      >
        <img v-if="performer.avatar" class="rounded-full w-full h-full" :src="performer.avatar" alt="avatar">
        <span v-else>{{ `${performer.firstName[0]}${performer.lastName[0]}`.toUpperCase() }}</span>
      </button>
    </div>
  </button>
</template>
