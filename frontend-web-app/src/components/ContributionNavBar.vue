<template>
  <div class="nav-tabs-wrapper">

    <ul class="nav nav-tabs nav-justified">
      <li class="" v-if="(verificationStatusCode === 'NONE')">
        <router-link to="/ico/verification">
          <i class="fa fa-id-card"></i> Verification
        </router-link>
      </li>
      <li class="verified" v-if="(verificationStatusCode === 'VERIFIED')">
        <router-link to="/ico/verification">
          <i class="fa fa-check"></i> Verification Completed
        </router-link>
      </li>
      <li class="in-progress" v-if="(verificationStatusCode === 'PROCESSING')">
        <router-link to="/ico/verification">
          <i class="fa fa-refresh"></i> Verification In Progress
        </router-link>
      </li>
      <li class="rejected" v-if="(verificationStatusCode === 'REJECTED')">
        <router-link to="/ico/verification">
          <i class="fa fa-exclamation-triangle"></i> Verification Rejected
        </router-link>
      </li>

      <li><router-link to="/ico/contribute">Contribute</router-link></li>
      <li><router-link to="/ico/faq">FAQ</router-link></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'ContributionNavBar',
  data() {
    return {};
  },
  computed: {
    verificationStatusCode: function () {
      return this.$store.state.user && this.$store.state.user.verificationStatusCode;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss" scoped>
  .nav.nav-tabs.nav-justified li a.active {
    color: white;
    background-color: black;
  }
</style>
