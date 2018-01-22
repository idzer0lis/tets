<template>
  <div class="project-details-text">
    <section v-if="projectLongDescription">
      <div v-html="projectLongDescription"></div>
    </section>
    <section v-if="projectTokensDistribution">
      <h3>Tokens Distribution</h3>
      <div v-html="projectTokensDistribution"></div>
    </section>
    <section v-if="projectBountyCampaign">
      <h3>Bounty Campaign</h3>
      <div v-html="projectBountyCampaign"></div>
    </section>
    <section v-if="projectEscrow">
      <h3>Escrow</h3>
      <div v-html="projectEscrow"></div>
    </section>
  </div>
</template>


<script>
export default {
  name: 'ProjectDetails',
  data() {
    return {};
  },
  computed: {
    projectLongDescription() {
      return (this.$store.state.listing.pageContents.project_long_description || '');
    },
    projectTokensDistribution() {
      return (this.$store.state.listing.pageContents.project_tokens_distribution || '');
    },
    projectBountyCampaign() {
      return (this.$store.state.listing.pageContents.project_bounty_campaign || '');
    },
    projectEscrow() {
      return (this.$store.state.listing.pageContents.project_escrow || '');
    },
  },
  components: {
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
