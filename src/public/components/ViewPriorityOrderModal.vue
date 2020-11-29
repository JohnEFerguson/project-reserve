<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <PrioritySummary :reserve-category="reserveCategory" />
      <div class="modalButtons">
        <button class="navButton ml-a" @click="onClose">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import PrioritySummary from "./PrioritySummary.vue";
export default {
  components: { PrioritySummary },
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
};
</script>

<style scoped lang="stylus">
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
  z-index: 1000;
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
.modalButtons {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
</style>
