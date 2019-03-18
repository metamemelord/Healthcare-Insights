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
        <div class="login-form">
          <div
            class="form-control"
            :class="{'input-focussed': emailDirty && (emailFocussed || !isUsernameValid), 'input-invalid': emailDirty && !isUsernameValid}"
          >
            <label for="email" :class="{'label-focussed': emailLabel}">Username</label>
            <input
              type="text"
              name="email"
              id="email"
              @focus="setFocussed"
              @blur="removeFocussed"
              @keyup.enter="validateAndLogin"
              v-model="email"
              autocomplete="off"
            >
          </div>
          <div
            class="form-control"
            :class="{'input-focussed': passwordDirty && (passwordFocussed || !isPasswordValid), 'input-invalid': passwordDirty && !isPasswordValid}"
          >
            <label for="password" :class="{'label-focussed': passwordLabel}">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              @focus="setFocussed"
              @blur="removeFocussed"
              @keyup.enter="validateAndLogin"
              v-model="password"
              autocomplete="off"
            >
          </div>
          <div class="form-control">
            <button class="button" @click="validateAndLogin" :disabled="!isFormValid">
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
      email: "",
      password: "",
      emailDirty: false,
      passwordDirty: false,
      emailLabel: false,
      passwordLabel: false,
      emailFocussed: false,
      passwordFocussed: false,
      isSubmitted: false
    };
  },
  mounted() {
    let el = document.getElementById("email");
    el.focus();
  },
  computed: {
    submitButtonClass() {
      return this.isSubmitted
        ? "fa-circle-notch fa-spin"
        : "fa-chevron-circle-right";
    },
    isUsernameValid() {
      return this.email.length >= 5;
    },
    isPasswordValid() {
      return this.password.length > 0;
    },
    isFormValid() {
      return !this.isSubmitted && this.isUsernameValid && this.isPasswordValid;
    }
  },
  methods: {
    validateAndLogin: function() {
      if (this.isFormValid) {
        this.login();
      } else if (!this.isUsernameValid) {
        document.getElementById("email").focus();
      } else {
        document.getElementById("password").focus();
      }
    },
    setFocussed: function(event) {
      let el = event.target;
      this[el.id + "Dirty"] = true;
      this[el.id + "Focussed"] = true;
      this[el.id + "Label"] = true;
    },
    removeFocussed: function(event) {
      let el = event.target;
      if (this[el.id].length === 0) this[el.id + "Label"] = false;
      this[el.id + "Focussed"] = false;
    },
    login: function() {
      this.isSubmitted = true;
      let data = {
        username: this.username,
        password: this.password
      };
      axios
        .post("http://localhost:3000/login", {
          username: this.email,
          password: this.password
        })
        .then(result => {
          this.$store.dispatch("login", {
            username: this.email,
            isLoggedIn: true
          });
          this.$router.push("/");
        })
        .catch(err => {
          const statusCode = err.response.status;
          switch (statusCode) {
            case 404:
              this.errorMessage = "User does not exist";
              break;
            case 400:
              this.errorMessage = "Incorrect password";
              break;
            default:
              this.errorMessage = "Server messed up, it seems! :(";
              break;
          }
          this.isSubmitted = false;
        });
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
      margin-top: 7rem;
      max-height: 10rem;
    }
  }

  .login-form {
    margin: 2rem auto;
    width: 20rem;
    .form-control {
      position: relative;
      margin: 1.5rem 0.5rem;
      input,
      button {
        outline: none;
        color: white;
        background: none;
        border: none;
        border-bottom: 1px solid white;
        width: 100%;
        padding: 0.5rem;

        &:invalid {
          border: none;
          border-bottom: 1px solid red !important;
        }
        &::placeholder {
          color: white;
          opacity: 0.5;
        }

        &:-ms-input-placeholder {
          color: white;
          opacity: 0.5;
        }

        &::-ms-input-placeholder {
          color: white;
          opacity: 0.5;
        }
      }
      button {
        width: auto;
        border: none;
        margin-top: 1rem;
        font-size: 2rem;
        transition: all 1s;
      }

      label {
        opacity: 0.5;
        color: white;
        left: 0.5rem;
        top: 0.6rem;
        font-size: 0.8rem;
        position: absolute;
        transition: all 0.2s ease-in-out;
      }
      &:after {
        position: absolute;
        transition: all 0.4s ease-in-out;
        left: 0;
        bottom: 0;
        content: "";
        width: 100%;
        transform: scaleX(0);
        border-bottom: 2px solid #0096ee;
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

