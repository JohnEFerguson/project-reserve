<template>
  <ConfigLayout>
    <div class="reserveContainer">
      <EditReserveCategoryModal
        v-if="editReserveCategoryModalOpen"
        :on-close="closeEditReserveCategoryModal"
        :mode="editReserveCategoryModalMode"
        :category-to-edit="categoryToEdit || undefined"
      />
      <ViewPriorityOrderModal
        v-if="viewPriorityOrderModalOpen"
        :on-close="closeViewPriorityOrderModal"
        :reserve-category="reserveCategoryToView"
      />
      <div class="reserveTableContainer">
        <div class="reserveTableLabels">
          <span>Processing Order</span>
          <span>Reserve Category Name</span>
          <span>Size</span>
          <span>% of Supply</span>
          <span>Priority Order</span>
        </div>
        <div class="reserveTableRows">
          <div
            v-for="category in reserveCategories"
            :key="`${category.name}${category.order}`"
            class="reserveTableRow"
          >
            <span class="rowCell">{{ category.order }}</span>
            <span class="rowCell">{{ category.name }}</span>
            <span class="rowCell">{{ category.size }}</span>
            <span class="rowCell">{{ calcSupplyPercent(category.size) }}</span>
            <button class="p9" @click="() => viewPriorityOrder(category)">
              {{ 'Priority' }}
            </button>
            <span class="actionButtons">
              <font-awesome-icon
                icon="trash"
                :class="['icon', { isDisabled: category.isDefault }]"
                @click="() => deleteCategory(category)"
              />
              <font-awesome-icon
                icon="edit"
                class="icon"
                @click="() => editCategory(category)"
              />
              <div class="flexcolumn">
                <font-awesome-icon
                  icon="arrow-up"
                  class="icon mb-9"
                  @click="() => moveCategoryUp(category)"
                />
                <font-awesome-icon
                  icon="arrow-down"
                  class="icon"
                  @click="() => moveCategoryDown(category)"
                />
              </div>
            </span>
          </div>
          <div class="buttonWrapper">
            <button class="p-18" @click="openAddReserveCategoryModal">
              Add New Reserve Category
            </button>
          </div>
        </div>
      </div>
      <div class="navButtons">
        <router-link to="/unit-definition" class="navButton">Back</router-link>
        <h3 class="tableFooter">
          Project Reserve | Allocation of
          <span class="allocationText">{{ allocationText }}</span> units
        </h3>
        <div class="nextBtnWrapper">
          <button
            :class="['navButton', { isDisabled: !!errorMessage }]"
            @click="postConfig"
          >
            Next
          </button>
          <span v-if="errorMessage" class="errMessage col-error">{{
            errorMessage
          }}</span>
        </div>
      </div>
    </div>
  </ConfigLayout>
</template>

<script>
import EditReserveCategoryModal from '../components/EditReserveCategoryModal.vue'
import ViewPriorityOrderModal from '../components/ViewPriorityOrderModal.vue'
import ConfigLayout from '../layouts/configuration-screen.vue'
import { deepClone } from '../plugins/helpers'

export default {
  middleware: 'has-category',
  components: {
    EditReserveCategoryModal,
    ViewPriorityOrderModal,
    ConfigLayout,
  },
  data() {
    return {
      editReserveCategoryModalOpen: false,
      editReserveCategoryModalMode: '',
      categoryToEdit: null,
      viewPriorityOrderModalOpen: false,
      reserveCategoryToView: null,
    }
  },
  computed: {
    totalSupply() {
      return this.$store.state.currentConfig.supply
    },
    allocationText() {
      return `${this.$store.state.currentConfig.supply} ${this.$store.state.currentConfig.unitType}`
    },
    reserveCategories() {
      return this.$store.state.currentConfig.reserveCategories
    },
    supplySum() {
      return this.$store.state.supplySum
    },
    availableSupply() {
      return parseInt(this.$store.state.currentConfig.supply)
    },
    errorMessage() {
      if (this.supplySum < this.availableSupply) {
        return `Please allocate the remaining ${
          this.availableSupply - this.supplySum
        } units.`
      } else if (this.supplySum > this.availableSupply) {
        return `You have allocated ${
          this.supplySum - this.availableSupply
        } too many available units.`
      } else {
        return null
      }
    },
  },
  beforeMount() {
    if (!this.$store.state.currentConfig.reserveCategories.length) {
      this.$router.push('/reserve-instances')
    }
  },
  mounted() {
    this.$store.commit('updateSupplySum')
  },
  methods: {
    openAddReserveCategoryModal() {
      this.editReserveCategoryModalMode = 'add'
      this.editReserveCategoryModalOpen = true
    },
    closeEditReserveCategoryModal() {
      this.editReserveCategoryModalOpen = false
      this.categoryToEdit = null
    },
    closeViewPriorityOrderModal() {
      this.viewPriorityOrderModalOpen = false
      this.reserveCategoryToView = null
    },
    viewPriorityOrder(category) {
      this.reserveCategoryToView = category
      this.$nextTick(() => {
        this.viewPriorityOrderModalOpen = true
      })
    },
    editCategory(category) {
      this.editReserveCategoryModalMode = 'edit'
      this.categoryToEdit = deepClone(category)
      this.$nextTick(() => {
        this.editReserveCategoryModalOpen = true
      })
    },
    moveCategoryUp(category) {
      this.$store.commit('moveCategory', { category, direction: 'up' })
    },
    moveCategoryDown(category) {
      this.$store.commit('moveCategory', { category, direction: 'down' })
    },
    deleteCategory(category) {
      if (!category.isDefault) {
        this.$store.dispatch('deleteCategory', category)
      }
    },
    async postConfig() {
      if (!this.errorMessage) {
        try {
          await this.$store.dispatch('postConfig')
          this.$router.push('/finish')
        } catch (e) {}
      }
    },
    calcSupplyPercent(size) {
      const percent = (size / this.totalSupply) * 100
      return percent % 1 > 0.5
        ? `${Math.ceil(percent)}%`
        : `${Math.floor(percent)}%`
    },
  },
}
</script>

<style scoped lang="stylus">
.reserveContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  position: relative;
}
.reserveTableContainer {
  width: 100%;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
}
.reserveTableLabels {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 1fr;
  grid-gap: 18px;
  padding: 18px;
  border-bottom: 2px solid var(--dark-blue);
  text-align: center;
}
.reserveTableRows {
  background: var(--light-grey);
  border-radius: 0 0 18px 18px;
}
.reserveTableRow {
  display: grid;
  padding: 18px;
  grid-template-columns: 1fr 1.5fr 1fr 1fr 1fr 1fr;
  grid-gap: 18px;
  border-radius: 18px;
  text-align: center;
}
.rowCell {
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: break-word;
}
.actionButtons {
  width: 75%;
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.buttonWrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 0;
}

.navButtons {
  margin-top: 18px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tableFooter {
  color: var(--dark-grey);
}
.allocationText {
  color: var(--dark-blue);
}
.icon {
  cursor: pointer;
  &.isDisabled {
    cursor: not-allowed;
    opacity: .25;
  }
}
.nextBtnWrapper {
  position: relative;
}
.errMessage {
  position: absolute;
  top: calc(100% + 9px);
  right: 0;
  width: max-content;
}
</style>
