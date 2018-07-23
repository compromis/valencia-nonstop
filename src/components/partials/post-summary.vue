<template>
  <div class="post">
    <div class="band"></div>
    <div class="post-summary">
      <div class="post-thumbnail progressive full" v-if="!remote">
        <gmap-map
          v-if="post.custom_fields.venue"
          :center="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }"
          :zoom="16"
          :options="mapOptions"
          class="post-map">
          <GmapMarker :position="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }" />
        </gmap-map>
      </div>
      <div class="post-thumbnail progressive full" v-else-if="post.hasOwnProperty('featured_image_src') && post.featured_image_src['large'][0]" :style="'background-image: url(' + post.featured_image_src['large'][0] + ');'"></div>
      <div class="post-summary-content">
        <h2 class="post-title"><router-link :to="{ name: (!remote) ? 'event' : 'article', params: { name: post.slug, remote }}"><span v-html="post.title.rendered"></span></router-link> </h2>
        <div class="post-meta" v-if="remote">
          <span class="posted-on">
            <formatted-date class="date" :date="post.date" />
          </span>
        </div>

        <div class="post-fields" v-if="!remote">
          <ul>
            <li><i class="fal fa-calendar-alt fa-fw"></i> <formatted-date :date="post.custom_fields.date" /> a les {{ post.custom_fields.time }}</li>
            <li><i class="fal fa-map-marker-alt fa-fw"></i> {{ post.custom_fields.venue_text }}</li>
          </ul>
        </div>

        <div class="post-excerpt post-content" v-html="post.excerpt.rendered" v-if="remote"></div>

        <div class="post-read-more">
          <router-link :to="{ name: (!remote) ? 'event' : 'article', params: { name: post.slug, remote }}">+ Més info</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const mapStyle = require('../maps/events-mapstyle.json')

export default {
  name: 'post-summary',
  props: {
    post: Object,
    remote: Boolean
  },
  data () {
    return {
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
  }
}
</script>
