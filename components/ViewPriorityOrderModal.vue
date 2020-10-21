<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <h2 class="viewPriorityHeader">
        Priority Order of
        <span class="categoryName">{{ reserveCategory.name }}</span> reserve
        category
      </h2>
      <div class="modalBody">
        <h4 class="w100 fw-n tac" v-html="sortByLabel" />
        <div class="criteriaPanels mt-27">
          <div
            v-for="(criteria, criteriaIndex) in reserveCategory.priority"
            :key="`criteria-panel-${criteriaIndex}`"
            class="criteriaPanelWrapper w33 ml-9 mr-9"
          >
            <PriorityOrderPanel
              :criteria="criteria"
              :criteria-index="criteriaIndex"
              :is-read-only="true"
            />
          </div>
          <div
            v-if="reserveCategory.priority.length < 3"
            class="criteriaPanelWrapper w33 tac flexrowcenter ml-9 mr-9"
          >
            All remaining ties will be broken by a random lottery tiebreaker
          </div>
        </div>
      </div>
      <div class="modalButtons">
        <button class="navButton ml-a" @click="onClose">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reserveCategory: {
      type: Object,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    sortByLabel() {
      const sortOrders = this.reserveCategory.priority.map(
        (cat) => `by <strong>${cat.name}</strong>`
      )
      if (sortOrders.length < 3) {
        sortOrders.push('by <strong>random lottery tiebreaker</strong>')
      }
      return `Sort ${sortOrders.join(', ')}`
    },
  },
}
</script>

<style scoped lang="scss">
.modalWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
}
.modalInnerWrapper {
  height: 90%;
  width: 90%;
  border: 2px solid var(--dark-blue);
  background: white;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 27px;
}
.modalBody {
  flex: 1;
  width: 100%;
  //   display: grid;
  //   grid-template-columns: 1fr 1fr;
  //   grid-gap: 27px;
  padding: 45px;
  margin: 27px;
  background: var(--light-grey);
  border-radius: 18px;
}
.modalButtons {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
.textInput {
  cursor: pointer;
  resize: none;
  background-color: white;
  border: 2px solid var(--dark-grey);
  font-size: 20px;
  padding: 9px 18px;
  border-radius: 20px;
  outline: none;
  &::placeholder {
    color: #ddd;
  }
}
.textAreaInput {
  height: 200px;
}
.divider {
  height: 2px;
  border-radius: 18px;
  width: 100%;
  background-color: var(--dark-blue);
}
.criteriaPanels {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.criteriaPanelWrapper {
  padding: 18px;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
  max-height: 55vh;
  overflow: scroll;
}
.viewPriorityHeader {
  color: var(--dark-grey);
}
.categoryName {
  color: var(--dark-blue);
}
</style>
