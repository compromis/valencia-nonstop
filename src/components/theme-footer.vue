<template>
	<div>
		<gmap-map
			ref="map"
		  :center="mapCenter"
		  :zoom="14"
			:options="mapStyle"
			class="map map-background"
		></gmap-map>
		<div class="map-decorations">
			<div class="map-decoration map-bird"></div>
			<div class="map-decoration map-micalet"></div>
			<div class="map-decoration map-palmtree"></div>
		</div>
	</div>
</template>

<script>
const mapStyle = require('./maps/mapstyle.json');

export default {
	data() {
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
};
</script>
