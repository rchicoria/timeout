<template>
  <div id="login">
    <div class="login-col login-col__img">
      <img src="static_workspace/img/cat.jpg" alt="Timeout Cat" />
    </div>

    <div class="login-col login-col__form">
      <div class="login-col__form-content">
        <img src="static_workspace/img/timeout-logo.svg" alt="Timeout" />

        <div class="user-avatar">
          <img src="static_workspace/img/avatar.jpg" alt="Avatar Image" />
        </div>

        <div class="twitter-handle">
          <span class="">John Doe</span>
          <span class="">@johndoe</span>
        </div>

        <ul class="time">
          <li><a href="#/timeline" class="btn">2 min</a></li>
          <li><a href="#/timeline" class="btn">5 min</a></li>
          <li><a href="#/timeline" class="btn">10 min</a></li>
          <li><a href="#/timeline" class="btn">15 min</a></li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'loginsuccess'
}
</script>
