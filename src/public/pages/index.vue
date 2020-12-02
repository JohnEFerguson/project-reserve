<template>
  <div class="container">
    <CopyModal
      v-if="copyToShow"
      :copy="copyToShow"
      :on-close="closeCopyModal"
    />
    <h1>Project Reserve</h1>
    <div class="description">
      <p>
        This application implements a reserve system as described in a 2020
        working paper authored by a team of market design researchers: Parag
        Pathak (MIT), Tayfun Sönmez (Boston College), Utku Ünver (Boston
        College), and Bumin Yenmez (Boston College). For more information on the
        working paper and the basics of a reserve system, please refer to the
        buttons below. To begin using the reserve system implementation, click
        the start button.
      </p>
    </div>
    <div class="buttons">
      <button class="menuButton navButton" @click="openCopyModal">About</button>
      <a
        class="menuButton navButton"
        href="https://arxiv.org/abs/2008.00374"
        target="__blank"
        >Paper</a
      >
      <router-link to="/reserve-instances" class="menuButton navButton"
        >Start</router-link
      >
    </div>
  </div>
</template>
<script>
import CopyModal from '../components/CopyModal.vue'
import { aboutCopy } from '../components/constants'
export default {
  components: { CopyModal },
  data() {
    return { copyToShow: null, showCopyModal: false }
  },
  methods: {
    openCopyModal() {
      this.copyToShow = aboutCopy
    },
    closeCopyModal() {
      this.copyToShow = null
    },
  },
}
</script>

<style scoped lang="stylus">
.container {
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.description {
  width: 50%;
  padding: 45px;
  font-size: 20px;
  line-height: 1.25;
  border: 2px solid var(--dark-blue);
  border-radius: 18px;
}
.buttons {
  display: flex;

  width: 50%;
  & > .menuButton {
    margin-right: 18px;
    &:last-child {
      margin-left: auto;
      margin-right: none;
    }
  }
}
</style>
