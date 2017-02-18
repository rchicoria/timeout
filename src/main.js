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

Vue.use(VueRouter)

window.cb = new Codebird;
window.cb.setConsumerKey("CydX9EBF2uwLcxjFHA2BEQ0CD", "Z3NsDWLMkbnMHfEt85bkbthcUGyWG7dx9a3rQvFafsyKkip2Ev");


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Login },
    { path: '/loginsuccess', name: 'loginsuccess', component: LoginSuccess },
    { path: '/timeline', component: Timeline },
  ]
})

var app = new Vue({ // eslint-disable-line no-new
  router,
  el: '#app',
  render: (h) => h(App),
  method: {
    
  },
  data: {
    user: {}
  }
})

app.$on('set-user', (user) => {
  app.user = user
});

export { app, router }