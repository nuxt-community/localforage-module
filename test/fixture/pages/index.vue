<template>
  <div>
    Length: {{ nb }}
  </div>
</template>

<script>
export default {
  data() {
    return { nb: 0 }
  },

  async mounted() {
    await this.$localForage.setItem('key', 'salut')
    this.nb = await this.$localForage.length()
  }
}
</script>
