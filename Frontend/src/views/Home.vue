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
      pageTitle: "Vaccination"
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
        this.pageTitle = "Vaccination";
      } else if (i % count === 1) {
        this.activeComponent = "baby-retention";
        this.pageTitle = "Babies retained (change this to provide clarity)";
      } else if (i % count === 2) {
        this.activeComponent = "patient-class";
        this.pageTitle = "Patient Class";
      } else if (i % count === 3) {
        this.activeComponent = "predicted-bed-availability";
        this.pageTitle = "Predicted Bed Availability";
      } else if (i % count === 4) {
        this.activeComponent = "most-consulted-doctor";
        this.pageTitle = "Most consulted doctor";
      } else if (i % count === 5) {
        this.activeComponent = "most-referred-doctor";
        this.pageTitle = "Most referred doctor";
      } else {
        this.activeComponent = "hospital-facility";
        this.pageTitle = "Hospital Facilities";
      }
      i %= count;
    }, 2000);
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

<style lang="scss" scoped>
.graph-container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 95vw;
  height: calc(92vh - 8rem);
  align-items: center;
  justify-content: center;
}
</style>

