<template>
  <div id="verification-alert">
    <div class="alert alert-warning" v-if="(userNone && submitFormVisible)">
      Verify your identity to be able to participate in the GBX Rock Token Sale
    </div>
    <div class="alert alert-danger" v-if="(userRejected)">
      <p>Your previously submitted verification data was rejected.</p>
      <p v-if="(userRejected && submitFormVisible)">Please try again!</p>
    </div>
    <div class="alert alert-info" v-if="userProcessing">
      Thank you for submitting the KYC documents, please allow up to 48 hours for your request to be verified.
    </div>
    <div v-if="(userVerified)">
      <div class="alert alert-success">Your verification is complete and you can now contribute to the GBX Rock Token Sale
      </div>
    </div>
    <div class="alert alert-warning" v-if="(!submitFormVisible && !formInputsReadOnly)">
      KYC submissions are closed during this stage of the Token Sale.
    </div>
  </div>
</template>
<script>

  export default {
    name: 'VerificationAlert',
    data() {
      return {};
    },
    computed: {
      verificationStatusCode() {
        return this.$store.state.user.verificationStatusCode;
      },
      userNone() {
        return this.verificationStatusCode === 'NONE';
      },
      userProcessing() {
        return this.verificationStatusCode === 'PROCESSING';
      },
      userVerified() {
        return this.verificationStatusCode === 'VERIFIED';
      },
      userRejected() {
        return this.verificationStatusCode === 'REJECTED';
      },
      submitFormVisible() {
//        return ['PRE_START', 'START', 'FULL_GAS'].indexOf(this.$store.state.icoContributionSettings.status.currentStatusName) !== -1;
        return true;
      },
      formInputsReadOnly() {
        return this.$store.state.globalActionInProgress ||
          this.$store.state.user.verificationStatusCode === 'PROCESSING' ||
          this.$store.state.user.verificationStatusCode === 'VERIFIED';
      },
      identityRejectReason() {
        return this.$store.state.user.kyc.identityRejectReason;
      },
    },
  };
</script>
