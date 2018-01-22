<template>
  <div class="container" v-if="serverCommunicationError">
    <div class="row">
      <div class="col-md-12 contribution-server-error">
        <p><strong>Warning!</strong>
          We are having trouble communicating with the server. As a result, site functionality may be restricted.</p>
      </div>
      <!--<div class="row">-->
      <!--<div class="col-md-12"><p>We are having trouble communicating with the server. As a result, site functionality may be restricted.</p>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommunicationErrorStatusBar',
    data() {
      return {
        show: true,
      };
    },
    computed: {
      serverCommunicationError: function () {
        return this.$store.state.icoContributionSettings.serverCommunicationError;
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .server-error {
    color: white;
  }
</style>
