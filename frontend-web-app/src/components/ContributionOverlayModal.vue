<template>
  <modal name="contribution-overlay"
         :width="'500px'"
         :height="'480px'"
         :clickToClose="false"
         @before-open="beforeOpen">
    <div class="modal-body text-center">
      <p>Herein follow our terms and conditions, which you should definitely accept in order to contribute to the ICO.</p>
      <div class="terms-and-conditions" v-on:scroll="termsContainerScrolled" v-prevent-parent-scroll>
        <ul class="list-unstyled">
          <li>You must be 81 or over.</li>
          <li>You must not break the rules.</li>
          <li><a href="https://i.imgflip.com/1jjc9s.jpg" target="_blank">Like so.</a></li>
        </ul>
        <ul class="list-unstyled">
          <li>Laudate Dominum omnes gentes</li>
          <li>Laudate eum, omnes populi</li>
          <li>Quoniam confirmata est</li>
          <li>Super nos misericordia eius,</li>
          <li>Et veritas Domini manet in aeternum.</li>
        </ul>
        <ul class="list-unstyled">
          <li>Gloria Patri et Filio et Spiritui Sancto.</li>
          <li>Sicut erat in principio, et nunc, et semper.</li>
          <li>Et in saecula saeculorum.</li>
          <li>Amen.</li>
        </ul>
        <div v-observe-visibility="visibilityChanged"></div>
      </div>
      <br>
      <label @click="checkboxClicked" class="m-checkbox m-checkbox--bold"><input type="checkbox" :disabled="!termsFullyRead" v-model="termsAgreement"> <strong>I have read and agree to the terms and conditions outlined above</strong><span></span></label>
      <div class="clearfix"></div>
      <br>
      <button class="btn btn-warning" type="button" v-on:click="cancelClicked">Cancel <i class="fa fa-close"></i></button>
      <button class="btn btn-primary" type="button" v-bind:disabled="!termsAgreement" v-on:click="continueClicked">Continue <i class="fa fa-arrow-right"></i></button>
    </div>
  </modal>
</template>
<script>

  export default {
    name: 'ContributionOverlay',
    data() {
      return {
        termsAgreement: false,
        termsFullyRead: false,
      };
    },
    methods: {
      termsContainerScrolled(evt) {
        if (evt.srcElement.scrollHeight - (evt.srcElement.scrollTop + evt.srcElement.clientHeight) <= 10) {
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

        this.$store.dispatch('setTermsAccepted', { accepted: true });
        this.$modal.hide('contribution-overlay');
      },
      cancelClicked() {
        this.$store.dispatch('setTermsAccepted', { accepted: false });
        this.$router.push('/profile');
        this.$notify({
          type: 'warning',
          content: 'You must agree to the Terms and Conditions before being able to contribute in the GBX ICO',
        });
        this.$modal.hide('contribution-overlay');
      },
    },
  };
</script>

<style scoped>
  /* Style the modal so that it sits on top of the navbar */
  .vue--modal {
    z-index: 99999;
  }
  .v--modal-overlay {
    z-index: 999999;
  }

  .terms-and-conditions {
    max-height: 224px;
    overflow-y: scroll;
  }

  .terms-and-conditions::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  .terms-and-conditions::-webkit-scrollbar:vertical {
      width: 12px;
  }

  .terms-and-conditions::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, .5);
      border-radius: 10px;
      border: 2px solid #BA374A;
  }

  .terms-and-conditions::-webkit-scrollbar-track {
      border-radius: 10px;  
      background-color: #BA374A; 
  }
</style>
