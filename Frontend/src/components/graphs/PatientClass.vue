<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data() {
    return {
      colors: []
    };
  },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  },
  computed: {
    chartData() {
      const patientData = this.$store.getters.allPatients;
      const patientCount = [0, 0, 0, 0];
      const backgroundColor = [
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor()
      ];
      for (let patient of patientData) {
        if (patient.retention_indicator === "I") {
          patientCount[0]++;
        } else if (patient.retention_indicator === "O") {
          patientCount[1]++;
        } else if (patient.retention_indicator === "P") {
          patientCount[2]++;
        } else {
          patientCount[3]++;
        }
      }
      return {
        labels: ["In-patient", "Out-patient", "Emergency", "Pre-admit"],
        datasets: [
          {
            backgroundColor,
            data: [5, 10, 34, 54]
            // data: babyData
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    }
  },
  mounted() {
    for (let i = 0; i < 12; i++) {
      this.colors.push(this.getRandomColor());
    }
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData);
  }
};
</script>