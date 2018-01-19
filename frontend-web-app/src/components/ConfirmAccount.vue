<template>
    <div class="page">
    </div>
</template>

<script>
  export default {
    name: 'ConfirmAccount',
    data() {
      return {};
    },
    mounted: function () {
      this.$store.dispatch('confirmAccount', { $http: this.$http, $router: this.$router, $notify: this.$notify, code: this.$route.query.code, });
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
