<template>
  <div class="container">
    <h1>Project Reserve</h1>
    <div class="description">
      <p>
        This application implements a reserve system as described in a 2020
        working paper authored by a team of market design researchers: Parag
        Pathak (MIT), Tayfun Sönmez (Boston College), Utku Ünver (Boston
        College), and Bumin Yenmez (Boston College). For more information on the
        working paper, the basics of a reserve system, and how to contact the
        authors, please refer to the buttons below. To begin using the reserve
        system implementation, click the start button.
      </p>
    </div>
    <div class="buttons">
      <button class="menuButton navButton">About</button>
      <button class="menuButton navButton">Paper</button>
      <button class="menuButton navButton">Contact</button>
      <button class="menuButton navButton">Press</button>
      <nuxt-link to="/create" class="menuButton navButton">Start</nuxt-link>
    </div>
  </div>
</template>
<script>
import socket from '~/plugins/socket.io.js'
export default {
  beforeMount() {
    socket.on('STATUS_UPDATE', (message) => {
      console.log(message)
    })
  },
}
</script>

<style scoped lang="scss">
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
