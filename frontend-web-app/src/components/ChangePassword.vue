<template>
  <div id="page-change-password" class="page">
    <section id="page-intro">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="login-box-wrapper">
              <div class="login-box">
                <router-link to="/profile" class="extra-login-register-link btn btn-outline-white">
                  <span>Back</span>
                  <i class="fa fa-arrow-right"></i>
                </router-link>
                <header class="login-box-header">
                  <h2 class="text-center">Change password</h2>
                </header>
                <div class="login-box-body">
                  <form action="/api/change-password" class="form" method="post">
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="current_password" id="current_password" class="form-control" placeholder="Current password" v-model="current_password" v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="password" id="password" class="form-control" placeholder="Password" v-model="password" v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <input type="password" autocomplete="off" name="confirm_password" id="confirm_password" class="form-control" placeholder="Confirm password" v-model="confirm_password" v-bind:disabled="actionInProgress">
                    </div>
                    <div class="form-group">
                      <button type="submit" class="form-control btn btn-primary" v-on:click.prevent="submitPasswordChange()" v-bind:disabled="actionInProgress">Submit</button>
                    </div>
                  </form>
                </div>
                <footer class="login-box-footer text-center">

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
    name: 'ChangePassword',
    data() {
      return {
        current_password: null,
        password: null,
        confirm_password: null,
      };
    },
    computed: {
      actionInProgress: function () { return this.$store.state.globalActionInProgress; }
    },
    methods: {
      submitPasswordChange: function () {
        this.$store.dispatch('getSession', { $http: this.$http })
          .then(() => {
            if (!this.$store.state.isLoggedIn) {
              this.$router.push('/login');
              return;
            }

            this.$store.dispatch('changePassword', {
              current_password: this.current_password,
              password: this.password,
              confirm_password: this.confirm_password,
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
