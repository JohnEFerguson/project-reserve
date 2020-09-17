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
      <button>About</button>
      <button>Paper</button>
      <button>Contact</button>
      <button>Press</button>
      <button>Start</button>
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
  border: 2px solid #44546a;
  border-radius: 18px;
}
.buttons {
  display: flex;

  width: 50%;
  & > button {
    cursor: pointer;
    margin-right: 18px;
    background: #44546a;
    color: white;
    border-radius: 18px;
    outline: none;
    font-size: 20px;
    border: 0;
    padding: 18px 27px;
    &:last-child {
      margin-left: auto;
      margin-right: none;
    }
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
