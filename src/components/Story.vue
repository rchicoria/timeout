<template>
    <div class="news-container__entrie" v-on:click="goToStory(index)" v-bind:class="{ 'news-container__entrie-img': isImage, 'news-container__entrie-txt': isText }">
        <div class="news-container__col" v-if="story.image">
        <div class="news-container__col-img">
            <img v-bind:src="story.image" alt="" />
        </div>
        </div>

        <div class="news-container__col"  v-if="story.text">
        <div class="news-container__col-txt">
            <span class="twitter-handle">@{{ story.user }}</span>
            <p>{{ story.text }}</p>
        </div>
        </div>

        <div class="news-container__col-options">
        <ul>
            <li>{{ date }}</li>
            <li>{{ time }}</li>
            <!--<li><img src="static_workspace/img/discard.svg" alt="Discard Entrie" /></li>-->
        </ul>
        </div>
    </div>
</template>

<script>
  import { app, router } from '../main.js'

  export default {
    name: 'story',
    props: ['story', 'index'],
    data: function(){
        return {
            isImage: false,
            isText: false,
            date: null,
            time: null
        }
    },
    methods: {
      goToStory: (index) => {
        console.log(index);
        router.push({ name: 'storydetail', params: {index: index} })
      }
    },
    mounted: function(){
        this.$nextTick(function () {
            this.isImage = !this.story.text && this.story.image;
            this.isText = !this.story.image;
            this.date = this.story.createdAt.format("DD/MM/YYYY");
            this.time = this.story.createdAt.format("HH:mm");
        });
    }
  }
</script>
