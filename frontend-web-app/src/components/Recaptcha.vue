<template>
  <div id="recaptcha">
    <vue-recaptcha ref="recaptcha"
                  @verify="onVerify"
                  @expired="onExpired"
                  v-bind:sitekey="sitekey">
    </vue-recaptcha>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
      name: 'Recaptcha',
    data() {
      return {
        sitekey: process.env.RECAPTCHA_SITE_KEY,
      }
    },
    components: { VueRecaptcha },
    computed: {
      globalActionInProgress() { return this.$store.state.globalActionInProgress; },
    },
    watch: {
      globalActionInProgress(newVal) {
        if (!newVal) {
          this.resetRecaptcha();
          this.$store.dispatch('setCaptcha', { response: null });
        }
      }
    },
    mounted() {
      this.$store.dispatch('setCaptcha', { response: null });
    },
    methods: {
      onVerify(response) {
        this.$store.dispatch('setCaptcha', { response });
      },
      onExpired() {
        this.$store.dispatch('setCaptcha', { response: null });
      },
      resetRecaptcha() {
        this.$refs.recaptcha.reset() // Direct call reset method
      }
    }
  };
</script>
