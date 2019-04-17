<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script>
import { Pie } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Pie,
  data() {
    return {
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
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
    },
    getLabels() {
      const labels = [];
      let today = moment().isoWeekday();
      for (let idx = 0; idx < 7; idx++) {
        labels.push(this.days[today % 7]);
        today++;
      }
      return labels;
    }
  },
  computed: {
    eriData() {
      const patientData = this.$store.getters.allPatients;
      let eriCount = 0;
      let normalCount = 0;
      for (let patient of patientData) {
        if (patient.employment_illness_indicator === "Y") {
          eriCount++;
        } else {
          normalCount++;
        }
      }
      return [eriCount, normalCount];
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: ["YES", "NO"],
        datasets: [
          {
            type: "pie",
            backgroundColor: [this.getRandomColor(), this.getRandomColor()],
            data: this.eriData
          }
        ]
      },
      {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>