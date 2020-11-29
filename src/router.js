import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./public/pages/index.vue') },
      {
        path: '/reserve-instances',
        component: () => import('./public/pages/reserve-instances.vue'),
      },
      {
        path: '/unit-definition',
        component: () => import('./public/pages/unit-definition.vue'),
      },
      {
        path: '/specify-reserve',
        component: () => import('./public/pages/specify-reserve.vue'),
      },
      //   {
      //     path: "/finish",
      //     component: () => import("~/src/pages/finish.vue"),
      //   },
      //   {
      //     path: "/load-data",
      //     component: () => import("~/src/pages/load-data.vue"),
      //   },
    ],
  })
}
