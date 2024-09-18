<script setup lang="ts">
import { ref } from 'vue'
import { TButton } from '../TButton'

interface Props {
  label: string
  icon?: string
  isButton?: boolean
}

const { label, icon, isButton = true } = defineProps<Props>()

const isMenu = ref(false)
</script>

<template>
  <div class="relative w-full" @mouseleave="isMenu = false">
    <TButton v-if="isButton" @click="isMenu = true">
      <div class="flex gap-2">
        <img v-if="icon" width="14" :src="icon" alt="icon" class="flex-shrink-0">
        <span>
          {{ label }}
        </span>
      </div>
    </TButton>
    <button v-else @click="isMenu = true">
      <p>
        {{ label }}
      </p>
    </button>
    <div v-if="isMenu" class="absolute z-20 text-center bg-white flex flex-col p-1 gap-1 text-xs w-full left-0">
      <slot />
    </div>
  </div>
</template>
