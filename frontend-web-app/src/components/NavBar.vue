<template>
  <header id="app-header" class="navbar-fixed-top">
  	<nav class="navbar navbar-default">
  		<div class="container">
  			<div class="navbar-header">
  				<button type="button" class="navbar-toggle collapsed" @click="toggleNavbar">
  					<span class="sr-only">Toggle navigation</span>
  					<span class="icon-bar"></span>
  					<span class="icon-bar"></span>
  					<span class="icon-bar"></span>
  				</button>
          <router-link class="navbar-brand" to="/">
            <img src="../../src/assets/img/wealthe-logo.svg" width="80" height="40" alt="Gibraltar Blockchain Exchange">
          </router-link>
  			</div>
  			<collapse class="navbar-collapse" v-model="showNavbar" v-if="navSectionsVisible">
  				<ul class="nav navbar-nav">
            <router-link tag="li" to="/listing" v-if="listingSectionsVisible && !listingRoutesAreRedirected" v-on:click.native="closeNavbarOnAction"><a>Listing</a></router-link>
            <li v-if="listingSectionsVisible && listingRoutesAreRedirected"><a :href="listingLink">Listing</a></li>
            <li v-on:click.native="closeNavbarOnAction"><a href="https://gbx.gi/" target="_blank">About</a></li>
            <li v-on:click.native="closeNavbarOnAction"><a href="https://gbx.gi/news/" target="_blank">News</a></li>
            <!-- <router-link tag="li" to="/about" v-on:click.native="closeNavbarOnAction"><a>About</a></router-link>
            <router-link tag="li" to="/news" v-on:click.native="closeNavbarOnAction"><a>News</a></router-link> -->
            <router-link tag="li" to="/contact" v-on:click.native="closeNavbarOnAction"><a>Contact</a></router-link>
  				</ul>
          <ul class="nav navbar-nav navbar-right" v-if="profileRoutesAreRedirected">
            <li v-if="isLoggedIn"><a :href="profileLink"><i class="fa fa-user"></i> Profile</a></li>
            <li v-if="isLoggedIn"><a :href="logoutLink">Log out</a></li>
            <li v-if="!isLoggedIn"><a :href="loginLink">Login</a></li>
            <li v-if="!isLoggedIn"><a :href="registerLink">Register</a></li>
            <li><button class="btn btn-outline-primary navbar-btn" @click="contributeLinkClicked">Contribute Now to GBX Rock Token</button></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" v-else>
            <router-link tag="li" to="/profile" v-if="isLoggedIn" v-on:click.native="closeNavbarOnAction"><a><i class="fa fa-user"></i> Profile</a></router-link>
            <router-link tag="li" to="/logout" v-if="isLoggedIn" v-on:click.native="closeNavbarOnAction"><a>Log out</a></router-link>
            <router-link tag="li" to="/login" v-if="!isLoggedIn" v-on:click.native="closeNavbarOnAction"><a>Login</a></router-link>
            <router-link tag="li" to="/register" v-if="!isLoggedIn" v-on:click.native="closeNavbarOnAction"><a>Register</a></router-link>
            <router-link tag="button" class="btn btn-outline-primary navbar-btn" to="/ico/contribute" v-on:click.native="closeNavbarOnAction">Contribute Now to GBX Rock Token</router-link>
          </ul>
  			</collapse>
  		</div>
  	</nav>
  </header>
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
    profileRoutesAreRedirected () {
      return !!process.env.PROFILE_ROUTES_ROOT_URL;
    },
    profileLink() {
      return this.profileRoutesAreRedirected && `${process.env.PROFILE_ROUTES_ROOT_URL}/profile` || '';
    },
    loginLink() {
      return this.profileRoutesAreRedirected && `${process.env.PROFILE_ROUTES_ROOT_URL}/login` || '';
    },
    logoutLink() {
      return this.profileRoutesAreRedirected && `${process.env.PROFILE_ROUTES_ROOT_URL}/logout` || '';
    },
    registerLink() {
      return this.profileRoutesAreRedirected && `${process.env.PROFILE_ROUTES_ROOT_URL}/register` || '';
    },
    contributeLink() {
      return this.profileRoutesAreRedirected && `${process.env.PROFILE_ROUTES_ROOT_URL}/ico/contribute` || '';
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
