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
      let splProgramCodes = new Map();
      for (let patient of patientData) {
        if (splProgramCodes.has(patient.special_program_code)) {
          splProgramCodes.set(
            patient.special_program_code,
            splProgramCodes.get(patient.special_program_code) + 1
          );
        } else {
          splProgramCodes.set(patient.special_program_code, 1);
        }
      }
      const labels = [];
      const data = [];
      const backgroundColor = [];
      for (let entry of splProgramCodes.keys()) {
        backgroundColor.push(this.getRandomColor());
        labels.push(entry);
        data.push(splProgramCodes.get(entry));
      }

      return {
        labels,
        datasets: [
          {
            backgroundColor,
            data
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
    this.renderChart(this.chartData);
  }
};
</script>