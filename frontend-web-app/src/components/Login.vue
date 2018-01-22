<template>
  <div id="page-login" class="page">
    <section id="page-intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="login-box-wrapper">
              <div class="login-box">
                <router-link to="/register" class="extra-login-register-link btn btn-outline-white">
                  <span>Register a new account here</span>
                  <i class="fa fa-arrow-right"></i>
                </router-link>
                <header class="login-box-header">
                  <h2 class="text-center">Log into your account</h2>
                </header>
                <div class="alert alert-success alert-band text-center" v-for="message in flashMessages">
                  {{message}}
                </div>
                <div class="login-box-body">
                  <form action="/api/login" class="form" method="post">
                    <div class="form-group">
                      <input type="email" name="email" id="email" class="form-control" placeholder="Email" v-model="email" v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="password" id="password" class="form-control" placeholder="Password" v-model="password" v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <recaptcha></recaptcha>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="form-control btn btn-primary" v-on:click.prevent="submitLogin()" v-bind:disabled="actionInProgress"><i class="fa fa-circle-o fa-spin" v-if="actionInProgress"></i> Login</button>
                    </div>
                  </form>
                </div>
                <footer class="login-box-footer text-center">
                  <p>Forgot your password?</p>
                  <router-link to="/recover-password">Recover your password here <i class="fa fa-arrow-right"></i></router-link>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
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
