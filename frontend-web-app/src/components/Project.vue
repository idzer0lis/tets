<template>
  <div id="page-project" class="page">

    <section id="project-intro" class="section section-padding-sm">
      <div class="container">
        <div class="project-video">
          <div class="project-image-wrapper">
            <youtube v-if="youtubeVideoId" :video-id="youtubeVideoId" player-width="100%" player-height="100%"></youtube>
            <img :src="projectHeaderPhotoLink" class="img-responsive" alt="" v-else>
          </div>
          <div id="project-details">
            <h2 class="section-title"></h2>

            <div class="project-specs">
              <div class="spec row">
                <div class="column-1 col-sm-6 col-md-4">
                  Token Name:
                </div>
                <div class="column-2 col-sm-6 col-md-8">
                  {{projectName}} ({{tokenName}})
                </div>
              </div>
              <div class="spec row" v-if="projectHasWhitepaper">
                <div class="column-1 col-sm-6 col-md-4">
                  Whitepaper:
                </div>
                <div class="column-2 col-sm-6 col-md-8">
                  <a :href="projectWhitepaperLink" target="_blank"><i class="fa fa-file-pdf-o"></i> Download PDF</a>
                </div>
              </div>
              <div class="spec row" v-if="projectTokenType">
                <div class="column-1 col-sm-6 col-md-4">
                  Type:
                </div>
                <div class="column-2 col-sm-6 col-md-8">
                  {{projectTokenType}}
                </div>
              </div>
              <div class="spec row" v-if="projectShortDescription">
                <div class="column-1 col-sm-6 col-md-4">
                  Description:
                </div>
                <div class="column-2 col-sm-6 col-md-8">
                  <span v-html="projectShortDescription"></span>
                </div>
              </div>
              <div class="spec row" v-if="projectDetails">
                <div class="column-1 col-sm-6 col-md-4">
                  Website:
                </div>
                <div class="column-2 col-sm-6 col-md-8">
                  <a v-bind:href="projectDetails" target="_blank">{{projectDetails}}</a>
                </div>
              </div>
              <div class="spec row" v-if="projectSocialMedia">
                <div class="column-1 col-sm-6 col-md-4">
                  Connect:
                </div>
                <div class="column-2 col-sm-6 col-md-8">
                  <ul class="project-social list-unstyled list-inline">
                    <li v-if="projectSocialMediaTelegram"><a :href="projectSocialMediaTelegram" target="_blank"
                                                              rel="nofollow"><i class="fa fa-telegram"></i></a></li>
                    <li v-if="projectSocialMediaBitcointalk"><a :href="projectSocialMediaBitcointalk" target="_blank"
                                                                rel="nofollow"><i class="fa fa-bitcoin"></i></a></li>
                    <li v-if="projectSocialMediaReddit"><a :href="projectSocialMediaReddit" target="_blank"
                                                            rel="nofollow"><i class="fa fa-reddit"></i></a></li>
                    <li v-if="projectSocialMediaFacebook"><a :href="projectSocialMediaFacebook" target="_blank"
                                                              rel="nofollow"><i class="fa fa-facebook"></i></a></li>
                    <li v-if="projectSocialMediaSlack"><a :href="projectSocialMediaSlack" target="_blank"
                                                          rel="nofollow"><i class="fa fa-slack"></i></a></li>
                    <li v-if="projectSocialMediaTwitter"><a :href="projectSocialMediaTwitter" target="_blank"
                                                            rel="nofollow"><i class="fa fa-twitter"></i></a></li>
                    <li v-if="projectSocialMediaLinkedIn"><a :href="projectSocialMediaLinkedIn" target="_blank"
                                                              rel="nofollow"><i class="fa fa-linkedin"></i></a></li>
                    <li v-if="projectSocialMediaGithub"><a :href="projectSocialMediaGithub" target="_blank"
                                                            rel="nofollow"><i class="fa fa-github"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="project-tabs section section-padding-sm">
      <div class="container container-tabs">
        <div class="row">
          <div class="col-xs-12">
            <tabs justified v-model="activeTab">
              <tab title="Contribute" disabled="true" id="contribute">
                <tooltip text="Coming soon!" target=".disabled"/>
                <div>
                  <div class="alert alert-info text-center">Coming soon!</div>
                </div>
              </tab>
              <tab title="Project Details">
                <div class="container">
                  <project-details></project-details>
                </div>
              </tab>
              <tab title="Team">
                <div class="container">
                  <project-team></project-team>
                </div>
              </tab>
            </tabs>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>


<script>
  import ProjectDetails from './ProjectDetails.vue';
  import ProjectTeam from './ProjectTeam.vue';

  import store from '../store';
  import Vue from 'vue';
  import * as Uiv from 'uiv';

  import VueYouTubeEmbed from 'vue-youtube-embed';
  Vue.use(VueYouTubeEmbed);

  import { isURL } from 'validator';

  function validateURL(url) {
    if (url.indexOf("http://") === 0 || url.indexOf("https://") === 0) {
      return url;
    } else {
      return 'http://' + url;
    }
  }

  function _performLoad(to, from, next) {
    if (!to.params.project) {
      return next({ name: 'Projects'});
    }

    if (!!to.params.section && ['contribute', 'team'].indexOf(to.params.section) === -1) {
      return next({
        name: 'Project',
        params: {
          project: to.params.project,
        },
      });
    }

    // If we haven't changed the project, don't load new data
    if (to.name === from.name && to.params.project === from.params.project) {
      return next();
    }

    return store.dispatch('listing/loadProject', {trackerCode: to.params.project, $http: Vue.http,})
      .then(() => next())
      .catch((err) => {
        Uiv.Notification.notify({
          type: 'danger',
          content: err.message,
        });
        next('/listing');
      });
  }

  export default {
    name: 'Project',
    computed: {
      contributeLink: function () {
        return `/projects/${this.$route.params.project}/contribute`;
      },
      teamLink: function () {
        return `/projects/${this.$route.params.project}/team`;
      },
      section: function () {
        if (this.$route.params.section === 'team') {
          return 'TEAM';
        }

        if (this.$route.params.section === 'contribute') {
          return 'CONTRIBUTE';
        }

        return 'DETAILS';
      },
      activeTab: {
        get() {
          if (this.$route.params.section === 'team') {
            return 2;
          }

          if (this.$route.params.section === 'contribute') {
            return 0;
          }

          return 1;
        },
        set(val) {
          if (val === 0) {
            return this.$router.push({
              name: 'Project', params: {
                project: this.$route.params.project,
                section: 'contribute',
              }
            });
          }

          if (val === 2) {
            return this.$router.push({
              name: 'Project', params: {
                project: this.$route.params.project,
                section: 'team',
              }
            });
          }

          return this.$router.push({
            name: 'Project', params: {
              project: this.$route.params.project,
            }
          });
        },
      },
      tokenName() {
        return this.$store.state.listing.tokenName;
      },
      projectName() {
        return this.$store.state.listing.projectName;
      },
      projectDetails() {
        const pageContents = this.$store.state.listing.pageContents;

        let projectWebsite = pageContents.project_website || '';
        if (!projectWebsite) {
          projectWebsite = false;
        } else if (projectWebsite.indexOf('http') !== 0) {
          projectWebsite = `http://${projectWebsite}`;
        }

        return projectWebsite;
      },
      projectShortDescription() {
        return (this.$store.state.listing.pageContents.project_short_description || '').replace(/\r\n|\r|\n/g, '<br>');
      },
      projectTokenType() {
        return this.$store.state.listing.pageContents.token_type || '';
      },
      projectSocialMedia() {
        return this.$store.state.listing.pageContents && Object.keys(this.$store.state.listing.pageContents).some((key) => key.indexOf('social_media_links_') === 0);
      },
      projectSocialMediaTelegram() {
        return this.$store.state.listing.pageContents.social_media_links_telegram && validateURL(this.$store.state.listing.pageContents.social_media_links_telegram) || '';
      },
      projectSocialMediaBitcointalk() {
        return this.$store.state.listing.pageContents.social_media_links_bitcointalk && validateURL(this.$store.state.listing.pageContents.social_media_links_bitcointalk) || '';
      },
      projectSocialMediaReddit() {
        return this.$store.state.listing.pageContents.social_media_links_reddit && validateURL(this.$store.state.listing.pageContents.social_media_links_reddit) || '';
      },
      projectSocialMediaFacebook() {
        return this.$store.state.listing.pageContents.social_media_links_facebook && validateURL(this.$store.state.listing.pageContents.social_media_links_facebook) || '';
      },
      projectSocialMediaSlack() {
        return this.$store.state.listing.pageContents.social_media_links_slack && validateURL(this.$store.state.listing.pageContents.social_media_links_slack) || '';
      },
      projectSocialMediaTwitter() {
        return this.$store.state.listing.pageContents.social_media_links_twitter && validateURL(this.$store.state.listing.pageContents.social_media_links_twitter) || '';
      },
      projectSocialMediaLinkedIn() {
        return this.$store.state.listing.pageContents.social_media_links_linkedin && validateURL(this.$store.state.listing.pageContents.social_media_links_linkedin) || '';
      },
      projectSocialMediaGithub() {
        return this.$store.state.listing.pageContents.social_media_links_github && validateURL(this.$store.state.listing.pageContents.social_media_links_github) || '';
      },
      youtubeVideoId() {
          return this.$store.state.listing.pageContents.project_video_link && isURL(this.$store.state.listing.pageContents.project_video_link)
            ? this.$youtube.getIdFromURL(this.$store.state.listing.pageContents.project_video_link)
            : null;
      },

      projectHasHeaderPhoto() {
        return !!this.$store.state.listing.pageContents.project_header_photo_file_name;
      },
      projectHeaderPhotoLink() {
        if (!this.projectHasHeaderPhoto) {
          return require('../assets/img/dummy/dummy-project.png');
        }

        return `/api/project/files/${this.$route.params.project.toLowerCase()}/${this.$store.state.listing.pageContents.project_header_photo_file_name}`;
      },
      projectHasWhitepaper() {
        return !!this.$store.state.listing.pageContents.whitepaper_file_name;
      },
      projectWhitepaperLink() {
        if (!this.projectHasWhitepaper) {
          return '';
        }

        return `/api/project/files/${this.$route.params.project.toLowerCase()}/${this.$store.state.listing.pageContents.whitepaper_file_name}`;
      },
    },
    data() {
      return {};
    },
    components: {
      ProjectDetails,
      ProjectTeam,
    },
    beforeRouteEnter(to, from, next) {
      return _performLoad(to, from, next);
    },
    beforeRouteUpdate(to, from, next) {
      return _performLoad(to, from, next);
    }
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
