<template>
  <canvas ref="canvas" width="600" height="300"></canvas>
</template>

<script>
import { Bubble } from "vue-chartjs";
import moment from "moment";

export default {
  extends: Bubble,
  data() {
    return {
      departments: []
    };
  },
  methods: {},
  computed: {},
  mounted() {
    // this.departments = this.$store.getters.config.departments; // uncomment this to get from config
    // const patientData = this.$store.getters.allPatients; // uncomment this line
    const patientData = [
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" },
      { hospital_service: "ABC" },
      { hospital_service: "DEF" }
    ];
    this.departments = [
      { name: "ABC", threshold: 23 },
      { name: "DEF", threshold: 20 }
    ];
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
    const data = [];
    let idx = 0;
    for (let key of labels.keys()) {
      idx++;
      data.push({
        x: idx,
        y: Math.ceil(Math.random() * 20),
        r: labels.get(key)
      });
    }
    const datasets = [
      {
        type: "bubble",
        label: "Departments",
        // backgroundColor:
        //   labels.get(department.name) > department.threshold ? "red" : "green",
        backgroundColor: "red",
        data: data
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