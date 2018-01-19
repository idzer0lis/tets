<template>
  <div id="page-profile" class="page">

    <contribution-status-bar></contribution-status-bar>

    <section class="section section-padding-sm">
      <div class="container">
        <header class="row">
          <div class="col-sm-8">
            <h2 class="page-title">Your Profile</h2>
          </div>
          <div class="col-sm-4 text-right">
            <router-link v-if="listingSectionsVisible" to="/favorites" class="section-header-extra-link"><i class="fa fa-star"></i> Favorites</router-link>
          </div>
        </header>

        <div class="row">
          <div class="col-xs-12 col-sm-9">
            <div class="well">
              <div class="row">
                <div class="col-sm-4 col-md-3">
                  <div class="profile-picture">
                    <!-- <img src="../assets/img/dummy/dummy-avatar.png" class="img-responsive" alt="Profile Picture"> -->
                  </div>
                  <!--<br>-->
                  <!--<button class="btn btn-outline-primary btn-sm center-block">Change Picture</button>-->
                </div>
                <div class="col-sm-8 col-md-9">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group m-form__group">
                        <label for="first_name">First Name</label>
                        <input type="text" class="form-control m-input" readonly id="first_name"
                               :placeholder="firstName">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group m-form__group">
                        <label for="last_name">Last Name</label>
                        <input type="text" class="form-control m-input" readonly id="last_name" :placeholder="lastName">
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group m-form__group">
                        <label for="country_of_residence">Country of residence</label>
                        <input type="text" class="form-control m-input" readonly id="country_of_residence"
                               :placeholder="countryOfResidence | capitalFirst">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group m-form__group">
                        <label for="nationality">Nationality</label>
                        <input type="text" class="form-control m-input" readonly id="nationality"
                               :placeholder="nationality | capitalFirst">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <router-link to="/change-password" class="btn btn-outline-primary btn-sm center-block"><i
                        class="fa fa-asterisk"></i> Change Password
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-3">
            <profile-status></profile-status>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
  import ContributionStatusBar from './ContributionStatusBar.vue';
  import ProfileStatus from './ProfileStatus.vue';

  import * as cc from 'change-case';

  export default {
    name: 'Profile',
    data() {
      return {};
    },
    computed: {
      email: function () {
        return this.$store.state.user.email;
      },
      countryOfResidence: function () {
        return this.$store.state.user.details.countryOfResidence ? this.$store.state.user.details.countryOfResidence : this.$store.state.user.kyc.bundlePayload.country_of_residence;
      },
      firstName: function () {
        return this.$store.state.user.details.firstName ? this.$store.state.user.details.firstName : this.$store.state.user.kyc.bundlePayload.first_name;
      },
      lastName: function () {
        return this.$store.state.user.details.lastName ? this.$store.state.user.details.lastName : this.$store.state.user.kyc.bundlePayload.last_name;
      },
      nationality: function () {
        return this.$store.state.user.details.nationality ? this.$store.state.user.details.nationality : this.$store.state.user.kyc.bundlePayload.nationality;
      },
      listingSectionsVisible: function () {
        return process.env.ICO_LISTING_ENABLED === 'YES';
      },
    },
    mounted: function () {
      this.$store.dispatch('getSession', {$http: this.$http});
      this.$store.dispatch('getKyc', {$http: this.$http});
    },
    components: {
      ContributionStatusBar,
      ProfileStatus,
    },
    filters: {
      capitalFirst: function (value) {
        if (!value) {
          return '';
        }
        value = value.toString();
        return cc.titleCase(value);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
