<template>
  <ConfigLayout>
    <CopyModal
      v-if="copyToShow"
      :copy="copyToShow"
      :on-close="closeCopyModal"
    />
    <div class="container">
      <div class="inputRow mb-54">
        <label for="unitTypeInput"
          >What unit is being allocated?<font-awesome-icon
            icon="info-circle"
            size="sm"
            class="icon ml-9"
            @click="() => setCopyToShow('unitType')"
        /></label>
        <input
          v-model="unitType"
          name="unitTypeInput"
          placeholder="Antibodies"
        />
      </div>
      <div class="mb-54">
        <div class="inputRow">
          <label for="supplyInput"
            >How many units are being allocated?<font-awesome-icon
              icon="info-circle"
              size="sm"
              class="icon ml-9"
              @click="() => setCopyToShow('unitAllocation')"
          /></label>
          <input
            v-model="supply"
            name="supplyInput"
            type="number"
            placeholder="120"
            @input="validateCategorySize"
          />
        </div>
        <div v-if="hasSizeError" class="fs-12 mt-9 ml-a wfc mr-18 col-error">
          Please ensure supply is between 0 and 10,000
        </div>
      </div>
      <div class="navButtons">
        <router-link to="/reserve-instances" class="navButton"
          >Back</router-link
        >
        <button
          :class="['navButton', { isDisabled: isNextButtonDisabled }]"
          @click="generateDefaultCategory"
        >
          Next
        </button>
      </div>
    </div>
  </ConfigLayout>
</template>

<script>
import ConfigLayout from '../layouts/configuration-screen.vue'
import CopyModal from '../components/CopyModal.vue'
import { unitDefinitionCopyMap } from '../components/constants'

export default {
  components: { ConfigLayout, CopyModal },
  data() {
    return {
      hasSizeError: false,
      copyToShow: null,
    }
  },
  computed: {
    isNextButtonDisabled() {
      return !this.unitType || !this.supply || this.hasSizeError
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
    setCopyToShow(copyKey) {
      this.copyToShow = unitDefinitionCopyMap[copyKey]
    },
    closeCopyModal() {
      this.copyToShow = null
    },
    generateDefaultCategory() {
      if (!this.isNextButtonDisabled) {
        this.$store.dispatch('generateDefaultCategory')
        this.$nextTick(() => {
          this.$router.push('/specify-reserve')
        })
      }
    },
    validateCategorySize() {
      this.hasSizeError =
        parseInt(this.supply) > 10000 || parseInt(this.supply) < 0
    },
  },
}
</script>

<style scoped lang="stylus">
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.inputRow {
  width: 700px;
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
    width: 200px;
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
