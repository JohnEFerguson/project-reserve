<template>
  <div class="container">
    <div class="inputRow">
      <label for="unitTypeInput">What unit is being allocated?</label>
      <input v-model="unitType" name="unitTypeInput" placeholder="Antibodies" />
    </div>
    <div class="inputRow">
      <label for="supplyInput">How many units are being allocated?</label>
      <input
        v-model="supply"
        name="supplyInput"
        type="number"
        placeholder="120"
      />
    </div>
    <div class="navButtons">
      <nuxt-link to="/create" class="navButton">Back</nuxt-link>
      <button
        :class="['navButton', { isDisabled: isNextButtonDisabled }]"
        @click="generateDefaultCategory"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'configuration-screen',
  computed: {
    isNextButtonDisabled() {
      return !this.unitType || !this.supply
    },
    unitType: {
      get() {
        return this.$store.state.currentConfig.unitType
      },
      set(val) {
        this.$store.commit('updateUnitType', val)
      },
    },
    supply: {
      get() {
        return this.$store.state.currentConfig.supply
      },
      set(val) {
        this.$store.commit('updateSupply', val)
      },
    },
  },
  methods: {
    generateDefaultCategory() {
      if (this.isNextButtonDisabled) {
        return
      }
      this.$store.commit('generateDefaultCategory')
      this.$nextTick(() => {
        this.$router.push('/specify-reserve')
      })
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inputRow {
  width: 700px;
  margin-bottom: 54px;
  padding: 18px 36px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--light-grey);
  border-radius: 20px;
  label {
    margin-right: 18px;
  }
  input {
    background-color: white;
    border: 2px solid var(--dark-grey);
    font-size: 20px;
    padding: 9px 18px;
    border-radius: 20px;
    outline: none;
    text-align: right;
    &::placeholder {
      color: #ddd;
    }
  }
}
.navButtons {
  width: 50%;
  display: flex;
  justify-content: space-between;
}
</style>
