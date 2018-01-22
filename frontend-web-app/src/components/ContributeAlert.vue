<template>
  <div id="contribute-alert">
    <div class="alert alert-danger" v-if="userRejected">
      <br>
      <p >Your profile was rejected</p>
      <br>
     <router-link to="/ico/verification"> <button type="button" class="btn btn-outline-white">Please review your information <i class="fa fa-arrow-right"></i></button></router-link>
     <br><br>
    </div>
    <div class="alert alert-info" v-if="userProcessing">
      Thank you for submitting the KYC documents, please allow up to 48 hours for your request to be verified.
    </div>
  </div>
</template>
<script>

  export default {
    name: 'ContributeAlert',
    data () {
      return {
        verificationStatusCode: this.$store.state.user.verificationStatusCode,
      }
    },
    computed: {
      userProcessing: function () {
        return this.verificationStatusCode === 'PROCESSING';
      },
      userRejected: function () {
        return this.verificationStatusCode === 'REJECTED';
      },
    }
  }
</script>
