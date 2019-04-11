<template>
  <header>
    <img src="../assets/logo.png" alt="Philips">
    <div>
      <i @click="resetConfig()" class="fas fa-undo"></i>&nbsp;&nbsp;
      <i @click="logout()" class="fas fa-sign-out-alt"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    resetConfig() {
      this.$store.dispatch("resetConfig");
      this.$router.push("/config");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
header {
  background: linear-gradient(
    to bottom right,
    #003655 0,
    #0066a1 50%,
    #0096ee 100%
  );
  box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.5);
  img {
    max-height: 3.5rem;
    padding: 0.5rem;
  }

  div {
    z-index: 100;
    color: white;
    font-size: 1.4rem;
    right: 1rem;
    top: 1.2rem;
    position: absolute;
    i {
      cursor: pointer;
    }
  }
}
</style>
