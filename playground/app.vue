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
const storage = useLocalForage()
const savedKey = ref<string>()
const key = ref('')
const value = ref('')

async function save () {
  // Clear the key/value defined by the user before attempting to save
  if (savedKey.value) {
    await storage.removeItem(savedKey.value)
  }

  // Save the key, so we can get the value on mount
  await storage.setItem('_key', key.value)
  savedKey.value = key.value

  // Save the value using key/value defined by the user
  await storage.setItem(key.value, value.value)
}

function get () {
  // Get the value defined by the user
  storage.getItem(key.value).then((value) => {
    switch (storage.driver()) {
      case storage.INDEXEDDB:
        console.log('STORED IN:', 'IndexedDB')
        break
      case storage.WEBSQL:
        console.log('STORED IN:', 'Web SQL')
        break
      case storage.LOCALSTORAGE:
        console.log('STORED IN:', 'Local Storage')
        break
      default:
        console.log('STORED IN:', storage.driver())
    }

    console.log('Key:', key.value)
    console.log('Value:', value)
  })
}

onMounted(async () => {
  // Get the key
  const _savedKey = await storage.getItem('_key') as string

  // If defined, load the data
  if (_savedKey) {
    savedKey.value = _savedKey
    key.value = _savedKey
    value.value = await storage.getItem(key.value) as string
  }
})
</script>
