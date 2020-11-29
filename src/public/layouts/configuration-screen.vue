<template>
  <div class="config-container">
    <div class="pageTabs">
      <div :class="['pageTab', { isActive: pageUrl === '/unit-definition' }]">
        Unit Definition
      </div>
      <div :class="['pageTab', { isActive: pageUrl === '/specify-reserve' }]">
        Specify Reserve
      </div>
      <div :class="['pageTab', { isActive: pageUrl === '/finish' }]">
        Finish & Confirm
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  computed: {
    pageUrl() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped lang="stylus">
.config-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pageTabs {
  display: flex;
  width: 700px;
  padding: 54px 0;
  justify-content: space-between;
}
.pageTab {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-grey);
  color: var(--dark-grey);
  padding: 18px 36px;
  border-radius: 18px;
  &.isActive {
    background-color: var(--dark-blue);
    color: white;
  }
}
</style>
