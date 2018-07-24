import Posts from './components/posts.vue'
import Post from './components/post.vue'
import Frontpage from './components/frontpage.vue'
import Page from './components/page.vue'
import Category from './components/category.vue'
import Tag from './components/tag.vue'
import Error404 from './components/error.vue'

export default {
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
    { path: '/error', name: 'error', component: Error404 },
    { path: '/', name: 'frontpage', component: Frontpage },
    { path: '*', redirect: '/error' }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  }
}
