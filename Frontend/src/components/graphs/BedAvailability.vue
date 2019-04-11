<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script>
import { Bar } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Bar,
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
      ],
      totalBeds: 30
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
        labels.push(this.days[today++ % 7]);
      }
      return labels;
    }
  },
  computed: {
    beds() {
      const patientData = this.$store.getters.allPatients;
      const bedData = [];
      let countToday = 20 || patientData.length; // Change this
      let day = moment().endOf("d");
      for (let idx = 0; idx < 7; idx++) {
        day = day.add(1, "d");
        let count = 0;
        for (let patient of patientData) {
          let dt = moment(patient.expected_discharge_date).endOf("d");
          if (day.format("x") === dt.format("x")) {
            count++;
          }
        }
        bedData.push(countToday - count);
        countToday -= count;
      }
      return bedData;
    }
  },
  mounted() {
    this.renderChart(
      {
        labels: this.getLabels(),
        datasets: [
          {
            type: "bar",
            label: "Occupied",
            backgroundColor: "red",
            data: this.beds
          },
          {
            type: "bar",
            label: "Vacant",
            backgroundColor: "#12c44c",
            data: this.beds.map(el => this.totalBeds - el)
          }
        ]
      },
      {
        scales: {
          yAxes: [
            {
              stacked: true
            }
          ],
          xAxes: [
            {
              stacked: true,
              categoryPercentage: 0.5,
              barPercentage: 1
            }
          ]
        },
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