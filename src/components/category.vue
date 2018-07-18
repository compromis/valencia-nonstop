<template>
  <div class="posts">
    <div v-if="loaded === true" >
      <div v-for="post in posts" :key="post.slug" class="post-container container">
        <post-summary :post="post" :remote="remote" />
      </div>
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
  mounted: function () {
    if (this.$route.params.name) {
      this.getCatId(this.$route.params.name)
    }
  },
  props: {
    remote: Boolean
  },
  data () {
    return {
      posts: {},
      loaded: false,
      pageTitle: '',
      totalCount: '',
      catName: ''
    }
  },

  methods: {
    getPosts: function (catId) {
      this.loaded = false
      const baseUrl = (this.remote) ? process.env.VUE_APP_REMOTE_WPJSON : process.env.VUE_APP_WPJSON
      this.$http.get(baseUrl + '/wp/v2/posts', {
        params: { categories: catId }
      })
        .then((res) => {
          this.posts = res.data
          this.loaded = true
          this.pageTitle = 'Categoria' + ' - ' + this.catName
          EventBus.$emit('title-changed', this.pageTitle)
        })
        .catch((res) => {
        // console.log(`Something went wrong : ${ res }`);
        })
    },
    getCatId: function (name) {
      this.catName = name
      this.loaded = false
      const baseUrl = (this.remote) ? process.env.VUE_APP_REMOTE_WPJSON : process.env.VUE_APP_WPJSON
      this.$http.get(baseUrl + '/wp/v2/categories/?slug=' + name)
        .then((res) => {
          res = res.data[0]
          this.totalCount = (res.data)
          this.getPosts(res.id)
        })
        .catch((res) => {
        // console.log(`Something went wrong : ${ res }`);
        })
    }
  }
}
</script>
