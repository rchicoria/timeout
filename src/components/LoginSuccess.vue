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
          <li><a href="#0" class="btn">2 min</a></li>
          <li><a href="#0" class="btn">5 min</a></li>
          <li><a href="#0" class="btn">10 min</a></li>
          <li><a href="#0" class="btn">15 min</a></li>
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
    this.name = this.$root.$data.user.name;
    this.screen_name = this.$root.$data.user.screen_name;
    this.image = this.$root.$data.user.profile_image_url;
  }
}
</script>
