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
import vaccinationComponent from "@/components/graphs/Vaccination.vue";
import someTemp from "@/components/graphs/someTemp.vue";
import pieChart from "@/components/graphs/PieChart.vue";

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
  mounted() {
    let i = 0;
    const count = 3;
    setInterval(() => {
      i += 1;
      if (i % count === 0) {
        this.activeComponent = "vaccination-component";
      } else if (i % count === 1) {
        this.activeComponent = "some-temp";
      } else {
        this.activeComponent = "pie-chart";
      }
    }, 10000);
  },
  components: {
    appHeader,
    vaccinationComponent,
    someTemp,
    pieChart
  }
};
</script>

<style lang="scss" scoped>
.graph-container {
  display: flex;
  margin: 0 auto;
  width: 95vw;
  height: calc(92vh);
  align-items: center;
  justify-content: center;
  canvas {
    max-width: 90%;
    max-height: 90%;
  }
}
</style>

