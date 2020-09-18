<template>
  <div>
    <div class="pageTabs">
      <div :class="['pageTab', { isActive: pageUrl === 'unit-definition' }]">
        Unit Definition
      </div>
      <div :class="['pageTab', { isActive: pageUrl === 'specify-reserve' }]">
        Specify Reserve
      </div>
      <div :class="['pageTab', { isActive: pageUrl === 'finish' }]">
        Finish & Confirm
      </div>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    pageUrl() {
      return this.$nuxt.$route.path
    },
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.pageTabs {
  display: flex;
  width: 100%;
  padding: 36px;
  justify-content: space-between;
}
.pageTab {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-grey);
  color: var(--dark-grey);
  &.isActive {
    background-color: var(--dark-blue);
    color: white;
  }
}
</style>
