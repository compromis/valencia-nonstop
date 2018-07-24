<template>
  <div class="post">
    <div class="post-container container post-full">
      <div class="band"></div>
      <div v-if="loaded === true">
        <div class="post-meta">
          <router-link v-if="remote" to="/noticies"><span class="fal fa-newspaper fa-fw"></span> Notícies</router-link>
          <router-link v-else to="/agenda"><span class="fal fa-calendar-alt fa-fw"></span> Agenda</router-link>
          <formatted-date class="date" v-if="remote" :date="post.date" />
        </div>
        <h2 class="post-title" v-html="post.title.rendered"></h2>

        <div class="post-image" v-if="post.hasOwnProperty('featured_image_src') && post.featured_image_src['large'][0]">
          <img
            :data-srcset="post.featured_image_src['srcset']"
            :src="post.featured_image_src['full'][0]"
          />
        </div>

        <div class="post-image" v-if="!remote">
          <gmap-map
            v-if="post.custom_fields.venue"
            :center="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }"
            :zoom="16"
            :options="mapOptions"
            class="post-map">
            <GmapMarker :position="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }" />
          </gmap-map>
        </div>

        <div class="post-fields" v-if="!remote">
          <ul>
            <li><i class="fal fa-calendar-alt fa-fw"></i> <formatted-date :date="post.custom_fields.date" /> a les {{ post.custom_fields.time }}</li>
            <li><i class="fal fa-map-marker-alt fa-fw"></i> {{ post.custom_fields.venue_text }}</li>
            <li v-if="post.custom_fields.link"><i class="fal fa-link fa-fw"></i> <a :href="post.custom_fields.link" target="_blank" rel="noopener">{{ post.custom_fields.link }}</a></li>
            <li v-if="post.custom_fields.speakers"><i class="fal fa-users fa-fw"></i> <div v-html="post.custom_fields.speakers" class="post-speakers"></div></li>
          </ul>
        </div>

        <div class="post-content" v-html="post.content.rendered"></div>
        <div class="cat-list">
          <router-link v-for="x in post.cat_name" :to="{ name: (remote) ? 'cat' : 'event-cat', params: { name: x.slug } }" :key="x.id">{{ x.name }}</router-link>
        </div>

        <div class="tag-list">
          <router-link v-for="x in post.tag_name" :to="{ name: (remote) ? 'tag' : 'event-tag', params: { name: x.slug } }" :key="x.id">{{ x.name }}</router-link>
        </div>
      </div>
      <div v-else>
          <page-loading />
      </div>
    </div>
  </div>
</template>

<script>
import PageLoading from './partials/page-loading.vue'
const mapStyle = require('./maps/events-mapstyle.json')

export default {
  components: {
    PageLoading
  },
  mounted: function () {
    this.getPost()
  },
  props: {
    remote: Boolean
  },
  data () {
    return {
      post: {},
      loaded: false,
      pageTitle: '',
      mapOptions: {
        styles: mapStyle,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        scrollwheel: false,
        disableDefaultUI: true,
        draggable: false
      }
    }
  },
  methods: {
    getPost: function () {
      const baseUrl = (this.remote) ? process.env.VUE_APP_REMOTE_WPJSON : process.env.VUE_APP_WPJSON
      this.$http.get(baseUrl + '/wp/v2/posts', {
        params: { slug: this.$route.params.name }
      })
        .then((res) => {
          if (!res.data.length) {
            return this.$router.push('/error')
          }

          this.post = res.data[0]
          this.loaded = true
          this.pageTitle = this.post.title.rendered
          EventBus.$emit('title-changed', this.pageTitle)
        })
        .catch((res) => {
        // console.log(`Something went wrong : ${res}`);
        })
    }
  }
}
</script>
