import Vue from "vue";
import store from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Config from "./views/ConfigForm.vue";
import Login from "./views/Login.vue";
import axios from "axios";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (
          localStorage.getItem("isLoggedIn") === "true" &&
          localStorage.getItem("username").length
        ) {
          if (!store.getters.configSet || store.state.configResetNeeded) {
            next("/config");
          } else {
            axios
              .get("http://localhost:3000/")
              .then(result => {
                return Promise.resolve(result.data);
              })
              .then(data => {
                store.dispatch("populatePatients", data);
                next();
              })
              .catch();
          }
        } else next("/login");
      }
    },
    {
      path: "/config",
      name: "config",
      component: Config,
      beforeEnter: (to, from, next) => {
        if (
          localStorage.getItem("isLoggedIn") === "true" &&
          localStorage.getItem("username").length
        ) {
          if (!store.getters.configSet) {
            axios
              .get(
                `http://localhost:3000/config?u=${localStorage.getItem(
                  "username"
                )}`
              )
              .then(result => {
                return Promise.resolve(result.data);
              })
              .then(data => {
                store.dispatch("setConfig", data);
                next("/");
              })
              .catch(err => {
                next();
              });
          } else {
            next();
          }
        } else next("/login");
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
