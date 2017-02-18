<template>
    <div class="news-container__entrie" v-bind:class="{ 'news-container__entrie-img': isImage, 'news-container__entrie-txt': isText }">
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
    </div>
</template>

<script>
  import { app, router } from '../main.js'

  export default {
    name: 'story',
    props: ['story'],
    data: function(){
        return {
            isImage: false,
            isText: false
        }
    },
    mounted: function(){
        this.$nextTick(function () {
            this.isImage = !this.story.text && this.story.image;
            this.isText = !this.story.image; 

            console.log(this.isImage);
            console.log(this.isText);
        });
    }
  }
</script>
