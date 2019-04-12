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
      departments: []
    };
  },
  methods: {},
  computed: {},
  mounted() {
    const doctors = this.$store.getters.config.doctors;
    doctors.sort((a, b) => a.name < b.name);
    const patientData = this.$store.getters.allPatients;
    const labels = new Map();
    for (let patient of patientData) {
      if (labels.has(patient.referring_doctor_name)) {
        labels.set(
          patient.referring_doctor_name,
          labels.get(patient.referring_doctor_name) + 1
        );
      } else {
        labels.set(patient.referring_doctor_name, 1);
      }
    }
    const data = Array.from(labels.values());
    const thresholdData = [];
    for (let label of labels.keys()) {
      let doc = doctors.find(el => {
        return el.name.toLowerCase() == label.toLowerCase();
      });
      if (doc) thresholdData.push(doc.thresholds.referring);
    }
    const colors = [];
    for (let idx = 0; idx < data.length; idx++) {
      colors.push(
        data[idx] == thresholdData[idx]
          ? "yellow"
          : data[idx] < thresholdData[idx]
          ? "green"
          : "red"
      );
    }
    const datasets = [
      {
        type: "line",
        label: "Threshold",
        data: thresholdData
      },
      {
        type: "bar",
        backgroundColor: colors,
        label: "Fatigue",
        data
      },
      {
        backgroundColor: "yellow",
        label: "Meets Expectation"
      },
      {
        backgroundColor: "green",
        label: "Available"
      }
    ];
    this.renderChart(
      {
        labels: Array.from(labels.keys()),
        datasets
      },
      {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "# of patients"
              },
              stacked: true
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Facilities"
              },
              stacked: true,
              categoryPercentage: 0.5,
              barPercentage: 1
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>