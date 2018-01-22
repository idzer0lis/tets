<template>
  <div id="page-favorites" class="page">
    <contribution-status-bar></contribution-status-bar>
    <section class="section section-padding-sm">
      <div class="container">
        <header class="row">
          <div class="col-sm-8">
            <h2 class="section-title">Favorites</h2>
          </div>
          <div class="col-sm-4 text-right">
            <router-link to="/profile" class="section-header-extra-link"><i class="fa fa-user"></i> Profile</router-link>
          </div>
        </header>
        <div class="row">
          <project-card></project-card>
          <project-card></project-card>
          <project-card></project-card>
          <project-card></project-card>
          <project-card></project-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ContributionStatusBar from './ContributionStatusBar.vue';
import ProjectCard from './ProjectCard.vue';

export default {
  name: 'Favorites',
  data() {
    return {};
  },
  components: {
    ProjectCard,
    ContributionStatusBar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
