<template>
  <div id="page-contact" class="page">
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 text-center">
            <h2 class="section-title">Contact</h2>
            <alert type="success" v-if="hideForm"><b>Your request has been received!</b> We will contact you shortly.</alert>
          </div>
        </div>
        <div class="row" v-if="!hideForm">
          <div class="col-md-4">
            <p>Want to be a part of the GBX community or learn more about our listing process and ecosystem?</p>
            <p>Please fill in the contact form below and our client relations specialists will be in touch with you shortly.</p>
          </div>
          <form action="/api/contact" method="POST">
            <div class="col-md-4">
              <div class="form-group">
                <label for="name" class="sr-only">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="name" v-bind:disabled="disableForm">
              </div>
              <div class="form-group">
                <label for="email" class="sr-only">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" v-bind:disabled="disableForm">
              </div>
              <div class="form-group">
                <label for="email" class="sr-only">Phone</label>
                <input type="tel" class="form-control" id="phone" placeholder="Phone" v-model="phone" v-bind:disabled="disableForm">
              </div>
              <div class="form-group">
                <recaptcha></recaptcha>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="message" class="sr-only">Message</label>
                <textarea class="form-control" id="message" placeholder="Message" v-model="message" v-bind:disabled="disableForm"></textarea>
              </div>
              <div class="form-group">
                <button type="submit" v-on:click.prevent="submitContact()" v-bind:disabled="actionInProgress || disableForm" class="form-control btn btn-primary" id="submit">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <hr>
            <small>*All your information will be kept confidential. We will never share your information with any third party.</small>
            <hr>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <p>
              You can also find us at<br>
              <i class="fa fa-map"></i> Suite 834, Europort Gibraltar<br>
              GX11 1AA
            </p>
            <br>
            <p>
              <i class="fa fa-envelope"></i> Mail us at <a href="mailto:rkt@gbx.gi">rkt@gbx.gi</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { isEmail, isNumeric, isLength } from 'validator';
  import Recaptcha from './Recaptcha.vue';
  export default {
    name: 'Contact',
    data() {
      return {
        name: null,
        email: null,
        phone: null,
        message: null,
        disableForm: false,
        hideForm: false,
      };
    },
    computed: {
      actionInProgress() { return this.$store.state.globalActionInProgress; },
      gRecaptchaResponse() { return this.$store.state.userCaptcha; },
    },
    components: {
      Recaptcha,
    },
    methods: {
      submitContact: function () {
        if (!this.name) {
          this.$notify({
            type: 'danger',
            content: 'Name is required'
          });
          return;
        }
        if (!this.email) {
          this.$notify({
            type: 'danger',
            content: 'E-mail address is required'
          });
          return;
        }
        if (!isEmail(this.email)) {
          this.$notify({
            type: 'danger',
            content: 'Please use a valid e-mail address'
          });
          return;
        }
        if (!this.phone) {
          this.$notify({
            type: 'danger',
            content: 'Phone is required'
          });
          return;
        }
        if (!isNumeric(this.phone.toString())) {
          this.$notify({
            type: 'danger',
            content: 'Please ensure phone number is numeric'
          });
          return;
        }
        if (!this.message) {
          this.$notify({
            type: 'danger',
            content: 'Message is required'
          });
          return;
        }
        if (!isLength(this.message, { min: 10 })) {
          this.$notify({
            type: 'danger',
            content: 'Message length must be at least 10 characters'
          });
          return;
        }
        if (!this.gRecaptchaResponse) {
          this.$notify({
            type: 'danger',
            content: 'CAPTCHA is required'
          });
          return;
        }

        this.disableForm = true;
        this.$store.dispatch('contactSubmit', {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
          gRecaptchaResponse: this.gRecaptchaResponse,
          $http: this.$http,
          $notify: this.$notify,
        }).then((result) => {
            if (result.success) {
                this.hideForm = true;
            }
        });
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
