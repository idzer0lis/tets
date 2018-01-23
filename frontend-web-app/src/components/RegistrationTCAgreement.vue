<template>
  <div>
    <div class="terms-and-conditions" v-on:scroll="termsContainerScrolled" v-prevent-parent-scroll>
      <terms-and-conditions-content />
    </div>
    <br>
    <label class="m-checkbox m-checkbox--bold"><input type="checkbox" @click="checkboxClicked" v-model="termsAgreement"> <strong>I have read and accept the Terms and Conditions</strong><span></span></label>
  </div>
</template>
<script>
  import TermsAndConditionsContent from './TermsAndConditionsContent.vue';

  export default {
    name: 'RegistrationTCAgreement',
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
      checkboxClicked(e) {
        if (!this.termsFullyRead) {
          e.preventDefault();
          this.$notify({
            type: 'warning',
            content: 'You must read the entire Terms and Conditions before agreeing',
          });
        } else {
          this.$store.dispatch('setRegistrationTermsAccepted', { accepted: !this.termsAgreement });
        }
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
