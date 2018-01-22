<template>
  <div class="team-member col-xs-6 col-md-3 text-center">
    <div class="team-member-image-wrapper">
      <img :src="projectTeamMemberImageLink" class="team-member-image img-responsive" alt="">
    </div>
    <h4 class="team-member-name">{{name}}</h4>
    <p class="team-member-role">{{jobTitle}}</p>
    <!--<p class="team-member-short-bio">{{bio}}</p>-->
    <div >
      <a class="project-whitepaper-link" :href="validateLinkedinURL" target="_blank" v-if="linkedIn">
        <i class="fa fa-linkedin"></i>
      </a>
      <!-- <a class="project-whitepaper-link" :href="twitter" target="_blank" v-if="twitter">
        <i class="fa twitter"></i>
      </a> -->
    </div>
  </div>
</template>


<script>
export default {
  name: 'ProjectTeamMemberCard',
  props: ['name', 'jobTitle', 'bio', 'linkedIn', 'twitter', 'profilePictureName'],
  data() {
    return {
    };
  },
  computed: {
    projectTeamMemberHasImage() {
      return !!this.profilePictureName;
    },
    projectTeamMemberImageLink() {
      if (!this.projectTeamMemberHasImage) {
        return require('../assets/img/dummy/dummy-avatar.png');
      }

      return `/api/project/files/${this.$store.state.listing.trackerCode.toLowerCase()}/team-members/${this.profilePictureName}`;
    },
    validateLinkedinURL() {
        var url = this.linkedIn;
        if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
            return url;
        } else {
          return 'http://' + url;
        }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
