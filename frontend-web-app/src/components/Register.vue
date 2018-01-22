<template>
  <div id="page-register" class="page">
    <registration-terms-and-conditions-modal></registration-terms-and-conditions-modal>
    <section id="page-intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="login-box-wrapper">
              <div class="login-box">
                <router-link to="/login" class="extra-login-register-link btn btn-outline-white">
                  <span>Log into your account </span>
                  <i class="fa fa-arrow-right"></i>
                </router-link>
                <header class="login-box-header">
                  <h2 class="text-center">Register new account</h2>
                </header>
                <div class="login-box-body">
                  <form action="/api/register" class="form" method="post">
                    <div class="form-group">
                      <input type="text" name="email" id="email"
                             class="form-control" :class="{ danger: emailError }"
                             @focus="emailError = false"
                             placeholder="Email"
                             v-model="email"
                             v-bind:disabled="actionInProgress"/>
                    </div>
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="password" id="password"
                             class="form-control" :class="{ danger: passError }"
                             @focus="passError = false"
                             placeholder="Password"
                             v-model="password"
                             v-bind:disabled="actionInProgress"/>
                    </div>
                    <p>Password must have at least 8 characters and must contain lower and upper case letters, numbers and at least one of the characters !@#$%^&*()_-+=[];:?,.</p>
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="confirm_password" id="confirm_password"
                             class="form-control" :class="{ danger: confPassError }"
                             @focus="confPassError = false"
                             placeholder="Confirm password"
                             v-model="confirm_password"
                             v-bind:disabled="actionInProgress"/>
                    </div>
                    <div class="form-group">
                      <recaptcha></recaptcha>
                    </div>
                    <div class="form-group">
                      <label for="terms_agreed">
                        <input @change="termsAgreedChanged" type="checkbox" name="terms_agreed" id="terms_agreed" v-model="terms_agreed" v-bind:disabled="actionInProgress">
                        I accept the Terms and Conditions
                      </label>
                    </div>
                    <div class="form-group">
                      <label for="terms_chinese">
                        <input type="checkbox" name="terms_chinese" id="terms_chinese" v-model="terms_chinese" v-bind:disabled="actionInProgress">
                        I am NOT a resident of the People's Republic of China or an entity formed under the laws of the People's Republic of China.
                      </label>
                    </div>
                    <div class="form-group">
                      <label for="terms_afghan">
                        <input type="checkbox" name="terms_afghan" id="terms_afghan" v-model="terms_afghan" v-bind:disabled="actionInProgress">
                        I herein certify that I am NOT a citizen of or resident of any of the following countries and/or territories: United States of America, Japan, South Korea, Afghanistan, Bosnia and Herzegovina, Central African Republic, Cuba, Democratic Republic of the Congo, Democratic People's Republic of Korea, Eritrea, Ethiopia, Guinea-Bissau, Iran, Iraq,  Libya, Lebanon, Somalia, South Sudan, Sudan, Syria, Uganda,  Vanuatu, Yemen.
                      </label>
                    </div>
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-block" v-on:click.prevent="submitRegister()" v-bind:disabled="actionInProgress || !submitEnabled">Register</button>
                    </div>
                  </form>
                </div>
                <footer class="login-box-footer text-center">
                  <p>Already have an account?</p>
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
  import RegistrationTermsAndConditionsModal from "./RegistrationTermsAndConditionsModal";

  export default {
    name: 'Register',
    data() {
      return {
        email: null,
        emailError: false,
        password: null,
        passError: false,
        confirm_password: null,
        confPassError: false,
        terms_agreed: false,
        terms_chinese: false,
        terms_afghan: false,
      };
    },
    computed: {
      actionInProgress() { return this.$store.state.globalActionInProgress; },
      submitEnabled() { return this.terms_chinese && this.terms_afghan && this.terms_agreed && this.registrationTermsAccepted; },
      gRecaptchaResponse() { return this.$store.state.userCaptcha; },
      registrationTermsAccepted() { return this.$store.state.registrationTermsAccepted; },
    },
    watch: {
      terms_agreed(newVal) {
        if (!newVal) {
          this.$nextTick(() => this.$store.dispatch('setRegistrationTermsAccepted', { accepted: false, }));
        }
      },
      registrationTermsAccepted(newVal) {
        this.$nextTick(() => this.terms_agreed = newVal);
      },
    },
    components: {
      RegistrationTermsAndConditionsModal,
      Recaptcha,
    },
    mounted() {
      this.$store.dispatch('setRegistrationTermsAccepted', { accepted: false, });
    },
    methods: {
      termsAgreedChanged() {
        this.$nextTick(() => {
          if (this.terms_agreed) {
            this.terms_agreed = false;
            this.$modal.show('registration-terms-and-conditions');
          }
        });
      },
      submitRegister: function () {
        if (!this.email) {
          this.emailError = true;
          this.$notify({
            type: 'danger',
            content: 'E-mail address is required'
          });
          return;
        }

        if (!this.password) {
          this.passError = true;
          this.$notify({
            type: 'danger',
            content: 'Password is required'
          });
          return;
        }

        if (this.password.length < 8) {
          this.passError = true;
          this.$notify({
            type: 'danger',
            content: 'Password must be at least 8 characters'
          });
          return;
        }

        if (!this.password.match(/[a-z]/)) {
          this.passError = true;
          this.$notify({
            type: 'danger',
            content: 'Password must contain at least one lowercase letter'
          });
          return;
        }

        if (!this.password.match(/[A-Z]/)) {
          this.passError = true;
          this.$notify({
            type: 'danger',
            content: 'Password must contain at least one uppercase letter'
          });
          return;
        }

        if (!this.password.match(/[0-9]/)) {
          this.passError = true;
          this.$notify({
            type: 'danger',
            content: 'Password must contain at least one number'
          });
          return;
        }

        var specialChars = "!@#$%^&*()_-+=[];:?,.";
        var checkForSpecialChars = function(string){
            for(var i = 0; i < specialChars.length;i++){
                if(string.indexOf(specialChars[i]) > -1){
                    return true
                }
            }
            return false;
        }
        if (!checkForSpecialChars(this.password)) {
          this.passError = true;
          this.$notify({
            type: 'danger',
            content: 'Password must contain at least one of the special characters: !@#$%^&*()_-+=[];:?,.'
          });
          return;
        }


        if (!this.confirm_password) {
          this.confPassError = true;
          this.$notify({
            type: 'danger',
            content: 'Please confirm password'
          });
          return;
        }

        if (this.password !== this.confirm_password) {
          this.passError = true;
          this.confPassError = true;
          this.$notify({
            type: 'danger',
            content: 'Passwords do not match'
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

        if (!this.registrationTermsAccepted) {
          this.$notify({
            type: 'danger',
            content: 'You must accept the Terms and Conditions'
          });
          return;
        }

        this.$store.dispatch('getSession', { $http: this.$http })
          .then(() => {
            if (this.$store.state.isLoggedIn) {
              this.$router.push('/profile');
              return;
            }

            this.$store.dispatch('register', {
              email: this.email,
              password: this.password,
              confirm_password: this.confirm_password,
              gRecaptchaResponse: this.gRecaptchaResponse,
              $http: this.$http,
              $router: this.$router,
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
