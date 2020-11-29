<template>
  <div>
    <Nuxt />
  </div>
</template>

<style></style>

<script>
export default {
  beforeMount() {
    this.$store.dispatch('initSocket')
  },
}
</script>
