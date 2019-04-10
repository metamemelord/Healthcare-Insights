<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script>
import { Doughnut } from "vue-chartjs";

// console.log(Bar)
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
  mounted() {
    for (let i = 0; i < 12; i++) {
      this.colors.push(this.getRandomColor());
    }
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
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#cc65fe",
            "#ffce56",
            ...this.colors
          ],
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ],
      options: {
        // responsive: true,
        // maintainAspectRatio: false
      }
    });
  }
};
</script>