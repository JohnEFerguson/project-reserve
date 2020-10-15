<template>
  <div class="finishContainer"></div>
</template>

<script>
export default {
  layout: 'configuration-screen',
  middleware: 'has-category',
  computed: {
    totalSupply() {
      return this.$store.state.currentConfig.supply
    },
    unitType() {
      return this.$store.state.currentConfig.unitType
    },
    reserveCategories() {
      return this.$store.state.currentConfig.reserveCategories
    },
  },
}
</script>

<style scoped lang="scss"></style>
