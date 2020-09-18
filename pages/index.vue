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
        system implementation, click the start buton.
      </p>
    </div>
    <div class="buttons">
      <button class="menuButton">About</button>
      <button class="menuButton">Paper</button>
      <button class="menuButton">Contact</button>
      <button class="menuButton">Press</button>
      <nuxt-link to="/create" class="menuButton">Start</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  // async asyncData ({ $http }) {
  //   // const test = await $http.$get('/api/test')
  //   return {
  //     test: null
  //   }
  // }
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
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
    cursor: pointer;
    margin-right: 18px;
    background: var(--dark-blue);
    border: 2px solid var(--dark-blue);
    color: white;
    border-radius: 18px;
    outline: none;
    font-size: 20px;
    padding: 18px 27px;
    transition: 0.25s transform ease;
    text-decoration: none;
    &:last-child {
      margin-left: auto;
      margin-right: none;
    }
    &:hover {
      background: white;
      color: var(--dark-blue);
    }
  }
}
</style>
