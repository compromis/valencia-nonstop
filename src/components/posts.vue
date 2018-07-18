<template>
  <div class="posts">
    <div v-if="loaded === true" >
      <div v-for="post in posts" :key="post.slug" class="post-container container">
        <post-summary :post="post" :remote="remote" />
      </div>
      <nav aria-label="Navegació">
        <ul class="pagination">
          <li><a href="#" v-if="showPrev" v-on:click.prevent="rtShowPrev()" class="btn btn-outline-primary btn-lg">&LT; Anterior</a></li>
          <li><a href="#" v-if="showNext" v-on:click.prevent="rtShowNext()" class="btn btn-outline-primary btn-lg">Següent &GT;</a></li>
        </ul>
      </nav>
    </div>
    <div v-else>
        <posts-loading />
    </div>
  </div>
</template>

<script>
import PostsLoading from './partials/posts-loading.vue'
import PostSummary from './partials/post-summary.vue'

export default {
  components: {
    PostsLoading,
    PostSummary
  },
  mounted () {
    if (this.$route.params.page) {
      this.getPosts(this.$route.params.page)
    } else {
      this.getPosts()
    }
  },
  props: {
    remote: Boolean
  },
  data () {
    return {
      posts: {},
      currentPage: '',
      prevPage: '',
      nextPage: '',
      showNext: true,
      showPrev: true,
      postCollection: '',
      postPerPage: '10',
      totalPages: '',
      loaded: false,
      pageTitle: ''
    }
  },

  methods: {
    getPosts (pageNumber = 1) {
      const baseUrl = (this.remote) ? process.env.VUE_APP_REMOTE_WPJSON : process.env.VUE_APP_WPJSON
      this.loaded = false
      this.$http.get(baseUrl + '/wp/v2/posts', {
        params: { per_page: this.postPerPage, page: pageNumber }
      })
        .then((res) => {
          this.posts = res.data
          this.totalPages = res.headers['x-wp-totalpages']
          if (pageNumber <= parseInt(this.totalPages)) {
            this.currentPage = parseInt(pageNumber)
            this.showPrev = pageNumber !== 1
            this.showNext = pageNumber !== this.totalPages
          } else {
            this.$router.push({ 'name': 'posts' })
            this.currentPage = 1
            this.showPrev = false
            this.showNext = true
          }
          this.loaded = true
          this.pageTitle = (this.remote) ? 'Notícies' : 'Agenda'
          EventBus.$emit('title-changed', this.pageTitle)
        })
        .catch((res) => {
        // console.log(`Something went wrong : ${ res }`);
        })
    },
    rtShowNext (event) {
      if (this.currentPage < this.totalPages) {
        this.currentPage = this.currentPage + 1
        this.$router.push({ 'name': 'articles', params: { 'page': this.currentPage } })
      }
    },
    rtShowPrev (event) {
      if (this.currentPage !== 1) {
        this.currentPage = this.currentPage - 1
        this.$router.push({ 'name': 'articles', params: { 'page': this.currentPage } })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getPosts(this.$route.params.page)
    }
  }
}
</script>
