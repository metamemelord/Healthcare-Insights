<template>
  <div class="graph-wrapper">
    <div style="display:flex;flex-direction:column;justify-content:space-evenly;height: 100%;">
      <h2>Children due for vaccination in {{getNextMonth}}</h2>
      <vaccination-graph/>
    </div>
    <div style="width:90%">
      <table>
        <tr>
          <td>Age groups</td>
          <td>Vaccination</td>
        </tr>
        <tr>
          <td>Below 6 Month</td>
          <td>BCG Vaccine, DPT</td>
        </tr>
        <tr>
          <td>Below 1 Year</td>
          <td>MMR, Hepatitis</td>
        </tr>
        <tr>
          <td>Below 2 Year</td>
          <td>Havrix, Twinrix</td>
        </tr>
        <tr>
          <td>Below 5 Year</td>
          <td>Cervarix, Polio</td>
        </tr>
        <tr>
          <td>Below 10 Year</td>
          <td>TT, Afluria</td>
        </tr>
        <tr>
          <td>Below 12 Year</td>
          <td>Vivotif, Zostavax</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import vaccinationGraph from "@/components/graphs/Vaccination.vue";
import moment from "moment";

export default {
  components: {
    vaccinationGraph
  },
  computed: {
    getNextMonth() {
      return moment()
        .add(1, "M")
        .format("MMMM");
    }
  }
};
</script>

<style lang="scss" scoped>
.graph-wrapper {
  width: 100vw;
  height: 95%;
  display: flex;
  div {
    flex-grow: 1;
    width: 50vw;
    padding: 2rem;
    margin: auto;
    flex-basis: 50%;
  }
  table {
    border: none;
    margin: auto;
    tr:first-of-type {
      background: linear-gradient(
        to bottom right,
        #003655 0,
        #0066a1 50%,
        #0096ee 100%
      );
      font-weight: 700;
      color: #fff;
    }
    td {
      padding: 1rem 2rem;
    }
  }
}
</style>
