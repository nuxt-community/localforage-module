<template>
  <div>
    <h3>Save value using LocalForage</h3>

    <label for="key">Key</label>
    <input id="key" v-model="key" type="text">

    <label for="value">Value</label>
    <input id="value" v-model="value" type="text">

    <button @click="save">
      Save
    </button>
    <button @click="get">
      Log
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from '#imports'

const { $localForage } = useNuxtApp()
const savedKey = ref<string>()
const key = ref('')
const value = ref('')

async function save () {
  // Clear the key/value defined by the user before attempting to save
  if (savedKey.value) {
    await $localForage.removeItem(savedKey.value)
  }

  // Save the key, so we can get the value on mount
  await $localForage.setItem('_key', key.value)
  savedKey.value = key.value

  // Save the value using key/value defined by the user
  await $localForage.setItem(key.value, value.value)
}

function get () {
  // Get the value defined by the user
  $localForage.getItem(key.value).then((value) => {
    switch ($localForage.driver()) {
      case $localForage.INDEXEDDB:
        console.log('STORED IN:', 'IndexedDB')
        break
      case $localForage.WEBSQL:
        console.log('STORED IN:', 'Web SQL')
        break
      case $localForage.LOCALSTORAGE:
        console.log('STORED IN:', 'Local Storage')
        break
      default:
        console.log('STORED IN:', $localForage.driver())
    }

    console.log('Key:', key.value)
    console.log('Value:', value)
  })
}

onMounted(async () => {
  // Get the key
  const _savedKey = await $localForage.getItem('_key') as string

  // If defined, load the data
  if (_savedKey) {
    savedKey.value = _savedKey
    key.value = _savedKey
    value.value = await $localForage.getItem(key.value) as string
  }
})
</script>
