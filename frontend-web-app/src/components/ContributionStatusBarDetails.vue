<template>
  <div class="container" v-if="!serverCommunicationError">
    <div class="row">
      <div class="col-xs-12 col-md-8 contribution-eth-amounts">
        <div v-if="contributionCapActive || contributionCapInfinite || icoEnded" class="row">
          <div class="col-md-12">
            <p v-if="icoInProgress" class="contribution-section-header">Total Contribution</p>
            <p v-if="icoEnded" class="contribution-section-header">Already Contributed</p>
            <h4 class="contribution-eth-raised-amount">{{ethRaised}}/{{ethCap}} ETH Raised</h4>
          </div>
        </div>
        <div v-if="icoInProgress && (contributionCapActive || contributionCapInfinite)" class="row">
          <div class="col-md-12">
            <p class="contribution-section-header">Personal Contribution</p>
            <p class="contribution-section-header" v-if="contributionCapActive">{{contributionAmount}} / {{contributionLimit}} ETH</p>
            <p class="contribution-section-header" v-if="contributionCapInfinite">{{contributionAmount}} ETH</p>
          </div>
        </div>

        <!--<h5 class="contribution-eth-cap">{{ethCap}} ETH Total Cap</h5>-->
        <!--<router-link class="btn btn-outline-white" to="/ico/contribute">Contribute to the GBX ICO</router-link>-->
      </div>
      <!--<div class="col-md-8 contribution-countdowns">-->
        <!--<p class="contribution-section-header">Contribution Status - {{contributionCapEnd}}</p>-->
        <!--<contribution-countdown-timer :contribution-countdown="contributionCountdown"></contribution-countdown-timer>-->
        <!--<h5>{{nextStateVerb}} {{nextStateDate}}</h5>-->
      <!--</div>-->
      <div class="contribution-countdowns col-xs-12 col-md-4">
        <div class="row">
          <div class="column-1 col-xs-6">
            <p class="contribution-section-header">Starts</p>
            <h4>{{contributionStartDate}}</h4>
            <h4>{{contributionStartTime}} UTC
                <a href="https://www.worldtimebuddy.com/utc-to-gmt-converter" target="_blank"
                   v-tooltip.bottom="'UTC to GMT converter'">
                    <i class="fa fa-globe"></i>
                </a>
            </h4>
          </div>
          <div class="column-2 col-xs-6">
            <p class="contribution-section-header">Ends</p>
            <h4>{{contributionEndDate}}</h4>
            <h4>{{contributionEndTime}} UTC
                <a href="https://www.worldtimebuddy.com/utc-to-gmt-converter" target="_blank"
                   v-tooltip.bottom="'UTC to GMT converter'">
                    <i class="fa fa-globe"></i>
                </a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContributionCountdownTimer from './ContributionCountdownTimer.vue';
import moment from 'moment';

export default {
  components: {
    ContributionCountdownTimer,
  },
  name: 'ContributionStatusBarDetails',
  data() {
    return { };
  },
  computed: {
    icoInProgress: function () {
      return ['PRE_START', 'LIMBO1', 'LIMBO2', 'START', 'FULL_GAS'].indexOf(this.$store.state.icoContributionSettings.status.currentStatusName) !== -1;
    },
    icoEnded: function () {
      return this.$store.state.icoContributionSettings.status.currentStatusName === 'ENDED';
    },
    contributionCapActive: function () {
      return this.$store.state.icoContributionSettings.status.currentStatusName === 'START';
    },
    contributionCapInfinite: function () {
      return this.$store.state.icoContributionSettings.status.currentStatusName === 'FULL_GAS';
    },
    contributionLimit: function () {
      return this.$store.state.icoContributionSettings.contributionLimit ? this.$store.state.icoContributionSettings.contributionLimit : 0;
    },
    contributionAmount: function () {
      return this.$store.state.contribute.contributionAmount ? this.$store.state.contribute.contributionAmount : 0;
    },
    nextStateVerb: function () {
      if (this.$store.state.icoContributionSettings.status.currentStatusName === 'START') {
        return 'ICO contribution cap ends on';
      }

      if (this.$store.state.icoContributionSettings.status.currentStatusName === 'FULL_GAS') {
        return 'ICO ends on';
      }

      return 'ICO starts on';
    },
    nextStateDate: function () {
      if (this.$store.state.icoContributionSettings.status.currentStatusName === 'START' || this.$store.state.icoContributionSettings.status.currentStatusName === 'FULL_GAS') {
        return moment(this.$store.state.icoContributionSettings.nextStatusAt).format('dddd, MMMM Do YYYY, h:mm:ssA Z');
      }

      return moment(this.$store.state.icoContributionSettings.startDate).format('dddd, MMMM Do YYYY, h:mm:ssA Z');
    },
    timerCountdown: function () {
      if (this.$store.state.icoContributionSettings.status.currentStatusName === 'START' || this.$store.state.icoContributionSettings.status.currentStatusName === 'FULL_GAS') {
        return this.$store.state.icoContributionSettings.endDate;
      }

      return this.$store.state.icoContributionSettings.startDate;
    },
    ethRaised: function () {
      return this.$store.state.icoContributionSettings.totalRaised;
    },
    ethCap: function () {
      return this.$store.state.icoContributionSettings.contributionTotalCap;
    },
    contributionStartDate: function () {
      return moment.utc(this.$store.state.icoContributionSettings.startDate).utc().format('DD/MM/YYYY');
    },
    contributionStartTime: function () {
      var get_zone, zone_name, zone_abbr = '';
      if(get_zone = moment.tz)
        if(zone_name = get_zone.guess())
          zone_abbr = moment.tz(zone_name).zoneAbbr();

      return moment.utc(this.$store.state.icoContributionSettings.startDate).utc().format('H:mm:ss');
    },
    contributionEndDate: function () {
      return moment.utc(this.$store.state.icoContributionSettings.endDate).utc().format('DD/MM/YYYY');
    },
    contributionEndTime: function () {
      var get_zone, zone_name, zone_abbr = '';
      if(get_zone = moment.tz)
        if(zone_name = get_zone.guess())
          zone_abbr = moment.tz(zone_name).zoneAbbr();

      return moment.utc(this.$store.state.icoContributionSettings.endDate).utc().format('H:mm:ss');
    },
    contributionCountdown: function () {
      return this.$store.state.icoContributionSettings.nextStatusAt;
    },
    contributionCapEnd: function () {
      return moment(this.$store.state.icoContributionSettings.nextStatusAt).format('YYYY-MM-DD');
    },
    serverCommunicationError: function () {
      return this.$store.state.icoContributionSettings.serverCommunicationError;
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
