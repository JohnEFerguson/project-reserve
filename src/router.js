import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      { path: "/", component: () => import("./pages/index.vue") },
      //   {
      //     path: "/reserve-instances",
      //     component: () => import("~/src/pages/reserve-instances.vue"),
      //   },
      //   {
      //     path: "/unit-definition",
      //     component: () => import("~/src/pages/unit-definition.vue"),
      //   },
      //   {
      //     path: "/specify-reserve",
      //     component: () => import("~/src/pages/specify-reserve.vue"),
      //   },
      //   {
      //     path: "/finish",
      //     component: () => import("~/src/pages/finish.vue"),
      //   },
      //   {
      //     path: "/load-data",
      //     component: () => import("~/src/pages/load-data.vue"),
      //   },
    ],
  });
}
