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

      <div class="logout">
        <a href="#" v-on:click="logout">Logout</a>
      </div>
    </div>
</template>

<script>
import { app, router } from '../main.js'

function parseStories(tweets) {
  tweets = _.sortBy(tweets, 'retweet_count').reverse()
  var stories = tweets.map((tweet) => {
    var story = {};
    story.id = tweet.id;
    var textArray = tweet.text.split(" ");
    var filteredTextArray = _.filter(textArray, (val)=>{
      return val.indexOf("http://") == -1 && val.indexOf("https://") == -1;
    });
    story.text = filteredTextArray.join(" ");
    story.user = tweet.user.screen_name;
    if(tweet.entities.media && tweet.entities.media.length > 0){
      story.image = tweet.entities.media[0].media_url;
    }
    if(tweet.entities.urls && tweet.entities.urls.length > 0){
      story.url = tweet.entities.urls[0].expanded_url;
    };
    story.created_at = moment(tweet.created_at);

    return story;
  })

  return stories;
}

var pointer=0;
var time=0;
var timeline = [];

function filterTen(stories, subset, maxTime){
  pointer += 10;
  var requests = _.reduce(subset, (col, story)=>{
    if(story.url){
      col[story.id] = function(callback){
        $.get("/readability?url="+story.url).done(function(data){
          callback(null, data);
        });
      }
      return col;
    } else {
      return col;
    }
  }, {})

  async.parallel(requests, (err, results)=>{
    for(var i=0; i<subset.length; i++){
      var story = subset[i]; 
      var length = story.text.split(" ").length;
      if(results[story.id]){
        length = results[story.id].split(" ").length;
      }

      var timeNext = time+length*60/200;
      if(timeNext <= maxTime){
        timeline.push(story);
        time = timeNext;
      }

      if(maxTime-time < 15){
        app.$emit('set-stories', timeline);
        router.push({ name: 'timeline' })
        return;
      }
    }
    var nextStories = stories.slice(pointer, pointer+10);
    filterTen(stories, nextStories, maxTime);
  });
}

function filterStories(stories, maxTime) {
  var nextStories = stories.slice(pointer, pointer+10);
  filterTen(stories, nextStories, maxTime);
}

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
        var stories = parseStories(data);
        filterStories(stories, minutes*60);
      }).fail(function(){
        localStorage.clear();
        window.location = "/";
      });
    },
    logout: () => {
      localStorage.clear();
      window.location = "/";
    }
  }
}
</script>
