<template>
  <div id="app">
    <transition name="slide-up" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import header from "./components/Header.vue";
export default {
  components: {
    appHeader: header
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.slide-up-leave-active {
  transform: translateY(-50vh);
  opacity: 0;
  transition: all 400ms ease-in-out;
}
</style>
