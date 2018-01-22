<template>
  <div id="page-reset-password" class="page">
    <section id="page-intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="login-box-wrapper">
              <div class="login-box">
                <header class="login-box-header">
                  <h2 class="text-center">Reset your new password here</h2>
                </header>
                <div class="login-box-body">
                  <form action="/login" class="form">
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="password" id="password" class="form-control" placeholder="Password" v-model="password" v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="confirm_password" id="confirm_password" class="form-control" placeholder="Confirm password" v-model="confirm_password" v-bind:disabled="actionInProgress">
                    </div>
                    <input type="hidden" name="password_reset_code" id="password_reset_code" class="form-control" v-model="password_reset_code" v-bind:disabled="actionInProgress">
                    <div class="form-group">
                      <button type="submit" class="form-control btn btn-primary" v-on:click.prevent="submitPasswordReset()" v-bind:disabled="actionInProgress">Reset password</button>
                    </div>
                  </form>
                </div>
                <footer class="login-box-footer text-center">
                  <p>Remembered your password?</p>
                  <router-link to="/login">Log into your account here <i class="fa fa-arrow-right"></i></router-link>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      password: null,
      confirm_password: null,
      password_reset_code: this.$route.query.code || null,
    };
  },
  computed: {
    actionInProgress: function () { return this.$store.state.globalActionInProgress; },
  },
  methods: {
    submitPasswordReset: function () {
      if (!this.password) {
        this.$notify({
          type: 'danger',
          content: 'Password is required'
        });
        return;
      }

      if (!this.confirm_password) {
        this.$notify({
          type: 'danger',
          content: 'Please confirm password'
        });
        return;
      }

      if (this.password !== this.confirm_password) {
        this.$notify({
          type: 'danger',
          content: 'Passwords do not match'
        });
        return;
      }

      this.$store.dispatch('getSession', { $http: this.$http })
        .then(() => {
          if (this.$store.state.isLoggedIn) {
            this.$router.push('/profile');
            return;
          }

          this.$store.dispatch('resetPassword', {
            password: this.password,
            confirm_password: this.confirm_password,
            password_reset_code: this.password_reset_code,
            $http: this.$http,
            $router: this.$router,
            $notify: this.$notify,
          });
        });
    },
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
