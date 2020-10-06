<template>
  <div class="container">
    <h1 class="header">Create a Configuration</h1>
    <div class="configSelect">
      <div class="inputRow">
        <input
          v-model="configType"
          name="newConfigRadio"
          type="radio"
          :value="0"
        />
        <label for="newConfigRadio">Start from Scratch</label>
      </div>
      <div class="inputRow">
        <input
          v-model="configType"
          name="oldConfigRadio"
          type="radio"
          :value="1"
        />
        <label for="newConfigRadio">Start from Previous Configuration</label>
      </div>
    </div>
    <div class="navButtons">
      <nuxt-link to="/" class="navButton">Back</nuxt-link>
      <nuxt-link
        to="/unit-definition"
        class="navButton"
        @click.native="initConfig"
        >Next</nuxt-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configType: 0,
    }
  },
  methods: {
    initConfig() {
      if (this.configType === 0) {
        this.$store.commit('resetConfig')
      } else {
        // pull saved config + set in store
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 45px;
}
.header {
  padding: 18px 45px;
  color: var(--dark-blue);
  background-color: var(--light-grey);
  border-radius: 36px;
}
.configSelect {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
}
.inputRow {
  font-size: 20px;
  display: flex;
  align-items: center;
  margin: 18px 0;
  input {
    cursor: pointer;
    height: 24px;
    width: 24px;
    margin-right: 18px;
  }
}
.navButtons {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
</style>
