<template>
  <div id="profile-status">
    <!-- <div class="well text-center">
      <div class="content" v-if="userNone">
        <img src="../assets/img/icons/icon-identity.svg" class="contribute-icon-lg" alt="Icon">
        <br>
        <p >You need to verify your identity</p>
        <router-link class="btn btn-outline-primary" to="/ico/verification">Verify Now</router-link>
      </div>
      <div class="content" v-else-if="userVerified">
        <img src="../assets/img/icons/icon-ok.svg" class="contribute-icon-lg" alt="Icon">
        <br>
        <p >Your profile is verified<br>You can contribute</p>
        <router-link class="btn btn-outline-primary" to="/ico/verification">View info</router-link>
      </div>
      <div class="content" v-else-if="userProcessing">
        <img src="../assets/img/icons/icon-refresh.svg" class="contribute-icon-lg" alt="Icon">
        <br>
        <p >Your profile is being processed</p>
        <router-link class="btn btn-outline-primary" to="/ico/verification">View info</router-link>
      </div>
      <div class="content" v-else-if="userRejected">
        <img src="../assets/img/icons/icon-close.svg" class="contribute-icon-lg" alt="Icon">
        <br>
        <p >Your profile was rejected</p>
        <router-link class="btn btn-outline-primary" to="/ico/verification">Review</router-link>
      </div>
    </div> -->
  </div>
</template>
<script>
  export default {
    name: 'ProfileStatus',
    data () {
      return { }
    },
    computed: {
      userNone: function () {
        return this.$store.state.user.verificationStatusCode === 'NONE';
      },
      userProcessing: function () {
        return this.$store.state.user.verificationStatusCode === 'PROCESSING';
      },
      userVerified: function () {
        return this.$store.state.user.verificationStatusCode === 'VERIFIED';
      },
      userRejected: function () {
        return this.$store.state.user.verificationStatusCode === 'REJECTED';
      },
    }
  }
</script>
