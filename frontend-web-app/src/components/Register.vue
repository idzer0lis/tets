<template>
  <registration-template>
        <form-wizard @on-complete="submitRegister" shape="circle" color="#20A1F2" error-color="#ff4949">
          <tab-content :before-change="validateFirstStep">
            <h1 class="is-uppercase has-text-weight-bold">Create Account</h1>
            <p><small>Account details</small></p>
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

            <b-field label="Confirm Password">
                <b-input type="password"
                    placeholder="Retype password"
                    autocomplete="off"
                    v-model="confirm_password"
                    :disabled="actionInProgress">
                </b-input>
            </b-field>

          </tab-content>
          <tab-content :before-change="validateSecondStep">
            <h1 class="is-uppercase has-text-weight-bold">Create Account</h1>
            <p><small>WealthE Token Address</small></p>
            <p>This is where you will receive your WealthE tokens. Please enter a valid Ethereum address.</p>
            <p>Please note that you cannot change this address after.</p>
            <p>Use MyEtherWallet.com or any ERC-20 compliant Ethereum wallets.</p>
            <b-field label="Ethereum Address">
              <b-input type="text"
                  placeholder="eg 0x8703273072382382973203"
                  v-model="etherium_address"
                  :disabled="actionInProgress"
                  maxlength="42">
              </b-input>
            </b-field>
          </tab-content>
          <tab-content>
            <h1 class="is-uppercase has-text-weight-bold">Create Account</h1>
            <p><small>Terms and Conditions</small></p>
            <registration-t-c-agreement />
            <recaptcha></recaptcha>
          </tab-content>

          <el-button type="primary" slot="prev">Back</el-button>
          <el-button type="primary" slot="next">Next</el-button>
          <el-button type="primary" slot="finish">Finish</el-button>
        </form-wizard>
    </registration-template>
</template>


<script>
  import RegistrationTemplate from './RegistrationTemplate.vue';
  import {FormWizard, TabContent} from 'vue-form-wizard';
  import Recaptcha from './Recaptcha.vue';
  import RegistrationTCAgreement from "./RegistrationTCAgreement";

  import 'vue-form-wizard/dist/vue-form-wizard.min.css';

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
        etherium_address: '',
        specialChars: "!@#$%^&*()_-+=[];:?,."
      };
    },
    computed: {
      actionInProgress() { return this.$store.state.globalActionInProgress; },
      // submitEnabled() { return this.terms_chinese && this.terms_afghan && this.terms_agreed && this.registrationTermsAccepted; },
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
      RegistrationTemplate,
      FormWizard,
      TabContent,
      RegistrationTCAgreement,
      Recaptcha,
    },
    mounted() {
      this.$store.dispatch('setRegistrationTermsAccepted', { accepted: false, });
    },
    methods: {
      checkForSpecialChars(string){
        for(let i = 0; i < this.specialChars.length;i++){
          if(string.indexOf(this.specialChars[i]) > -1){
            return true
          }
        }
        return false;
      },
      validateFirstStep() {
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

        if (!this.checkForSpecialChars(this.password)) {
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

        return true;
      },
      validateSecondStep() {
        if (!this.etherium_address) {
          this.$notify({
            type: 'danger',
            content: 'Please confirm Etherium Address'
          });
          return;
        }

        return this.$store.dispatch('checkEtheriumAddress', {
          etherium_address: this.etherium_address,
          $http: this.$http,
          $notify: this.$notify,
        }).then(() => {
          if (this.$store.state.etherium_address_check) {
            return true;
          }
        });

      },
      termsAgreedChanged() {
        this.$nextTick(() => {
          if (this.terms_agreed) {
            this.terms_agreed = false;
            this.$modal.show('registration-terms-and-conditions');
          }
        });
      },
      submitRegister: function () {

        if (!this.validateFirstStep()) return;

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
              etherium_address: this.etherium_address
            });
          });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
