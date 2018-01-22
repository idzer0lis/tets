<template>
  <div id="page-projects" class="page">

    <header class="projects-searchbar section-padding-sm">
      <div class="container">
        <div class="row">
          <form class="form-inline" @submit.prevent="performSearch">
            <div class="col-md-4">
              <div class="input-group">
                <input @input="debounceSearch" v-model="listing_free_search" type="text" name="listing_free_search" id="listing_free_search" class="form-control" placeholder="Search project...">
                <div class="input-group-btn">
                  <!-- TODO: update search link -->
                  <button type="button" class="btn btn-primary" @click="performSearch"><i class="fa fa-search"></i></button>
                </div>
              </div>
            </div>
            <!--<div class="col-md-8">-->
            <!--<div class="form-group">-->
            <!--<select class="form-control" name="">-->
            <!--<option value="" selected>Type</option>-->
            <!--<option value="">Option 1</option>-->
            <!--<option value="">Option 2</option>-->
            <!--<option value="">Option 3</option>-->
            <!--</select>-->
            <!--<select class="form-control" name="">-->
            <!--<option value="" selected>Recent</option>-->
            <!--<option value="">Option 1</option>-->
            <!--<option value="">Option 2</option>-->
            <!--<option value="">Option 3</option>-->
            <!--</select>-->
            <!--<select class="form-control" name="">-->
            <!--<option value="" selected>Technology</option>-->
            <!--<option value="">Option 1</option>-->
            <!--<option value="">Option 2</option>-->
            <!--<option value="">Option 3</option>-->
            <!--</select>-->
            <!--</div>-->
            <!--</div>-->
          </form>
        </div>
      </div>
    </header>

    <section class="section section-padding-sm">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h2 class="section-title">Token Sale Search Results</h2>
          </div>
        </div>
        <alert type="info" v-if="emptyArray">There are no results to display</alert>
        <div class="project-cards">
          <project-card v-for="project in searchProjects" :key="project.published_tracker_code" v-bind="project"></project-card>
        </div>
        <pagination v-model="currentPage" :total-page="totalPage"></pagination>

      </div>
    </section>

  </div>
</template>


<script>
  import ProjectCard from './ProjectCard.vue';

  import store from '../store';
  import Vue from 'vue';
  import * as Uiv from 'uiv';
  import * as _ from 'underscore';

  const defaultLimit = 8;
  const defaultPage = 1;
  const defaultOffset = 0;

  function _performSearch(to, from, next) {
    return store.dispatch('listing/loadSearchProjects', {
        filter: to.query.filter || '', page: to.query.page || defaultPage, limit: to.query.limit || defaultLimit, offset: to.query.offset || defaultOffset, $http: Vue.http,
    })
      .then(() => next())
      .catch((err) => {
        Uiv.Notification.notify({
          type: 'danger',
          content: err.message,
        });
        next({ name: 'Listing' });
      });
  }

  export default {
    name: 'Projects',
    data() {
      return {
        current_listing_free_search: null,
        listing_free_search: null,
        currentPage: defaultPage,
        limit: defaultLimit,
        offset: null,
      };
    },
    computed: {
      searchProjects() {
        return this.$store.state.listing.searchProjects;
      },
      emptyArray() {
        return this.searchProjects.length < 1;
      },
      totalPage() {
        return Math.ceil(this.$store.state.listing.searchProjectsTotal / this.limit) || 1;
      }
    },
    components: {
      ProjectCard,
    },
    methods: {
      debounceSearch: _.debounce(function () {
        this.performSearch();
      }, 500),
      performSearch: function () {
        if (this.current_listing_free_search === this.listing_free_search) {
          return;
        }

        this.$router.push({ name: 'Projects', query: { filter: this.listing_free_search, limit: this.limit, offset: this.offset, page: this.currentPage }});
      },
    },
    mounted() {
      this.current_listing_free_search = this.$route.query.filter;
      this.listing_free_search = this.$route.query.filter;
      this.currentPage = this.$route.query.page || defaultPage;
      this.limit = this.$route.query.limit || defaultLimit;
      this.offset = this.$route.query.offset || defaultOffset;
    },
    watch: {
      currentPage: function (newPage) {
        this.$router.push({ name: 'Projects', query: { filter: this.listing_free_search, limit: this.limit, offset: this.limit*(this.currentPage-1), page: this.currentPage }});
      }
    },
    beforeRouteEnter(to, from, next) {
      _performSearch(to, from, next);
    },
    beforeRouteUpdate(to, from, next) {
      this.current_listing_free_search = to.query.filter;
      this.listing_free_search = to.query.filter;

      _performSearch(to, from, next);
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
