<template>
  <div>
    <div class="brand">
      <transition name="fade">
        <div class="brand-share" v-show="show_share_buttons">
          <share-buttons />
        </div>
      </transition>
      <div class="brand-logo">
        <a href="https://compromis.net" target="_blank" rel="noopener">
          <img src="https://compromis.net/wp-content/themes/Compromis/images/logo-compromis-retina.png" alt="Compromís" />
        </a>
      </div>
    </div>

    <top-nav v-if="$route.name != 'frontpage'" :secondary-menu="secondary_menu" />

    <nav class="sidebar">
      <top-nav v-if="$route.name == 'frontpage'" :secondary-menu="secondary_menu" />
      <div class="menu">
        <div class="secondary-logo d-lg-none"></div>
        <primary-menu :primary-menu="primary_menu" v-if="!loading" />
        <menu-loading v-else />
      </div>
    </nav>
  </div>
</template>

<script>
import ShareButtons from './partials/share-buttons.vue'
import TopNav from './partials/top-nav.vue'
import PrimaryMenu from './partials/primary-menu.vue'
import MenuLoading from './partials/menu-loading.vue'

export default {
  name: 'theme-header',
  components: {
    ShareButtons,
    TopNav,
    PrimaryMenu,
    MenuLoading
  },
  mounted: function () {
    this.getMenu('primary-menu')
    this.getMenu('secondary-menu')
  },
  data () {
    return {
      loading: true,
      primary_menu: [],
      secondary_menu: [],
      site_name: process.env.VUE_APP_NAME,
      show_share_buttons: true
    }
  },
  methods: {
    getMenu (menuLocation) {
      this.$http.get(process.env.VUE_APP_WPJSON + '/wp-api-menus/v2/menu-locations/' + menuLocation)
        .then((res) => {
          if (menuLocation === 'primary-menu') {
            this.primary_menu = res.data
          } else {
            this.secondary_menu = res.data
          }

          this.loading = false
        })
        .catch((res) => {
          // console.log(`Something went wrong : ${ res }`);
        })
    },

    getUrlName (url) {
      const array = url.split('/')
      // Deal with trailing slashes
      if (url.substring(url.length - 1) === '/') {
        return array[array.length - 2]
      }
      return array[array.length - 1]
    },

    handleScroll () {
      this.show_share_buttons = window.scrollY < 50
    }
  },
  watch: {
    '$route': function () {
      setTimeout(() => {
        const activeLink = document.querySelector('.menu .router-link-active')
        const menu = document.getElementsByClassName('menu')[0]
        const sidebar = document.getElementsByClassName('sidebar')[0]

        if (activeLink) {
          if (activeLink.offsetTop >= menu.offsetHeight) menu.scrollTop = activeLink.offsetTop - 15
          sidebar.scrollLeft = activeLink.offsetLeft - ((window.innerWidth - activeLink.offsetWidth) / 2)
        }
      }, 200)
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
