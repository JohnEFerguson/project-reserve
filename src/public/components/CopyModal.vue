<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <h2 v-if="copy.title" class="header">
        {{ copy.title }}
      </h2>
      <div class="modalBody">
        <p v-if="copy.definition" class="mb-18">
          <strong>Definition: </strong>
          <span v-html="copy.definition" />
        </p>
        <div v-if="copy.faqs">
          <h4 class="mb-18 fs-20">Frequently Asked Questions (FAQs)</h4>
          <div v-for="q in copy.faqs" :key="q.question" class="mb-18">
            <h6 class="fs-16 mb-9">{{ q.question }}</h6>
            <p>{{ q.answer }}</p>
          </div>
        </div>
        <div class="tal" v-if="copy.paragraph" v-html="copy.paragraph" />
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
    copy: Object,
    onClose: Function,
  },
}
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
  z-index: 100000;
}
.modalInnerWrapper {
  height: calc(100% - 18px);
  width: 95%;
  border: 2px solid var(--dark-blue);
  background: white;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 27px;
}
.header {
  color: var(--dark-blue);
}
.modalBody {
    flex: 1;
    overflow: auto;
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
</style>
