<template>
  <div class="timeline-container">
    <div class="timeline-container__sidebar">
      <ul>
        <li><a href="/loginsuccess">2 min</a></li>
        <li><a href="#" v-on:click="logout">Logout</a></li>
      </ul>
    </div>

    <div class="timeline-container__content">
      <div class="news-container">
        <story v-for="(story, index) in stories" v-bind:index="index" v-bind:story="story"></story>
      </div>
    </div>
  </div>
</template>

<script>
  import { app, router } from '../main.js';

  export default {
    name: 'timeline',
    data: function () {
      return {
        stories: []
      }
    },
    methods: {
      logout: () => {
        localStorage.clear();
        window.location = "/";
      }
    },
    mounted: function() {
      this.$nextTick(function () {
        if(this.$root.$data.stories.length){
          this.stories = this.$root.$data.stories;
        } else {
          router.push({ name: 'login' })
        }
      });
    }
  }
</script>
