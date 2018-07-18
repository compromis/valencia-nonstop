import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { HTTP as axios } from './axios/axios'
import VueProgressiveImage from 'progressive-image/dist/vue'
import * as VueGoogleMaps from 'vue2-google-maps'

// Import all vue components
import Posts from './components/posts.vue'
import Post from './components/post.vue'
import Header from './components/theme-header.vue'
import Frontpage from './components/frontpage.vue'
import Footer from './components/theme-footer.vue'
import Page from './components/page.vue'
import Category from './components/category.vue'
import Tag from './components/tag.vue'

Vue.prototype.$http = axios

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueProgressiveImage, {
  removePreview: true
})
Vue.use(VueRouter)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDEC0TPaQ4ndq1QDQcyELcJ2IQagLNoyfo'
  }
})

Vue.config.debug = true
Vue.config.devTools = true

// Define route for vue app
// ref : http://router.vuejs.org/en/
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/noticies/:page(\\d+)?', name: 'articles', component: Posts, props: { remote: true } },
    { path: '/noticies/:name', name: 'article', component: Post, props: { remote: true } },
    { path: '/agenda/:page(\\d+)?', name: 'events', component: Posts, props: { remote: false } },
    { path: '/agenda/:name', name: 'event', component: Post, props: { remote: false } },
    { path: '/page/:name', name: 'page', component: Page },
    { path: '/page/:parent/:name', name: 'subpage', component: Page },
    { path: '/category/:name', name: 'cat', component: Category, props: { remote: true } },
    { path: '/tag/:name', name: 'tag', component: Tag, props: { remote: true } },
    { path: '/event-category/:name', name: 'event-cat', component: Category, props: { remote: false } },
    { path: '/event-tag/:name', name: 'event-tag', component: Tag, props: { remote: false } },
    { path: '/', name: 'frontpage', component: Frontpage }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  }
})

// Define vuex store
const store = new Vuex.Store({
  state: {
    title: ''
  },
  mutations: {
    rtChangeTitle (state, value) {
      // mutate state
      state.title = value
      document.title = (state.title ? state.title + ' - ' : '') + rtwp.site_name
    }
  }
})

// Register global components
Vue.component('theme-header', Header)
Vue.component('theme-footer', Footer)

// Create instance of main component
new Vue({
  store,
  router,
  template: `
    <div id="page" :class="[pageTemplate, 'hfeed site']">
      <theme-header></theme-header>
      <main class="content">
        <router-view></router-view>
      </main>
      <theme-footer></theme-footer>
    </div>
  `,
  data () {
    return {
      pageTemplate: ''
    }
  },
  watch: {
    '$route': function (to, from) {
      this.pageTemplate = to.name
    }
  },
  mounted () {
    this.pageTemplate = this.$route.name
  }
}).$mount('#app')
