<template>
  <div id="login">
    <div class="login-col login-col__img">
      <img src="static_workspace/img/cat.jpg" alt="Timeout Cat" />
    </div>

    <div class="login-col login-col__form">
      <div class="login-col__form-content">
        <img src="static_workspace/img/timeout-logo.svg" alt="Timeout" />
        <p>A time saver for your Twitter feed</p>
        <a v-if="oauthToken" class="btn">Loading...</a>
        <a href="/request-token" v-else class="btn">Log in with Twitter</a>
      </div>
    </div>
  </div>
</template>

<script>
import { app, router } from '../main.js'
export default {
  name: 'login',
  data: function () {
    return {
      oauthToken: null,
      oauthVerifier: null
    }
  },
  mounted: function() {
      this.$nextTick(function () {
        console.log(this.$root.$data.accessToken);
        if(this.$root.$data.user && this.$root.$data.accessToken != 'null' && this.$root.$data.accessSecret != 'null'){
          router.push({ name: 'loginsuccess' });
        } else if(this.$root.$data.user){
          localStorage.clear();
          this.twitterLogin();
        } else {
          var params = getUrlVars();
          this.oauthToken = params.oauth_token;
          this.oauthVerifier = params.oauth_verifier;

          if(this.oauthToken && this.oauthVerifier){
            $.get("/access-token?oauth_token="+this.oauthToken+"&oauth_verifier="+this.oauthVerifier).done(function(data) {
              console.log(data);
              app.$emit('set-user', data.user, data.access_token, data.access_secret);
              router.push({ name: 'loginsuccess' })
            });
          }
        }
      });
  },
  methods: {
    twitterLogin: () => {
      window.location.href = "/request-token";
    }
  }
}
</script>
