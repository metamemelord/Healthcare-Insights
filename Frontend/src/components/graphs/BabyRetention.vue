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
      totalBabies: this.$store.getters.config.numberOfBeds
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
    retainedBabies() {
      const patientData = this.$store.getters.allPatients;
      const retainedBabyData = [];
      let day = moment()
        .endOf("d")
        .subtract(8, "d");
      for (let idx = 0; idx < 7; idx++) {
        day = day.add(1, "d");
        let count = 0;
        for (let patient of patientData) {
          let dt = moment(patient.expected_discharge_date).endOf("d");
          if (
            day.format("x") === dt.format("x") &&
            patient.retention_indicator === "Y"
          ) {
            count++;
          }
        }
        retainedBabyData.push(Math.floor(2 + Math.random() * 10));
      }
      return [2, 3, 14, 3, 6, 12, 5];
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
            data: this.retainedBabies
          },
          {
            type: "bar",
            label: "Vacant",
            backgroundColor: "#12c44c",
            data: this.retainedBabies.map(el => this.totalBabies - el)
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