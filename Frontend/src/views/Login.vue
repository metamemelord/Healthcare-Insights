<template>
  <main>
    <div class="logo">
      <img src="../assets/logo.png" alt="philips">
    </div>
    <div class="login-form">
      <div class="form-control" :class="{'input-focussed': emailFocussed}">
        <label for="email" :class="{'label-focussed': emailLabel}">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          @focus="setFocussed"
          @blur="removeFocussed"
          v-model="email"
          autocomplete="off"
        >
      </div>
      <div class="form-control" :class="{'input-focussed': passwordFocussed}">
        <label for="password" :class="{'label-focussed': passwordLabel}">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          @focus="setFocussed"
          @blur="removeFocussed"
          v-model="password"
          autocomplete="off"
        >
      </div>
      <div class="form-control">
        <button type="submit" class="button" @click="isSubmitted=!isSubmitted">
          <i class="fas" :class="submitButtonClass"></i>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailLabel: false,
      passwordLabel: false,
      emailFocussed: false,
      passwordFocussed: false,
      isSubmitted: false
    };
  },
  computed: {
    submitButtonClass() {
      return this.isSubmitted
        ? "fa-circle-notch fa-spin"
        : "fa-chevron-circle-right";
    }
  },
  methods: {
    setFocussed: function(event) {
      let el = event.target;
      this[el.id + "Focussed"] = true;
      this[el.id + "Label"] = true;
    },
    removeFocussed: function(event) {
      let el = event.target;
      if (this[el.id].length === 0) this[el.id + "Label"] = false;
      this[el.id + "Focussed"] = false;
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

  .logo {
    img {
      margin-top: 5rem;
      max-height: 10rem;
    }
  }

  .login-form {
    margin: 2rem auto;
    width: 20rem;
    .form-control {
      position: relative;
      overflow-x: hidden !important;
      overflow-y: visible !important;
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
      input[type="password"] {
        font: small-caption;
        font-size: 1rem;
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
        height: 1px;
        position: absolute;
        transition: all 0.3s ease-in-out;
        left: -100%;
        bottom: 0;
        content: "";
        width: 100%;
        border-bottom: 1px solid turquoise;
      }
    }
  }
}

.input-focussed {
  &:after {
    transform: translateX(100%);
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

