<template>
  <div class="modalWrapper">
    <div class="modalInnerWrapper">
      <h2 class="header mb-18">
        {{ action }}
      </h2>
      <div class="modalButtons">
        <button class="navButton" @click="() => onClose(false)">No</button>
        <button class="navButton ml-a" @click="() => onClose(true)">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    action: String,
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
  height: fit-content;
  width: fit-content;
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
.modalButtons {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}
</style>
