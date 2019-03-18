import Vue from "vue";
//import store from "./store";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";

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
        )
          next();
        else next("/login");
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});
