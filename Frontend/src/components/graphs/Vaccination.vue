<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Doughnut,
  data() {
    return {
      colors: []
    };
  },
  computed: {
    chartData() {
      const patientData = this.$store.getters.allPatients;
      const babyData = [0, 0, 0, 0, 0, 0];
      const now = moment().add(1, "m");
      const backgroundColor = [
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor(),
        this.getRandomColor()
      ];
      for (let patient of patientData) {
        let dt = moment(patient.dob);
        let diff = moment.duration(now.diff(dt)).asMonths();
        if (diff <= 6) {
          babyData[0]++;
        } else if (diff < 12) {
          babyData[1]++;
        } else if (diff < 24) {
          babyData[2]++;
        } else if (diff < 60) {
          babyData[3]++;
        } else if (diff < 120) {
          babyData[4]++;
        } else if (diff < 144) {
          babyData[5]++;
        } else {
          continue;
        }
      }
      return {
        labels: [
          "Below 6 months",
          "Below 1 year",
          "Below 2 years",
          "Below 5 years",
          "Below 10 years",
          "Below 12 years"
        ],
        datasets: [
          {
            backgroundColor,
            data: babyData
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    }
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
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData);
  }
};
</script>