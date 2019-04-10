<template>
  <div class="home">
    <app-header></app-header>
    <div class="graph-container">
      <component :is="activeComponent" :chartdata="chartdata" :options="options"></component>
    </div>
  </div>
</template>

<script>
import appHeader from "@/components/Header";
import vaccinationComponent from "@/components/graphPages/vaccination.vue";
//2import vaccinationComponent from "@/components/graphs/Vaccination.vue";
import someTemp from "@/components/graphs/someTemp.vue";
import pieChart from "@/components/graphs/PieChart.vue";
import doughNut from "@/components/graphs/Doughnut.vue";

export default {
  name: "home",
  data() {
    return {
      activeComponent: "vaccination-component",
      chartdata: {
        datacollection: {
          labels: ["January", "February"],
          datasets: [
            {
              label: "Data One",
              backgroundColor: "#f87979",
              data: [40, 20]
            }
          ]
        }
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  created() {
    document.title = "Dashboard - Team Motherboard";
  },
  mounted() {
    let i = 0;
    const count = 4;
    setInterval(() => {
      i += 1;
      if (true) {
        this.activeComponent = "vaccination-component";
      } else if (i % count === 1) {
        this.activeComponent = "some-temp";
      } else if (i % count === 2) {
        this.activeComponent = "pie-chart";
      } else {
        this.activeComponent = "dough-nut";
      }
      i %= count;
    }, 10000);
  },
  components: {
    appHeader,
    vaccinationComponent,
    someTemp,
    pieChart,
    doughNut
  }
};
</script>

<style lang="scss" scoped>
.graph-container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 95vw;
  height: calc(92vh);
  align-items: center;
  justify-content: center;
}
</style>

