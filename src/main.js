import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { HTTP as axios } from './axios/axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import './sass/style.scss'

// Vue components
import App from './components/app.vue'
import FormattedDate from './components/partials/formatted-date.vue'
import SvgIcon from './components/partials/svg-icon.vue'

Vue.prototype.$http = axios

Vue.use(VueRouter)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API
  }
})

// Routes
const router = new VueRouter(routes)

// Event Bus
window.EventBus = new Vue()

// Global components
Vue.component('formatted-date', FormattedDate)
Vue.component('svg-icon', SvgIcon)

// Create instance of main component
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
