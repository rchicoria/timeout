<template>
  <div class="timeline-container">
    <div class="timeline-container__sidebar">
      <ul>
        <li><a href="/loginsuccess">Back</a></li>
        <li><a href="#" v-on:click="logout">Logout</a></li>
      </ul>
    </div>

    <div class="timeline-container__content">
      <div class="news-container">
        <!-- <story v-for="story in stories" v-bind:story="story"></story> -->

        <div class="news-container__entrie">
          <div class="news-container__col">
            <div class="news-container__col-img">
              <img src="https://pbs.twimg.com/media/C45bzmuUcAIPyze.jpg:large" alt="" />
            </div>
          </div>

          <div class="news-container__col">
            <div class="news-container__col-txt">
              <span class="twitter-handle">@CNN</span>
              <p>A political action group making anti-Trump robocalls is closely tied to a pro-Trump PAC</p>
            </div>
          </div>

          <div class="news-container__col-options">
            <ul>
              <li>18/02/2017</li>
              <li>00:00</li>
              <li><img src="static_workspace/img/discard.svg" alt="Discard Entrie" /></li>
            </ul>
          </div>
        </div>

        <div class="news-container__entrie news-container__entrie-txt">
          <div class="news-container__col">
            <div class="news-container__col-txt">
              <span class="twitter-handle">@Gizmodo</span>
              <p>The Star Wars canon has officially revealed the sad fate of Jar Jar Binks</p>
            </div>
          </div>
        </div>

        <div class="news-container__entrie">
          <div class="news-container__col">
            <div class="news-container__col-img">
              <img src="https://pbs.twimg.com/media/C45aSZ9VcAASjT7.jpg:large" alt="" />
            </div>
          </div>

          <div class="news-container__col">
            <div class="news-container__col-txt">
              <span class="twitter-handle">@Gizmodo</span>
              <p>The Star Wars canon has officially revealed the sad fate of Jar Jar Binks</p>
            </div>
          </div>
        </div>

        <div class="news-container__entrie">
          <div class="news-container__col">
            <div class="news-container__col-img">
              <img src="https://pbs.twimg.com/media/C45ygKaUcAAkZWI.jpg:large" alt="" />
            </div>
          </div>

          <div class="news-container__col">
            <div class="news-container__col-txt">
              <span class="twitter-handle">@speckyboy</span>
              <p>What is Atomic Design?</p>
            </div>
          </div>
        </div>

        <div class="news-container__entrie news-container__entrie-img">
          <div class="news-container__col">
            <div class="news-container__col-img">
              <img src="https://pbs.twimg.com/media/C40Omu6XAAUySns.jpg:large" alt="" />
            </div>
          </div>
        </div>
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
