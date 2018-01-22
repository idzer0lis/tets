<template>
  <div class="project-card-wrapper">
    <div class="project-card">
      <header class="project-card-header">
        <router-link :to="projectLink">
          <div class="project-logo" v-bind:style="projectHeaderPhotoBackgroundStyle"></div>
        </router-link>
      </header>
      <div class="project-card-body">
        <h4 class="project-title">
          <router-link :to="projectLink">
            {{ project_name }}
          </router-link>
        </h4>
        <p class="project-short-description">
          <span v-html="projectShortDescription"></span>
        </p>
      </div>
      <footer class="project-card-footer">
        <p v-if="projectTechnology">
          <i class="project-small-icon icon-circuit"><img src="../assets/img/icons/icon-circuit.svg" class="img-responsive" alt="Icon Circuit"></i>
          <span class="text">{{ projectTechnology }}</span>
        </p>
        <div v-if="projectHasWhitepaper">
          <a class="project-whitepaper-link" v-bind:href="projectWhitepaperLink" target="_blank">
            <i class="project-small-icon icon-document"><img src="../assets/img/icons/icon-document.svg" class="img-responsive" alt="Icon White Paper"></i>
            <span class="text">Read Whitepaper</span>
          </a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  data() {
    return {
//      projectTitle: 'BitClave',
//      projectShortDescription: 'Project has such a short description so oh well here it goes',
//      projectTechnology: 'ETH',
//      projectHasWhitepaper: true,
//      projectWhitepaperLink: 'http://www.google.com',
//      msg: 'Log into your account',
    };
  },
  computed: {
    projectLink() {
        return `/projects/${this.published_tracker_code.toLowerCase()}`
    },
    projectShortDescription() {
      return (this.page_contents && this.page_contents.project_short_description || '').replace(/\r\n|\r|\n/g, '<br>');
    },
    projectTechnology() {
      return this.page_contents && this.page_contents.project_technology || '';
    },
    projectHasWhitepaper() {
      return this.page_contents && !!this.page_contents.whitepaper_file_name;
    },
    projectWhitepaperLink() {
      if (!this.projectHasWhitepaper) {
        return '';
      }

      return `/api/project/files/${this.published_tracker_code.toLowerCase()}/${this.page_contents.whitepaper_file_name}`;
    },
    projectHasHeaderPhoto() {
      return this.page_contents && !!this.page_contents.project_header_photo_file_name;
    },
    projectHeaderPhotoLink() {
      if (!this.projectHasHeaderPhoto) {
        return require('../assets/img/projects/bitclave-card-header.jpg');
      }

      return `/api/project/files/${this.published_tracker_code.toLowerCase()}/${this.page_contents.project_header_photo_file_name}`;
    },
    projectHeaderPhotoBackgroundStyle() {
      return {
        'background-image': `url('${this.projectHeaderPhotoLink}')`,
      };
    }
  },
  props: ['project_name', 'page_contents', 'published_tracker_code'],
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
