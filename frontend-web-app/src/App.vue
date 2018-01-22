<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="fade">
      <router-view/>
    </transition>
    <app-footer></app-footer>
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
  .fade-enter-active {
    transition: opacity .05s
  }
  .fade-leave-active {
    transition: opacity .15s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .fade-enter-to {
    opacity: 1
  }
</style>
