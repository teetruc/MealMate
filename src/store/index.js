// import Vue from "vue";
// import Vuex from "vuex";

import { createApp } from 'vue';
import { createStore } from 'vuex';
import Results from "./results.js";


// Vue.use(Vuex);
// export default new Vuex.Store({
//   modules: {
//     Results
//   }
// });

const app = createApp();
app.use(createStore({
  modules: {
    Results
  }
}));

export default app;
