<template>
  <ul>
    <li v-for="item in primaryMenu" v-if="item.type != 'custom'" :class="[item.classes, 'category']" :key="item.url">
      <router-link :to="{ name: 'page', params: { name: getUrlName(item.url) }}" class="category-button">
        <span class="category-vlc">VLC</span>
        <span class="category-title" v-html="item.title.replace(/\ i\ /gi, '<br /> i ')"></span>
        <span class="category-icon">
          <menu-icon :classes="item.classes" />
        </span>
      </router-link>
    </li>
    <li v-else :class="[item.classes, 'category']" :key="item.url">
      <router-link :to="item.url" class="category-button">
        <span class="category-vlc">VLC</span>
        <span class="category-title" v-html="item.title.replace(/\ i\ /gi, '<br /> i ')"></span>
        <span class="category-icon">
          <menu-icon :classes="item.classes" />
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script>
import MenuIcon from './menu-icon.vue'

export default {
  name: 'primary-menu',

  components: {
    MenuIcon
  },

  props: {
    primaryMenu: Array
  },

  methods: {
    getUrlName (url) {
      const array = url.split('/')
      // Deal with trailing slashes
      if (url.substring(url.length - 1) === '/') {
        return array[array.length - 2]
      }
      return array[array.length - 1]
    }
  }
}
</script>
