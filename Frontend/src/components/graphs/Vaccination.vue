<template>
  <canvas ref="canvas" width="900" height="400"></canvas>
</template>

<script>
import { Bar, Pattern } from "vue-chartjs";

// console.log(Bar)
export default {
  extends: Bar,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56"],
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
};
</script>