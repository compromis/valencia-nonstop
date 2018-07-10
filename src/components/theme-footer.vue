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
				<img class="bird" svg-inline src="../../images/icons/icon-bird-positive.svg" alt="Icona d'un pardal" />
			</div>
			<div class="map-decoration map-micalet">
				<img class="micalet" svg-inline src="../../images/icons/icon-micalet.svg" alt="Icona del micalet" />
			</div>
			<div class="map-decoration map-palmtree">
				<img class="palmtree" svg-inline src="../../images/icons/icon-palmtree.svg" alt="Icona d'una palmera" />
			</div>
			<div class="map-decoration map-wave">
				<img class="wave" svg-inline src="../../images/icons/icon-wave.svg" alt="Icona d'una ona" />
			</div>
		</div>
	</div>
</template>

<script>
const mapStyle = require('./maps/pages-mapstyle.json');

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
