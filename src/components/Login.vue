<template>
  <div id="login">
    <div class="login-col login-col__img">
      <img src="static_workspace/img/cat.jpg" alt="Timeout Cat" />
    </div>

    <div class="login-col login-col__form">
      <div class="login-col__form-content">
        <img src="static_workspace/img/timeout-logo.svg" alt="Timeout" />
        <a v-if="oauthToken" class="btn">Logado</a>
        <a href="/request-token" v-else class="btn">Log in with Twitter</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {
      oauthToken: null,
      oauthVerifier: null
    }
  },
  mounted: function() {
      var params = getUrlVars();
      this.oauthToken = params.oauth_token;
      this.oauthVerifier = params.oauth_verifier;

      if(this.oauthToken && this.oauthVerifier){
        $.get("/access-token?oauth_token="+this.oauthToken+"&oauth_verifier="+this.oauthVerifier).done(function(user) {
          console.log(user);
        });
      }
  },
  methods: {
    twitterLogin: () => {
      window.location.href = "";
    }
  }
}
</script>

