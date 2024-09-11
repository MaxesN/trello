<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue'

defineProps</* @vue-ignore */ ButtonHTMLAttributes>()
</script>

<template>
  <button class="hover:bg-black/10 py-1 px-2 rounded-md transition-all focus:outline-none">
    <slot />
  </button>
</template>
