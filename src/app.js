import Vue from "vue";
import { sync } from "vuex-router-sync";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faArrowUp,
  faArrowDown,
  faEdit,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrash, faArrowUp, faArrowDown, faEdit, faInfoCircle);

import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
  const router = createRouter();
  const store = createStore();
  sync(store, router);
  Vue.component("font-awesome-icon", FontAwesomeIcon);

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });
  return { app, router, store };
}
