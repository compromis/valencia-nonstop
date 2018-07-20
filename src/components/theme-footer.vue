<template>
  <div>
    <gmap-map
      ref="map"
      :center="mapCenter"
      :zoom="14"
      :options="mapStyle"
      class="map map-background map-default"
    ></gmap-map>
    <div class="map-decorations map-default">
      <div class="map-decoration map-bird">
        <svg-icon icon="bird" />
      </div>
      <div class="map-decoration map-micalet">
        <svg-icon icon="micalet" />
      </div>
      <div class="map-decoration map-palmtree">
        <svg-icon icon="palmtree" />
      </div>
      <div class="map-decoration map-wave">
        <svg-icon icon="wave" />
      </div>
    </div>
  </div>
</template>

<script>
const mapStyle = require('./maps/pages-mapstyle.json')

export default {
  name: 'theme-footer',
  data () {
    return {
      mapCenter: {
        lat: 39.4650884,
        lng: -0.3711834 // Valencia
      },
      mapStyle: {
        styles: mapStyle,
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: false
      }
    }
  }
}
</script>
