<template>
  <div id="page-recover-password" class="page">
    <section id="page-intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="login-box-wrapper">
              <div class="login-box">
                <header class="login-box-header">
                  <h2 class="text-center">Reset your password</h2>
                </header>
                <div class="login-box-body">
                  <form action="/login" class="form">
                    <div class="form-group">
                      <input type="email" name="email" id="email" class="form-control" placeholder="Email" v-model="email"
                             v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <recaptcha></recaptcha>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="form-control btn btn-primary" v-on:click.prevent="submitRecoveryForm()" v-bind:disabled="actionInProgress">Request password recovery</button>
                    </div>
                  </form>
                </div>
                <footer class="login-box-footer text-center">
                  <p>Remembered your password?</p>
                  <router-link to="/login">Log into your account here <i class="fa fa-arrow-right"></i></router-link>
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
    name: 'RecoverPassword',
    data() {
      return {
        email: null,
      };
    },
    computed: {
      actionInProgress() { return this.$store.state.globalActionInProgress; },
      gRecaptchaResponse() { return this.$store.state.userCaptcha; },
    },
    components: {
      Recaptcha,
    },
    methods: {
      submitRecoveryForm: function () {
        if (!this.email) {
          this.$notify({
            type: 'danger',
            content: 'E-mail address is required'
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

        this.$store.dispatch('getSession', {$http: this.$http})
          .then(() => {
            if (this.$store.state.isLoggedIn) {
              this.$router.push('/profile');
              return;
            }

            this.$store.dispatch('recoverPassword', {
              email: this.email,
              gRecaptchaResponse: this.gRecaptchaResponse,
              $http: this.$http,
              $notify: this.$notify,
            });
          });
      },
    },
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
