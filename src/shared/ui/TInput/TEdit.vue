<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

interface Props {
  value: string
}

const { value } = defineProps<Props>()
const emit = defineEmits<{
  (event: 'changeName', value: string): void
}>()
const input = ref<HTMLElement>()
const isChangingName = ref(false)
const localValue = ref(value)

watch(isChangingName, async () => {
  if (isChangingName.value && input.value) {
    await nextTick()
    input.value.focus()
  }
})

function handlerFocusOut() {
  isChangingName.value = false
  emit('changeName', localValue.value)
}
</script>

<template>
  <button v-show="!isChangingName" @click="isChangingName = true">
    <p class="text-start text-sm">
      {{ value }}
    </p>
  </button>
  <input
    v-show="isChangingName"
    ref="input"
    v-model="localValue"
    type="text"
    rows="8"
    class="focus:outline-blue-700 px-2 w-full text-sm"
    @focusout="handlerFocusOut"
  >
</template>
