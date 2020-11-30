import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const pageNames = [
  'index',
  'reserve-instances',
  'unit-definition',
  'specify-reserve',
  'finish',
  'load-data',
]

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: pageNames.map((page) => ({
      path: `/${page === 'index' ? '' : page}`,
      component: () => import(`./public/pages/${page}.vue`),
    })),
  })
}
