<template>
  <modal name="registration-terms-and-conditions"
         :width="'500px'"
         :height="'420px'"
         :clickToClose="false"
         @before-open="beforeOpen">
    <div class="modal-body text-center">
      <p>Here in follow our terms and conditions, which you should definitely accept in order to contribute to the Rock Token Sale.</p>
      <div class="terms-and-conditions" v-on:scroll="termsContainerScrolled" v-prevent-parent-scroll>
        <terms-and-conditions-content />
        <div v-observe-visibility="visibilityChanged"></div>
      </div>
      <br>
      <label @click="checkboxClicked" class="m-checkbox m-checkbox--bold"><input type="checkbox" :disabled="!termsFullyRead" v-model="termsAgreement"> <strong>I have read and agree to the terms and conditions outlined above</strong><span></span></label>
      <div class="clearfix"></div>
      <br>
      <button class="btn btn-warning" type="button" v-on:click="cancelClicked">Cancel <i class="fa fa-close"></i></button>
      <button class="btn btn-primary" type="button" v-bind:disabled="!termsAgreement" @click="continueClicked">Continue <i class="fa fa-arrow-right"></i></button>
    </div>
  </modal>
</template>
<script>
  import TermsAndConditionsContent from './TermsAndConditionsContent.vue';

  export default {
    name: 'RegistrationTermsAndConditionsModal',
    data() {
      return {
        termsAgreement: false,
        termsFullyRead: false,
      };
    },
    components: {
      TermsAndConditionsContent,
    },
    methods: {
      termsContainerScrolled(evt) {
        if (evt.target.scrollHeight - (evt.target.scrollTop + evt.target.clientHeight) <= 10) {
          this.termsFullyRead = true;
        }
      },
      checkboxClicked() {
        if (!this.termsFullyRead) {
          this.$notify({
            type: 'warning',
            content: 'You must read the entire Terms and Conditions before agreeing',
          });
        }
      },
      visibilityChanged(isVisible) {
        if (isVisible) {
          this.termsFullyRead = true;
        }
      },
      beforeOpen() {
        this.termsAgreement = false;
        this.termsFullyRead = false;
      },
      beforeClose(/* event */) {
        // We could stop the closing here
        // event.stop();
      },
      continueClicked() {
        if (!this.termsAgreement) {
          return;
        }

        this.$store.dispatch('setRegistrationTermsAccepted', { accepted: true });
        this.$modal.hide('registration-terms-and-conditions');
      },
      cancelClicked() {
        this.$store.dispatch('setRegistrationTermsAccepted', { accepted: false });
        this.$notify({
          type: 'warning',
          content: 'You must agree to the Terms and Conditions before being able to register',
        });
        this.$modal.hide('registration-terms-and-conditions');
      },
    },
  };
</script>

<style scoped>
  /* Style the modal so that it sits on top of the navbar */
  .vue--modal, .v--modal {
    z-index: 99999;
  }

  .terms-and-conditions {
    max-height: 224px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 5px;
    border: 1px solid #BA374A;
    border-radius: 4px;
  }
  .terms-and-conditions::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
    height: auto;
  }
  .terms-and-conditions::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  .terms-and-conditions::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color:#BA374A;
      -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
</style>
