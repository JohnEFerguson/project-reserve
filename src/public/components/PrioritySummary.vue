<template>
  <div class="prioritySummaryWrapper">
    <h2 class="viewPriorityHeader">
      Priority Order of
      <span class="categoryName">{{ reserveCategory.name }}</span> reserve
      category
    </h2>
    <div class="summaryBody">
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
        <div class="criteriaPanelWrapper w33 tac flexrowcenter ml-9 mr-9">
          All remaining ties will be broken by a random lottery tiebreaker
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PriorityOrderPanel from './PriorityOrderPanel.vue'
export default {
  components: { PriorityOrderPanel },
  props: {
    reserveCategory: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sortByLabel() {
      const sortOrders = (this.reserveCategory.priority || []).map(
        (cat) => `by <strong>${cat.name}</strong>`
      )
      sortOrders.push('by <strong>random lottery tiebreaker</strong>')
      return `Sort ${(sortOrders || []).join(', ')}`
    },
  },
}
</script>
<style scoped lang="stylus">
.prioritySummaryWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: 1000;
}
.summaryBody {
  flex: 1;
  width: 100%;
  padding: 18px;
  margin: 18px;
  background: var(--light-grey);
  border-radius: 18px;
}

.criteriaPanels {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 9px;
}
.criteriaPanelWrapper {
  padding: 18px;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
  max-height: 55vh;
  overflow: scroll;
  width: 100%;
}
.viewPriorityHeader {
  color: var(--dark-grey);
}

.categoryName {
  color: var(--dark-blue);
}
</style>
