<template>
  <div class="home">
    <header>
      <div class="navbar">
        <img src="../assets/logo.png" alt="Philips">
        <div v-if="appMode == 'admin'">
          <nav>
            <ul>
              <li
                :class="{'active-tab':activeComponent === 'vaccination-component'}"
                @click="setActiveComp(0)"
              >Vaccination Details</li>
              <li
                :class="{'active-tab':activeComponent === 'baby-retention'}"
                @click="setActiveComp(1)"
              >Baby Retention Rate</li>
              <li
                :class="{'active-tab':activeComponent === 'patient-class'}"
                @click="setActiveComp(2)"
              >Patient Class Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'hospital-facility'}"
                @click="setActiveComp(3)"
              >Hospital Facility Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'predicted-bed-availability'}"
                @click="setActiveComp(4)"
              >Prediction of Bed Availability</li>
              <li
                :class="{'active-tab':activeComponent === 'most-consulted-doctor'}"
                @click="setActiveComp(5)"
              >Doctor Consultation Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'most-referred-doctor'}"
                @click="setActiveComp(6)"
              >Doctor Referral Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'escort-needed'}"
                @click="setActiveComp(7)"
              >Escort Needed</li>
              <li
                :class="{'active-tab':activeComponent === 'transport-provisioned'}"
                @click="setActiveComp(8)"
              >Transport Arrangement Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'employement-related-illness'}"
                @click="setActiveComp(9)"
              >Employment Related Illness Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'transport-mode'}"
                @click="setActiveComp(10)"
              >Transport Mode Metrics</li>
              <li
                :class="{'active-tab':activeComponent === 'special-program-code'}"
                @click="setActiveComp(11)"
              >Special Program Metrics</li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="controls">
        <i @click="resetConfig()" class="fas fa-undo"></i>&nbsp;&nbsp;
        <i @click="logout()" class="fas fa-sign-out-alt"></i>
      </div>
    </header>
    <h1>{{ pageTitle }}</h1>
    <div class="graph-container">
      <component :is="activeComponent"></component>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import vaccinationComponent from "@/components/graphPages/vaccination.vue";
import babyRetention from "@/components/graphs/BabyRetention.vue";
import predictedBedAvailability from "@/components/graphs/BedAvailability.vue";
import patientClass from "@/components/graphs/PatientClass.vue";
import hospitalFacility from "@/components/graphs/HospitalFacility.vue";
import mostConsultedDoctor from "@/components/graphs/MostConsultedDoctor.vue";
import mostReferredDoctor from "@/components/graphs/MostReferredDoctor.vue";
import transportProvisioned from "@/components/graphs/TransportProvisioned.vue";
import employementRelatedIllness from "@/components/graphs/EmploymentRelatedIllness.vue";
import specialProgramCode from "@/components/graphs/SpecialProgramCode.vue";
import transportMode from "@/components/graphs/TransportMode.vue";
import escortNeeded from "@/components/graphs/EscortNeeded.vue";

export default {
  name: "home",
  data() {
    return {
      activeComponent: "vaccination-component",
      pageTitle: "Vaccination Details",
      appMode: this.$store.getters.config.mode
        ? this.$store.getters.config.mode
        : "admin"
    };
  },
  created() {
    document.title = "Dashboard - Team Motherboard";
  },
  mounted() {
    this.appMode = this.$store.getters.config.mode
      ? this.$store.getters.config.mode
      : "admin";
    let i = 0;
    const count = 12;
    if (this.appMode === "team") {
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
        } else if (i % count === 6) {
          this.activeComponent = "most-referred-doctor";
          this.pageTitle = "Doctor Referral Metrics";
        } else if (i % count === 7) {
          this.activeComponent = "escort-needed";
          this.pageTitle = "Escort Requirement Metrics";
        } else if (i % count === 8) {
          this.activeComponent = "transport-provisioned";
          this.pageTitle = "Transport Arrangement Metrics";
        } else if (i % count === 9) {
          this.activeComponent = "employement-related-illness";
          this.pageTitle = "Employment Related Illness Metrics";
        } else if (i % count === 10) {
          this.activeComponent = "transport-mode";
          this.pageTitle = "Transport Mode Metrics";
        } else {
          this.activeComponent = "special-program-code";
          this.pageTitle = "Special Program Metrics";
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
      }, 2000);
    }
  },
  components: {
    vaccinationComponent,
    babyRetention,
    predictedBedAvailability,
    patientClass,
    hospitalFacility,
    mostConsultedDoctor,
    mostReferredDoctor,
    specialProgramCode,
    transportMode,
    employementRelatedIllness,
    transportProvisioned,
    escortNeeded
  },
  methods: {
    resetConfig() {
      this.$store.dispatch("resetConfig");
      this.$router.push("/config");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    setActiveComp(i) {
      let count = 12;
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
      } else if (i % count === 6) {
        this.activeComponent = "most-referred-doctor";
        this.pageTitle = "Doctor Referral Metrics";
      } else if (i % count === 7) {
        this.activeComponent = "escort-needed";
        this.pageTitle = "Escort Requirement Metrics";
      } else if (i % count === 8) {
        this.activeComponent = "transport-provisioned";
        this.pageTitle = "Transport Arrangement Metrics";
      } else if (i % count === 9) {
        this.activeComponent = "employement-related-illness";
        this.pageTitle = "Employment Related Illness Metrics";
      } else if (i % count === 10) {
        this.activeComponent = "transport-mode";
        this.pageTitle = "Transport Mode Metrics";
      } else {
        this.activeComponent = "special-program-code";
        this.pageTitle = "Special Program Metrics";
      }
      axios
        .get("http://localhost:3000/")
        .then(result => {
          return Promise.resolve(result.data);
        })
        .then(data => {
          this.$store.dispatch("populatePatients", data);
        })
        .catch();
    }
  }
};
</script>

<style lang="scss">
header {
  background: linear-gradient(
    to bottom right,
    #003655 0,
    #0066a1 50%,
    #0096ee 100%
  );
  box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.5);
  .navbar {
    width: 95vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    img {
      height: 4rem;
      padding: 0.5rem;
    }

    div {
      color: white;
      ul {
        height: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        li {
          border-radius: 4px;
          height: 100%;
          cursor: pointer;
          margin: 0 1rem;
          padding: 0.4rem;
        }
      }
    }
  }
  .controls {
    z-index: 100;
    color: white;
    font-size: 1.4rem;
    right: 1rem;
    top: 1.2rem;
    position: absolute;
    i {
      cursor: pointer;
    }
  }
}
.active-tab {
  background: white;
  color: #333;
}
.graph-container {
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 80vw;
  height: calc(92vh - 8rem);
  align-items: center;
  justify-content: center;
  > canvas {
    max-height: 90vh;
  }
}
</style>

