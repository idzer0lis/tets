<template>
  <div class="page">
  </div>
</template>

<script>
export default {
  name: 'Logout',
  data() {
    return {};
  },
  mounted: function () {
    this.$store.dispatch('logOut', { $http: this.$http, $notify: this.$notify })
      .then(() => this.$router.push('/'));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
