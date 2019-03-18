import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: ""
  },
  mutations: {
    PERFORM_LOGIN: (state, userData) => {
      state.isLoggedIn = true;
      state.username = userData.username;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("username", userData.username);
    },
    PERFORM_LOGOUT: state => {
      state.isLoggedIn = false;
      state.username = "";
      localStorage.clear();
    }
  },
  actions: {
    login: ({ commit }, userData) => {
      commit("PERFORM_LOGIN", userData);
    },
    logout: ({ commit }) => {
      commit("PERFORM_LOGOUT");
    }
  }
});
