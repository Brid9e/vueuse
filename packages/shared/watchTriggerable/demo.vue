<script setup lang="ts">
import { watchTriggerable } from '@vueuse/core'
import { shallowRef } from 'vue'

const log = shallowRef('')
const source = shallowRef(0)

const { trigger, ignoreUpdates } = watchTriggerable(
  source,
  async (v, _, onCleanup) => {
    let canceled = false
    onCleanup(() => canceled = true)
    await new Promise(resolve => setTimeout(resolve, 500))
    if (canceled)
      return

    log.value += `The value is "${v}"\n`
  },
)

function clear() {
  ignoreUpdates(() => {
    source.value = 0
    log.value = ''
  })
}
function update() {
  source.value++
}
</script>

<template>
  <div>Value: {{ source }}</div>
  <button @click="update">
    Update
  </button>
  <button class="orange" @click="trigger">
    Manual Trigger
  </button>
  <button @click="clear">
    Reset
  </button>

  <br>

  <note>Log (500 ms delay)</note>

  <pre>{{ log }}</pre>
</template>
