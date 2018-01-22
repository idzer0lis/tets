<template>
  <div id="contribution-status-bar">
    <!-- <div id="contribution-status-bar-progress-cover" ref="contributionProgressBar" :style="progressBarPercentage"></div> -->
    <contribution-status-bar-details v-if="!serverCommunicationError"></contribution-status-bar-details>
    <communication-error-status-bar v-if="serverCommunicationError"></communication-error-status-bar>
  </div>
</template>

<script>
import ContributionCountdownTimer from './ContributionCountdownTimer.vue';
import ContributionStatusBarDetails from './ContributionStatusBarDetails.vue';
import CommunicationErrorStatusBar from './CommunicationErrorStatusBar.vue';
import moment from 'moment';
import BigNumber from 'bignumber.js';

export default {
  components: {
    ContributionCountdownTimer,
    ContributionStatusBarDetails,
    CommunicationErrorStatusBar,
  },
  name: 'ContributionStatusBar',
  data() {
    return { };
  },
  mounted() {
//    this.$refs.contributionProgressBar;
  },
  computed: {
    ethRaised: function () {
      return this.$store.state.icoContributionSettings.totalRaised;
    },
    ethCap: function () {
      return this.$store.state.icoContributionSettings.contributionTotalCap;
    },
    contributionCountdown: function () {
      return this.$store.state.icoContributionSettings.nextStatusAt;
    },
    contributionCapEnd: function () {
      return moment(this.$store.state.icoContributionSettings.nextStatusAt).format('YYYY-MM-DD');
    },
    contributionEndDate: function () {
      return moment(this.$store.state.icoContributionSettings.endDate).format('YYYY-MM-DD');
    },
    serverCommunicationError: function () {
      return this.$store.state.icoContributionSettings.serverCommunicationError;
    },
    progressBarPercentage: function () {
      const raisedPercentage = new BigNumber(this.$store.state.icoContributionSettings.totalRaised)
        .mul(100)
        .div(new BigNumber(this.$store.state.icoContributionSettings.contributionTotalCap || 1))
        .round(2);

      return {
        right: new BigNumber(100).minus(raisedPercentage).toFixed(2) + '%'
      };
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .server-error {
    color:white;
  }
</style>
