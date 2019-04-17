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
        labels.push(this.days[(today - 1) % 7]);
        today++;
      }
      return labels;
    }
  },
  computed: {
    escordNeededData() {
      const patientData = this.$store.getters.allPatients;
      let day = moment()
        .endOf("d")
        .subtract(8, "d");
      const data = [[], []];
      for (let idx = 0; idx < 7; idx++) {
        day = day.add(1, "d");
        let count1 = 0;
        let count2 = 0;
        for (let patient of patientData) {
          let dt = moment(patient.date_of_admission).endOf("d");
          if (
            day.format("x") === dt.format("x") &&
            patient.escort_required === "R"
          ) {
            count1++;
          } else {
            count2++;
          }
        }
        data[0].push(count1);
        data[1].push(count2);
      }
      const labels = ["Required", "Not Required"];
      return {
        labels,
        data
      };
    }
  },
  mounted() {
    let finalData = this.escordNeededData;
    finalData = {
      labels: finalData.labels,
      data: [[7, 5, 4, 4, 13, 3, 14], [5, 6, 4, 6, 3, 2, 7]]
    };
    this.renderChart(
      {
        labels: this.getLabels(),
        datasets: [
          {
            type: "bar",
            label: finalData.labels[0],
            backgroundColor: "red",
            data: finalData.data[0]
          },
          {
            type: "bar",
            label: finalData.labels[1],
            backgroundColor: "#12c44c",
            data: finalData.data[1]
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