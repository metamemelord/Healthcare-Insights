<template>
  <div class="graph-wrapper">
    <div>
      <vaccination-graph/>
    </div>
    <div>
      <h1>Heheh ahs dele</h1>
    </div>
  </div>
</template>

<script>
import vaccinationGraph from "@/components/graphs/Vaccination.vue";

export default {
  components: {
    vaccinationGraph
  }
};
</script>

<style lang="scss" scoped>
.graph-wrapper {
  width: 100vw;
  height: 95%;
  display: flex;
  div {
    width: 50vw;
    padding: 2rem;
    align-self: center;
  }
}
</style>
