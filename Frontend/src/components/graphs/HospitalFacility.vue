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
      departments: [],
      DEPARTMENT_LABELS: {
        MED: "Medical Service",
        CAR: "Cardiac Service",
        URO: "Urology Service",
        SUR: "Surgical Service"
      }
    };
  },
  mounted() {
    this.departments = this.$store.getters.config.departments;
    const patientData = this.$store.getters.allPatients;
    const labels = new Map();
    for (let patient of patientData) {
      if (labels.has(patient.hospital_service)) {
        labels.set(
          patient.hospital_service,
          labels.get(patient.hospital_service) + 1
        );
      } else {
        labels.set(patient.hospital_service, 1);
      }
    }
    const data = Array.from(labels.values());
    const thresholdData = this.departments.map(el => el.threshold);
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
        labels: Array.from(labels.keys()).map(el => this.DEPARTMENT_LABELS[el]),
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