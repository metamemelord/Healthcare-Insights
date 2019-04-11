import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: "",
    patients: [],
    config: {},
    configSet: false,
    configResetNeeded: false
  },
  getters: {
    getLoggedInUsername: state => {
      return state.username;
    },
    allPatients: state => {
      return state.patients;
    },
    config: state => {
      return state.config;
    },
    configSet: state => {
      return state.configSet;
    }
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
    },
    POPULATE_PATIENTS: (state, patients) => {
      state.patients = patients;
    },
    SET_CONFIG: (state, config) => {
      state.config = config;
      state.configSet = true;
      state.configResetNeeded = false;
    },
    RESET_CONFIG: state => {
      state.configResetNeeded = true;
    }
  },
  actions: {
    login: ({ commit }, userData) => {
      commit("PERFORM_LOGIN", userData);
    },
    logout: ({ commit }) => {
      commit("PERFORM_LOGOUT");
    },
    populatePatients: ({ commit }, patients) => {
      commit("POPULATE_PATIENTS", patients);
    },
    setConfig: ({ commit }, config) => {
      commit("SET_CONFIG", config);
    },
    resetConfig: ({ commit }, config) => {
      commit("RESET_CONFIG");
    }
  }
});
