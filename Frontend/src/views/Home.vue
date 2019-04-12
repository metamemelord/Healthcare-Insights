<template>
  <div class="home">
    <app-header></app-header>
    <h1>{{ pageTitle }}</h1>
    <div class="graph-container">
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import appHeader from "@/components/Header";
import vaccinationComponent from "@/components/graphPages/vaccination.vue";
import babyRetention from "@/components/graphs/BabyRetention.vue";
import predictedBedAvailability from "@/components/graphs/BedAvailability.vue";
import patientClass from "@/components/graphs/PatientClass.vue";
import hospitalFacility from "@/components/graphs/HospitalFacility.vue";
import mostConsultedDoctor from "@/components/graphs/MostConsultedDoctor.vue";
import mostReferredDoctor from "@/components/graphs/MostReferredDoctor.vue";

export default {
  name: "home",
  data() {
    return {
      activeComponent: "vaccination-component",
      pageTitle: "Vaccination Details"
    };
  },
  created() {
    document.title = "Dashboard - Team Motherboard";
  },
  mounted() {
    let i = 1;
    const count = 7;
    setInterval(() => {
      i += 1;
      if (i % count === 0) {
        this.activeComponent = "vaccination-component";
        this.pageTitle = "Vaccination Details";
      } else if (i % count === 1) {
        this.activeComponent = "baby-retention";
        this.pageTitle = "Baby Retention Rate";
      } else if (i % count === 2) {
        this.activeComponent = "patient-class";
        this.pageTitle = "Patient Class Metrics";
      } else if (i % count === 3) {
        this.activeComponent = "hospital-facility";
        this.pageTitle = "Hospital Facility Metrics";
      } else if (i % count === 4) {
        this.activeComponent = "predicted-bed-availability";
        this.pageTitle = "Prediction of Bed Availability";
      } else if (i % count === 5) {
        this.activeComponent = "most-consulted-doctor";
        this.pageTitle = "Doctor Consultation Metrics";
      } else {
        this.activeComponent = "most-referred-doctor";
        this.pageTitle = "Doctor Referral Metrics";
      }
      i %= count;
      axios
        .get("http://localhost:3000/")
        .then(result => {
          return Promise.resolve(result.data);
        })
        .then(data => {
          this.$store.dispatch("populatePatients", data);
        })
        .catch();
    }, 8000);
  },
  components: {
    appHeader,
    vaccinationComponent,
    babyRetention,
    predictedBedAvailability,
    patientClass,
    hospitalFacility,
    mostConsultedDoctor,
    mostReferredDoctor
  }
};
</script>

<style lang="scss">
.graph-container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 95vw;
  height: calc(92vh - 8rem);
  align-items: center;
  justify-content: center;
  > canvas {
    max-height: 90vh;
  }
}
</style>

