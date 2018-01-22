<template>
  <registration-template>
      <form action="/api/login" class="form" method="post">
        <b-field label="E-mail address">
            <b-input type="email"
                placeholder="me@example.com"
                v-model="email" 
                :disabled="actionInProgress">
            </b-input>
        </b-field>

        <b-field label="Password">
            <b-input type="password" 
                placeholder="Your password"
                autocomplete="off"
                v-model="password" 
                :disabled="actionInProgress">
            </b-input>
        </b-field>

        <recaptcha></recaptcha>

        <button type="submit" class="button is-primary is-rounded"
            v-on:click.prevent="submitLogin()" 
            v-bind:disabled="actionInProgress">
              LOGIN
          </button>
      </form>
  </registration-template>
</template>

<script>
  import RegistrationTemplate from './RegistrationTemplate.vue';
  import Recaptcha from './Recaptcha.vue';
  export default {
    name: 'Login',
    data() {
      return {
        email: null,
        password: null,
        flashMessages: null,
      };
    },
    computed: {
      actionInProgress: function () { return this.$store.state.globalActionInProgress; },
      gRecaptchaResponse() { return this.$store.state.userCaptcha; },
    },
    components: {
      RegistrationTemplate,
      Recaptcha,
    },
    mounted: function () {
      this.clearFlashMessages();
    },
    methods: {
      clearFlashMessages: function() {
        this.flashMessages = this.$store.state.flashMessages ? this.$store.state.flashMessages : null;
        this.$store.commit('SET_FLASH_MESSAGES', null)
      },
      submitLogin: function () {
        if (!this.email) {
          this.$notify({
            type: 'danger',
            content: 'E-mail address is required'
          });
          return;
        }

        if (!this.password) {
          this.$notify({
            type: 'danger',
            content: 'Password is required'
          });
          return;
        }

        if (!this.gRecaptchaResponse) {
          this.$notify({
            type: 'danger',
            content: 'CAPTCHA is required'
          });
          return;
        }

        this.$store.dispatch('getSession', { $http: this.$http })
          .then(() => {
            if (this.$store.state.isLoggedIn) {
              this.$router.push('/profile');
              return;
            }

            this.$store.dispatch('logIn', {
              email: this.email,
              password: this.password,
              gRecaptchaResponse: this.gRecaptchaResponse,
              $http: this.$http,
              $router: this.$router,
              $notify: this.$notify,
              redirect: this.$route.query.redirect || null,
            });
          });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
