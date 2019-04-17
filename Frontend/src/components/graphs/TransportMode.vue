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
    transportModeData() {
      const patientData = this.$store.getters.allPatients;
      let day = moment()
        .endOf("d")
        .subtract(8, "d");
      let transportModeMap = new Map();
      const values = new Map();
      for (let idx = 0; idx < 7; idx++) {
        day = day.add(1, "d");
        transportModeMap = new Map();
        for (let patient of patientData) {
          let dt = moment(patient.date_of_admission).endOf("d");
          if (day.format("x") === dt.format("x")) {
            if (transportModeMap.has(patient.transport_mode)) {
              transportModeMap.set(
                patient.transport_mode,
                transportModeMap.get(patient.transport_mode) + 1
              );
            } else {
              transportModeMap.set(patient.transport_mode, 1);
            }
          }
        }
        for (let key of transportModeMap.keys()) {
          if (values.has(key)) {
            let updated = values.get(key);
            updated.push(transportModeMap.get(key));
            values.set(key, updated);
          } else {
            values.set(key, [
              transportModeMap.get(key) ? transportModeMap.get(key) : 0
            ]);
          }
        }
      }
      const data = [];
      const labels = [];
      for (let value of values.keys()) {
        labels.push(value);
        data.push(values.get(value));
      }
      return {
        labels,
        data
      };
    }
  },
  mounted() {
    let finalData = this.transportModeData;
    finalData = {
      labels: ["ABC", "DEF", "GHI", "JKL"],
      data: [
        [1, 2, 23, 4, 3, 3, 4],
        [4, 7, 4, 3, 6, 2, 4],
        [5, 2, 13, 4, 5, 13, 4],
        [2, 8, 3, 4, 9, 21, 4]
      ]
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
          },
          {
            type: "bar",
            label: finalData.labels[2],
            backgroundColor: "#563434",
            data: finalData.data[2]
          },
          {
            type: "bar",
            label: finalData.labels[3],
            backgroundColor: "#223454",
            data: finalData.data[3]
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