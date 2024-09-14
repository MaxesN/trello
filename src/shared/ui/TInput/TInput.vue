<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

interface Props {
  value: string
  variant: 'input' | 'textarea'
}

const { value, variant } = defineProps<Props>()
const input = ref<HTMLElement>()
const isChangeName = ref(false)

watch(isChangeName, async () => {
  if (isChangeName.value && input.value) {
    await nextTick()
    input.value.focus()
  }
})
</script>

<template>
  <button v-show="!isChangeName" @click="isChangeName = true">
    <p class="text-start text-sm">
      {{ value }}
    </p>
  </button>
  <component
    :is="variant"
    v-show="isChangeName"
    ref="input"
    :value="value"
    type="text"
    rows="8"
    class="focus:outline-blue-700 px-2 w-full text-sm"
    @focusout="isChangeName = false"
  />
</template>
