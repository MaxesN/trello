<script setup lang="ts">
import type { User } from '@/shared/types'

const { avatar, firstName, id, lastName } = defineProps<User>()
</script>

<template>
  <button
    :key="id"
    class="hover:opacity-80 relative -ml-3 text-[10px] text-white w-6 h-6 rounded-full flex items-center bg-red-500 justify-center border border-white"
  >
    <img v-if="avatar" class="rounded-full w-full h-full" :src="avatar" alt="avatar">
    <span v-else>{{ `${firstName[0]}${lastName[0]}`.toUpperCase() }}</span>
  </button>
</template>
