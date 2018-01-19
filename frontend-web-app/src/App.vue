<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="fade">
      <router-view/>
    </transition>
    <!-- <app-footer></app-footer> -->
  </div>
</template>


<script>
import NavBar from './components/NavBar';
import AppFooter from './components/AppFooter';
import $ from 'jquery';

export default {
  name: 'app',
  components: {
    NavBar,
    AppFooter,
  },
  // You put the jQuery stuff in the 'mounted' section
  mounted: function () {
//    $(this.$el).find('#logo').addClass('animated bounce');
  }
};
</script>


<style lang="scss">
  // Import Bulma's core
  @import "~bulma/sass/utilities/_all";

  // Set your colors
  $primary: #20A1F2;
  $primary-invert: findColorInvert($primary);

  // Setup $colors to use as bulma classes (e.g. 'is-twitter')
  $colors: (
      "white": ($white, $black),
      "black": ($black, $white),
      "light": ($light, $light-invert),
      "dark": ($dark, $dark-invert),
      "primary": ($primary, $primary-invert),
      "info": ($info, $info-invert),
      "success": ($success, $success-invert),
      "warning": ($warning, $warning-invert),
      "danger": ($danger, $danger-invert)
  );

  // Fonts
  $family-primary: 'Yantramanav', sans-serif;
  
  // Links
  $link: $primary;
  $link-invert: $primary-invert;
  $link-focus-border: $primary;

  // Import Bulma and Buefy styles
  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
