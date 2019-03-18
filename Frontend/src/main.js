import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueChart from "vue-chartjs";

Vue.config.productionTip = false;

Vue.use(vueChart);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
