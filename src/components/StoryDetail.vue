<template>
  <div class="timeline-container timeline-container__detail">
    <div class="timeline-container__sidebar">
      <ul>
        <li><a href="/loginsuccess">2 min</a></li>
        <li><a href="/timeline">Back</a></li>
        <li><a href="#" v-on:click="logout">Logout</a></li>
      </ul>
    </div>

    <div class="timeline-container__content">
      <div class="news-container">
        <div v-if="hasContent" class="news-container__entrie news-container__entrie-detail">
          <div v-html="text"></div>
        </div>
         <div v-else class="news-container__entrie news-container__entrie-detail news-container__entrie-detail-tweet">
          <img v-if="image" v-bind:src="image" />
          <span class="twitter-handle">@{{ user }}</span>
          <p>{{ text }}</p>
        </div>

        <div class="news-container__detail-options">
          <ul>
            <li>{{ date }}</li>
            <li>{{ time }}</li>
            <li v-bind:class="{'disabled': !hasPrev}"><a href="#" v-on:click="goToPrevTweet" ><img src="static_workspace/img/arrow-left.svg" alt="Discard Entrie" /></a></li>
            <li v-bind:class="{'disabled': !hasNext}"><a href="#" v-on:click="goToNextTweet"><img src="static_workspace/img/arrow-right.svg" alt="Discard Entrie" /></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { app, router } from '../main.js'

  export default {
    name: 'story-detail',
    data: function(){
      return {
        index: null,
        story: null,
        text: null,
        image: null,
        handler: null,
        hasContent: null,
        user: null,
        date: null,
        time: null,
        hasPrev: null,
        hasNext: null
      }
    },
    methods: {
      goToNextTweet(e) {
         e.preventDefault();
         if(this.hasNext){
          router.push({ name: 'storydetail', query: {index: this.index+1} });
          this.index+=1;
         }
      },
      goToPrevTweet(e) {
        e.preventDefault();
        if(this.hasPrev){
          router.push({ name: 'storydetail', query: {index: this.index-1} });
          this.index-=1;
        }
      },
      logout: () => {
        localStorage.clear();
        window.location = "/";
      }
    },
    watch: {
      index: {
        handler (val, oldVal) {
          console.log(val);
          console.log(this.$root.$data.stories);
          var story = this.$root.$data.stories[val];
          if(story.content){
            this.hasContent = true;
            this.text = story.content;
          } else {
            this.hasContent = false;
            this.text = story.text;
            this.image = story.image;
            this.user = story.user;
          }
          var createdAt = moment(story.createdAt);
          this.date = createdAt.format("DD/MM/YYYY");
          this.time = createdAt.format("HH:mm");
          this.hasNext = this.index < this.$root.$data.stories.length-1;
          this.hasPrev = this.index > 0;
        },
        deep: true
      }
    },
    mounted: function(){
        this.$nextTick(function () {
            this.index = parseInt(getUrlVars().index);
        });
    }
  }
</script>
