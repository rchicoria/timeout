<template>
  <div id="login">
    <div class="login-col login-col__img">
      <img src="static_workspace/img/cat.jpg" alt="Timeout Cat" />
    </div>

    <div class="login-col login-col__form">
      <div class="login-col__form-content">
        <img src="static_workspace/img/timeout-logo.svg" alt="Timeout" />

        <div class="user-avatar">
          <img v-bind:src="image" alt="Avatar Image" />
        </div>

        <div class="twitter-handle">
          <span class="">{{ name }}</span>
          <span class="">@{{ screen_name }}</span>
        </div>

        <ul class="time">
          <li><a href="#" v-on:click="getTimeline(2)" class="btn">2 min</a></li>
          <li><a href="#" v-on:click="getTimeline(5)" class="btn">5 min</a></li>
          <li><a href="#" v-on:click="getTimeline(10)" class="btn">10 min</a></li>
          <li><a href="#" v-on:click="getTimeline(15)" class="btn">15 min</a></li>
        </ul>
      </div>
    </div>
</template>

<script>
import { app, router } from '../main.js'
export default {
  name: 'loginsuccess',
  data: function () {
    return {
      name: null,
      screen_name: null,
      image: null
    }
  },
  mounted: function() {
    this.$nextTick(function () {
      if(!this.$root.$data.user){
        localStorage.clear();
        window.location = "/"
      } else {
        this.name = this.$root.$data.user.name;
        this.screen_name = this.$root.$data.user.screen_name;
        this.image = this.$root.$data.user.profile_image_url;
      }
    });
  },
  methods: {
    getTimeline: (minutes) => {
      var accessToken = app.$data.accessToken;
      var accessSecret = app.$data.accessSecret;
      $.get("/tweets?access_token="+accessToken+"&access_secret="+accessSecret).done(function(data) {
        console.log(_.sortBy(data, 'retweet_count').reverse());
      }).fail(function(){
        localStorage.clear();
        window.location = "/";
      });
    }
  }
}
</script>
