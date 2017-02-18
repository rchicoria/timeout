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
        <div class="news-container__entrie news-container__entrie-detail news-container__entrie-detail-tweet">

        </div>

        <div class="news-container__detail-options">
          <ul>
            <li>18/02/2017</li>
            <li>00:00</li>
            <li><a href="#0"><img src="static_workspace/img/arrow-left.svg" alt="Discard Entrie" /></a></li>
            <li><a href="#0"><img src="static_workspace/img/arrow-right.svg" alt="Discard Entrie" /></a></li>
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
  }
</script>
