<template>
  <nav class="navbar is-primary">
    <div class="container">
      <div class="navbar-brand">
        <router-link tag="a" class="navbar-item" to="/">
          <img :src="require('../assets/img/wealthe-logo-white.svg')" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </router-link>
        <div class="navbar-burger" @click="toggleNavbar">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" :class="{'is-active': showNavbar}">
        <div class="navbar-end">
          <a v-if="!isLoggedIn" class="navbar-item" :href="loginLink">
            LOGIN
          </a>
          <a v-if="!isLoggedIn" class="navbar-item" :href="registerLink">
            CREATE ACCOUNT
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      showNavbar: false,
    };
  },
  methods: {
    contributeLinkClicked() {
      window.location = this.contributeLink;
    },
    toggleNavbar: function () {
      this.showNavbar = !this.showNavbar;
    },
    closeNavbarOnAction: function () {
      if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ){
        this.showNavbar = !this.showNavbar;
      }
    }
  },
  computed: {
    publicSectionsVisible: function () { return this.$store.getters.navbarEntriesVisible; },
    listingSectionsVisible: function () { return process.env.ICO_LISTING_ENABLED === 'YES'; },
    isLoggedIn: function () { return this.$store.state.isLoggedIn; },
    listingRoutesAreRedirected () {
      return !!process.env.LISTING_ROUTES_ROOT_URL;
    },
    listingLink() {
      return this.listingRoutesAreRedirected && `${process.env.LISTING_ROUTES_ROOT_URL}/listing` || '';
    },
    profileLink() {
      return `${process.env.PROFILE_ROUTES_ROOT_URL}/profile` || '';
    },
    loginLink() {
      return `${process.env.PROFILE_ROUTES_ROOT_URL}/login` || '';
    },
    logoutLink() {
      return `${process.env.PROFILE_ROUTES_ROOT_URL}/logout` || '';
    },
    registerLink() {
      return `${process.env.PROFILE_ROUTES_ROOT_URL}/register` || '';
    },
    contributeLink() {
      return `${process.env.PROFILE_ROUTES_ROOT_URL}/ico/contribute` || '';
    },
    navSectionsVisible () {
      return process.env.PROHIBITED_COUNTRY_BUILD !== 'YES';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
