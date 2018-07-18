<template>
  <div id="page" :class="[pageTemplate, 'hfeed site']">
    <theme-header></theme-header>
    <main class="content">
      <router-view></router-view>
    </main>
    <theme-footer></theme-footer>
  </div>
</template>

<script>
import Header from './theme-header.vue'
import Footer from './theme-footer.vue'

export default {
  components: {
    'theme-header': Header,
    'theme-footer': Footer
  },
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

    EventBus.$on('title-changed', (title) => {
      document.title = title + ' | ' + process.env.VUE_APP_NAME
    })
  }
}
</script>
