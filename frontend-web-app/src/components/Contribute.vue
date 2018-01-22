<template>
  <div id="page-contribute" class="page">
    <contribution-overlay/>
    <contribution-status-bar></contribution-status-bar>
    <main class="page-content">
      <div class="container">
        <div class="row">
          <header class="header-w-counter col-xs-12">
            <h2 class="page-title">Contribute</h2>
            <contribute-horizontal-timer v-if="icoStarted" :contribution-countdown="contributionEndDate"></contribute-horizontal-timer>
          </header>
          <div class="col-xs-12 col-sm-9">
            <div class="well text-center">
              <div class="tab-text">
                <contribute-alert></contribute-alert>
                <div class="content" v-if="userNone">
                  <br>
                  <!-- <img src="../assets/img/icons/icon-identity.svg" class="contribute-icon-lg" alt="Icon"> -->
                  <br><br>
                  <p class="lead">You need to verify your identity to be able to contribute to GBX Rock Token Sale</p>
                  <br>
                  <router-link to="/ico/verification" class="btn btn-primary btn-lg">Verify identity now</router-link>
                  <br><br>
                </div>
                <div v-if="termsAccepted">
                  <div class="form-group text-left">
                    <label for="contribution_address">Contribution Address</label>
                    <div class="input-group">
                      <input type="text" name="contribution_address" id="contribution_address" class="form-control" v-model="contributionContractAddressDisplay" readonly>
                      <div class="input-group-btn">
                        <button class="btn btn-primary" type="button" v-bind:disabled="!contributionContractAddress" v-clipboard:copy="contributionContractAddressDisplay" v-clipboard:success="contributionContractAddressDisplayCopied" v-clipboard:error="contributionContractAddressDisplayCopyFailed"><i class="fa fa-copy"></i></button>
                        <a v-if="contributionContractAddress" v-bind:href="etherscanAddress" class="btn btn-info btn-black" type="button" target="_blank"><i class="fa fa-external-link-square"></i></a>
                        <button class="btn btn-info btn-black" type="button" disabled v-else><i class="fa fa-external-link-square"></i></button>
                      </div>
                    </div>
                  </div>
                  <br>
                  <div class="contribution_details">
                    <div v-if="termsAccepted">
                      <p v-if="contributionContractAddress"><strong>You have received</strong></p>
                      <div v-if="contributionContractAddress" class="entitled-tokens-amount">{{entitledTokensAmount}} RKT</div>
                      <br>
                    </div>
                    <div v-if="contribution_source_address">
                      <p class="important-note">Only send funds from the address you registered with, listed below:</p>
                      <p class="contribution-registered-address important-note">{{contribution_source_address | eip55}}</p>
                      <!--<p class="footer-note">Send a transaction with a minimum of 100,000 GAS</p>-->
                    </div>
                    <br>
                    <div class="alert alert-warning" v-if="contributionCapActive">The current maximum contribution per user is {{contributionLimit}} ETH.</div>
                    <div class="alert alert-info" v-if="contributionCapInactive">There is no contribution cap; you can contribute any ETH amount</div>
                    <br>
                    <p class="details-title"><strong>DO NOT PARTICIPATE IN THE TOKEN SALE DIRECTLY FROM ANY CRYPTOCURRENCY EXCHANGE <br><br>YOU NEED AN ETHEREUM ERC-20 COMPATIBLE WALLET</strong></p>
                    <br>
                    <p class="text-justify">Do not use the following wallets to participate any token sale, you will NOT receive your RKT Tokens if you use any of these exchange wallets: Any Bitcoin exchange, Any Ethereum exchange, Jaxx, Exodus, Coinbase, Poloniex, Kraken, Bitstamp, Bitfinex, Bitrexx, Cex.io, Coinomi.
                    <br><br>First, move your ETH to a compatible wallet. For the list of compatible wallets examples, please see below: MyEtherWallet (no download needed), MetaMask (Firefox and Chrome browser add-on), Mist (Desktop), Parity (Desktop), Parity + Ledger (Hardware wallet), imToken (iPhone/Android)
                    <br><br>Please contact <a href="mailto:RKT@gbx.gi">RKT@gbx.gi</a> if you have updates to the token compatible wallet list.</p>
                    <br>
                  </div>
                  <div class="alert alert-info" v-if="icoStarted" >1 ETH = {{ethExchangeRate}} RKT</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-3">
            <profile-status v-if="displayStatus"></profile-status>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import ContributionStatusBar from '@/components/ContributionStatusBar';
  import ContributionNavBar from '@/components/ContributionNavBar';
  import ContributionOverlay from '@/components/ContributionOverlayModal.vue';
  import ContributeAlert from '@/components/ContributeAlert';
  import ProfileStatus from '@/components/ProfileStatus.vue';

  import moment from 'moment';
  import {utils} from 'web3';
  import ContributeHorizontalTimer from "./ContributeHorizontalTimer.vue";

  export default {
    name: 'Contribute',
    data() {
      return {
        contribution_source_address: null,
      };
    },
    computed: {
      contributionEndDate: function () {
        return moment(this.$store.state.icoContributionSettings.endDate).toDate();
      },
      icoStarted: function () {
        return this.$store.state.icoContributionSettings.status.currentStatusName === 'START' || this.$store.state.icoContributionSettings.status.currentStatusName === 'FULL_GAS';
      },
      userNone: function () {
        return this.$store.state.user.verificationStatusCode === 'NONE';
      },
      termsAccepted: function () {
        return this.$store.state.user.kyc.termsAccepted;
      },
      displayStatus: function () {
        return ['PROCESSING', 'VERIFIED', 'REJECTED'].indexOf(this.$store.state.user.verificationStatusCode) !== -1;
      },
      bundlePayload: function () {
        return this.$store.state.user.kyc.bundlePayload;
      },
      contributionCap: function () {
        return this.$store.state.icoContributionSettings.contributionLimit;
      },
      contributionCapActive: function () {
        return this.$store.state.icoContributionSettings.status.currentStatusName === 'START';
      },
      contributionCapInactive: function () {
        return this.$store.state.icoContributionSettings.status.currentStatusName === 'FULL_GAS';
      },
      contributionContractAddress: function () {
        return this.$store.state.contribute.contributionContractAddress;
      },
      entitledTokensAmount: function () {
        return this.$store.state.contribute.entitledTokensAmount ? this.$store.state.contribute.entitledTokensAmount : 0;
      },
      etherscanAddress: function () {
        return 'https://etherscan.io/address/' + this.contributionContractAddress;
      },
      contributionContractAddressDisplay: function () {
        if (!this.contributionContractAddress) {
          return 'Will appear once available';
        }

        if (utils.isAddress(this.contributionContractAddress)) {
          return utils.toChecksumAddress(this.contributionContractAddress);
        }

        return this.contributionContractAddress;
      },
      ethExchangeRate: function () {
        return this.$store.state.contribute.ethExchangeRate;
      },
      contributionLimit: function () {
        return this.$store.state.icoContributionSettings.contributionLimit ? this.$store.state.icoContributionSettings.contributionLimit : 0;
      },
    },
    watch: {
      bundlePayload: function (newVal) {
        if (this.$store.state.user.verificationStatusCode === 'PROCESSING' || this.$store.state.user.verificationStatusCode === 'VERIFIED') {
          this.contribution_source_address = newVal.contribution_source_address;
        }

        if (this.$store.state.user.verificationStatusCode === 'VERIFIED') {
//          this.showOverlay();
        }
      },
    },
    mounted: function () {
      this.$store.dispatch('setTermsAccepted', { accepted: true });
//      this.$store.dispatch('setTermsAccepted', { accepted: false });
      this.$store.dispatch('getSession', {$http: this.$http, $notify: this.$notify });
      this.$store.dispatch('getKyc', {$http: this.$http});
      this.$store.dispatch('getContributeData', {$http: this.$http});
    },
    components: {
      ContributeHorizontalTimer,
      ContributionStatusBar,
      ContributionNavBar,
      ContributionOverlay,
      ContributeAlert,
      FaqAside,
      ProfileStatus,
    },
    methods: {
      contributionContractAddressDisplayCopied: function () {
        this.$notify({
          type: 'success',
          content: 'The contribution address was successfully copied to clipboard.',
        });
      },
      contributionContractAddressDisplayCopyFailed: function () {
        this.$notify({
          type: 'danger',
          content: 'Could not copy the address to clipboard. You will have to copy it manually.',
        });
      },
      showOverlay () {
        this.$modal.show('contribution-overlay');
      },
    },
    filters: {
      eip55: function (value) {
        if (!value) {
          return '';
        }
        value = value.toString();

        if (!utils.isAddress(value)) {
          return value;
        }

        return utils.toChecksumAddress(value);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
