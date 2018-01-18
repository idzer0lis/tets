<template>
  <footer id="app-footer" v-if="footerVisible">
    <!-- <cookie-law
      buttonText="Got It!">
      <div slot="message">
        This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies. <a :href="getCookiePolicyUrl" target="_blank">Read the Cookie Policy</a>
      </div>
    </cookie-law> -->
    <div class="container">
      <div class="footer-container">
        <!-- New footer -->
        <!-- <div class="col-sm-12 col-md-8 col-md-offset-2">
          <p>© 2017-18 The Gibraltar Blockchain Exchange (GBX Limited) &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; <a href="https://www.gbx.gi" target="_blank">www.gbx.gi</a> &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; Contact: &nbsp; <a href="mailto:rkt@gbx.gi">rkt@gbx.gi</a></p>
        </div> -->
        <!-- Old footer -->
        <div class="footer-contact">
          <div class="footer-wrap">
          <p><i class="fa fa-map"></i> Contact:</p>
          <p>
            <a href="https://gbx.gi" target="_blank">https://gbx.gi</a><br>
            <a href="mailto:rkt@gbx.gi">rkt@gbx.gi</a>
          </p>
          </div>

        </div>
        <div class="footer-copy">
          <div class="footer-wrap">
            <p>© 2017-18 The Gibraltar Blockchain Exchange (GBX Limited)</p>
          </div>

        </div>
        <div class="footer-terms">
          <div class="footer-wrap">
               <ul class="footer-menu list-unstyled">
            <li><a :href="getTermsAndConditionsUrl" target="_blank">Terms &amp; Conditions</a></li>
            <li><a :href="getPrivacyPolicyUrl" target="_blank">Privacy Policy</a></li>
            <li><a :href="getCookiePolicyUrl" target="_blank">Cookie Policy</a></li>
            <li><a :href="getTermsOfUseUrl" target="_blank">Terms of Use</a></li>
          </ul>
          </div>

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import CookieLaw from 'vue-cookie-law'
import MailchimpSubscribeFooter from './MailchimpSubscribeFooter.vue'

export default {
  name: 'AppFooter',
  data() {
    return {
      mailchimpSubscribeAction: process.env.MAILCHIMP_POST_URL,
    };
  },
  computed: {
    footerVisible() {
      return this.$store.state.footerVisible;
    },
    getCookiePolicyUrl() {
      if (process.env.COOKIE_POLICY_URL) {
        return process.env.COOKIE_POLICY_URL;
      }
      //return require('../assets/files/Cookie-Policy.pdf');
    },
  },
  components: {
    MailchimpSubscribeFooter,
    CookieLaw
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }

  .Cookie {
    background: #1a1919;
    color: #fff;
  }
  .Cookie a {
    transition: all .2s;
    text-decoration: none !important;
    color: #ba374a;
  }
  .Cookie a:hover {
    color: #fff;
  }
</style>
