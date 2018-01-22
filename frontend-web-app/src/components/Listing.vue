<template>
  <div id="page-listing" class="page">

    <section id="page-intro" class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
            <div class="flex-center-wrapper">
              <div class="flex-center text-center">
                <h1 class="intro-title">Token Sale Listing</h1>
                <form @submit.prevent="searchProjects">
                  <div class="form-group">
                    <div class="input-group">
                      <input type="text" name="listing_free_search" id="listing_free_search" v-model="listing_free_search" class="form-control input-lg" placeholder="Search project...">
                      <div class="input-group-btn">
                        <button type="submit" class="btn btn-primary btn-lg"><i class="fa fa-search"></i></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="recommended-icos" class="section">
      <div class="container">
        <div class="recommended-title">
          <div class="recommended-label">
            <h2 class="page-title">Featured Token Sales</h2>
          </div>
          <!-- <div class="recommended-see-all text-right">
            <router-link to="/projects" class="see-all">See all <i class="fa fa-arrow-right"></i></router-link>
          </div> -->
        </div>
        <div v-if="recommendedProjects.length" class="project-cards recommended">
          <project-card v-for="project in recommendedProjects" :key="project.published_tracker_code" v-bind="project"></project-card>
        </div>
        <div class="project-cards">
          <project-card v-for="project in allProjects" :key="project.published_tracker_code" v-bind="project"></project-card>
        </div>
        <router-link to="/projects" class="btn btn-primary" >View All Projects</router-link>
      </div>
    </section>

    <section id="gbx-is-something" class="section text-center">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="section-title">GBX is something something awesome title</h2>
          </div>
          <div class="feature col-md-4">
            <img src="../assets/img/icons/icon-security.svg" class="img-responsive" alt="Security">
            <h4>Ultra secure</h4>
            <p>Based on the ideals of public consensus and trust, coupled with AML / KYC best practices, the GBX Trusted Listing Process will allow the community to flourish, whilst protecting all participants, in a governed environment.</p>
          </div>
          <div class="feature col-md-4">
            <img src="../assets/img/icons/icon-trustworthy.svg" class="img-responsive" alt="Trustworthy">
            <h4>Trustworthy</h4>
            <p>An international gateway and harbour within a fully supportive government policy towards Distributed Ledger Technology (DLT) released by the Gibraltar Government.</p>
          </div>
          <div class="feature col-md-4">
            <img src="../assets/img/icons/icon-transparency.svg" class="img-responsive" alt="Transparency">
            <h4>Transparent</h4>
            <p>With a rules based system established by the community for enhanced clarity and infrastructure, the GBX will set the stage for greater confidence, credibility and transparency for all members of the crypto community.</p>
          </div>
        </div>
      </div>
    </section>

    <!--<list-your-ico></list-your-ico>-->

  </div>
</template>


<script>
import ProjectCard from './ProjectCard.vue';
import ListYourIco from './ListYourIco.vue';

import store from '../store';
import Vue from 'vue';
import * as Uiv from 'uiv';
import _ from 'underscore';

export default {
  name: 'Listing',
  data() {
    return {
      listing_free_search: null,
    };
  },
  computed: {
    recommendedProjects() {
      return _.filter(this.$store.state.listing.recommendedProjects, {is_recommended: true});
    },
    allProjects() {
      return _.filter(this.$store.state.listing.recommendedProjects, {is_recommended: false}).slice(0, 8);
    }
  },
  components: {
    ProjectCard,
    ListYourIco,
  },
  methods: {
    searchProjects() {
      this.$router.push({ name: 'Projects', query: { filter: this.listing_free_search } });
    }
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('listing/loadRecommendedProjects', {$http: Vue.http,})
      .then(() => next())
      .catch((err) => {
        Uiv.Notification.notify({
          type: 'danger',
          content: err.message,
        });
        next('/');
      });
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
