// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import Codebird from 'codebird'
import App from './App.vue'
import Login from './components/Login.vue'
import LoginSuccess from './components/LoginSuccess.vue'
import Timeline from './components/Timeline.vue'
import Story from './components/Story.vue'

Vue.use(VueRouter)

Vue.component('story', Story)

window.cb = new Codebird;
window.cb.setConsumerKey("CydX9EBF2uwLcxjFHA2BEQ0CD", "Z3NsDWLMkbnMHfEt85bkbthcUGyWG7dx9a3rQvFafsyKkip2Ev");


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/loginsuccess', name: 'loginsuccess', component: LoginSuccess },
    { path: '/timeline', name: 'timeline', component: Timeline },
  ]
})

var app = new Vue({ // eslint-disable-line no-new
  router,
  el: '#app',
  render: (h) => h(App),
  components: {
    'story': Story
  },
  method: {
    
  },
  data: {
    user: (() => {if(localStorage.getItem("user")) {return JSON.parse(localStorage.getItem("user"))} else { return undefined }})(),
    accessToken: localStorage.getItem("access_token"),
    accessSecret: localStorage.getItem("access_secret"),
    stories: []
  }
})

app.$on('set-user', (user, accessToken, accessSecret) => {
  app.user = user;
  app.accessToken = accessToken;
  app.accessSecret = accessSecret;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("access_secret", accessSecret);
});

app.$on('set-stories', (stories) => {
  app.stories = stories;
});

export { app, router }