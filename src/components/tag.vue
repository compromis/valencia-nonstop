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
import PostsLoading from './partials/posts-loading.vue';
import PostSummary from './partials/post-summary.vue';

export default {
  components: {
    PostsLoading,
    PostSummary
  },
  mounted: function() {
    if (this.$route.params.name) {
      this.getTagId(this.$route.params.name);
    }
  },
  data() {
    return {
      posts: {},
      loaded: false,
      pageTitle: '',
      totalCount: '',
      catName: ''
    };
  },
  props: {
    remote: Boolean
  },
  methods: {
    getPosts: function(tagId) {
      this.loaded = false;
      const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/posts' : '/wp-json/wp/v2/posts';
      this.$http.get(url, {
        params: { tags: tagId }
      })
      .then((res) => {
        this.posts = res.data;
        this.loaded = true;
        this.pageTitle = 'Etiqueta' + ' - ' + this.tagName;
        this.$store.commit('rtChangeTitle', this.pageTitle);
      })
      .catch((res) => {
        //console.log(`Something went wrong : ${ res }`);
      });
    },
    getTagId: function(name) {
      this.tagName = name;
      this.loaded = false;
      const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/tags/?slug=' : '/wp-json/wp/v2/tags/?slug=';
      this.$http.get(url + name)
      .then((res) => {
        res = res.data[0];
        this.totalCount = (res.data);
        this.getPosts(res.id);
      })
      .catch((res) => {
        //console.log(`Something went wrong : ${ res }`);
      });
    }
  }
};
</script>
