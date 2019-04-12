<template>
  <transition name="slide-up">
    <main>
      <template>
        <div class="error-banner" v-if="errorMessage.length">
          <span>{{ errorMessage }}</span>
        </div>
        <div class="logo">
          <img src="../assets/logo.png" alt="philips">
        </div>
        <div class="config-form">
          <div>
            <h4># of beds:</h4>
            <input type="number" placeholder="# of beds in hospital" v-model="config.numberOfBeds">
          </div>
          <div>
            <h4># of baby beds:</h4>
            <input
              type="number"
              placeholder="# of baby beds in hospital"
              v-model="config.numberOfBabyBeds"
            >
          </div>
          <h4 style="display:inline-block; margin: 1rem 0.5rem;">Departments' info</h4>
          <span @click="addOne('dept')">
            <i class="fa fa-plus"></i>
          </span>
          <div class="multi" v-for="(dept, idx) in config.departments" :key="'dept-'+idx">
            <input type="text" placeholder="Department name" v-model="dept.name">
            <input type="number" placeholder="Threshold" v-model="dept.threshold">
          </div>
          <h4 style="display:inline-block; margin: 1rem 0.5rem;">Doctors' Info</h4>
          <span @click="addOne('doc')">
            <i class="fa fa-plus"></i>
          </span>
          <div class="multi" v-for="(doc, idx) in config.doctors" :key="'doc-'+idx">
            <input type="text" placeholder="Doctor name" v-model="doc.name">
            <input type="number" placeholder="Threshold" v-model="doc.thresholds.attending">
            <input type="number" placeholder="Threshold" v-model="doc.thresholds.referring">
          </div>
          <div class="form-control">
            <button class="button" @click="validateAndSaveToDb()">
              <i class="fas" :class="submitButtonClass"></i>
            </button>
          </div>
        </div>
      </template>
    </main>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      errorMessage: "",
      isSubmitted: false,
      config: {
        numberOfBeds: 0,
        numberOfBabyBeds: 0,
        departments: [],
        doctors: []
      }
    };
  },
  created() {
    document.title = "Configure - Team Motherboard";
    axios
      .get(`http://localhost:3000/config?u=${localStorage.getItem("username")}`)
      .then(result => {
        return Promise.resolve(result.data);
      })
      .then(data => {
        this.config = data;
      })
      .catch(err => {});
  },
  methods: {
    addOne(action) {
      if (action === "dept") {
        this.config.departments.push({ name: "", threshold: 0 });
      } else if (action === "doc") {
        this.config.doctors.push({
          name: "",
          thresholds: { attending: 0, referring: 0 }
        });
      } else {
      }
    },
    validateAndSaveToDb() {
      if (
        this.config.numberOfBeds <= 0 ||
        this.config.numberOfBabyBeds <= 0 ||
        this.config.departments.length === 0 ||
        this.config.doctors.length === 0
      ) {
        this.errorMessage = "Empty/Zero fields are not allowed";
      } else {
        this.isSubmitted = true;
        axios
          .post("http://localhost:3000/config", {
            username: localStorage.getItem("username"),
            config: this.config
          })
          .then(result => {
            this.$store.dispatch("setConfig", this.config);
            this.$router.push("/");
          })
          .catch(err => {
            this.errorMessage = err.message;
          });
      }
    }
  },
  computed: {
    submitButtonClass() {
      return this.isSubmitted
        ? "fa-circle-notch fa-spin"
        : "fa-chevron-circle-right";
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
    to bottom right,
    #003655 0,
    #0066a1 50%,
    #0096ee 100%
  );

  .error-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    color: white;
    background: rgba(255, 0, 0, 0.6);
    padding: 0.6rem;
    span {
      padding: 1rem;
    }
  }

  .logo {
    img {
      margin-top: 3rem;
      margin-bottom: 2rem;
      max-height: 10rem;
    }
  }

  .config-form {
    width: 50rem;
    margin: auto;
    color: #fff !important;
    > div {
      display: flex;
      margin: 0.5rem 0;
      justify-content: center;
      input {
        color: white;
        background: transparent;
        border: none;
        border-bottom: white solid 1px;
      }
      input::placeholder {
        color: white;
      }
      button {
        align-self: center;
        flex-grow: 0;
        font-size: 2.5rem;
        color: white;
        background: transparent;
        border: none;
        outline: none;
      }
      * {
        flex-grow: 1;
      }
      h4 {
        margin: auto 1rem;
      }
      input[type="number"] {
        max-width: 30rem;
        flex-basis: 30rem;
      }
    }
    .multi {
      input[type="number"] {
        max-width: 5rem;
        margin: auto 0.5rem;
      }
    }
  }
}
.input-focussed {
  &:after {
    transform: scaleX(1) !important;
  }
}
.input-invalid {
  &:after {
    border-bottom: 2px solid red !important;
  }
}

.label-focussed {
  left: 0.5rem !important;
  top: -0.5rem !important;
  font-size: 0.6rem !important;
  opacity: 1 !important;
}

.rotate-this {
  animation: rotate 1s linear infinite;
}
</style>

