<template>
	<div>
		<gmap-map
			ref="map"
		  :center="{ lat: 39.4650884, lng: -0.3711834 }"
		  :zoom="14"
			:options="mapStyle"
			class="map"
		></gmap-map>
	</div>
</template>

<style>

</style>

<script>
const mapStyle = require('./maps/mapstyle.json');

export default {
	name: 'frontpage',

	data() {
		return {
			map: null,
			mapLoaded: false,
			mapStyle: { 
				styles: mapStyle, 
				streetViewControl: false, 
				mapTypeControl: false, 
				fullscreenControl: false,
				scrollwheel: false
			}
		}
	},

	mounted() {
		this.$refs.map.$mapCreated.then(() => {
			this.mapLoaded = true;
			this.$refs.map.$deferredReadyPromise.then(() => {
				const options = {
					url: "http://compromis.net/Test.kmz"
				};

				this.kml = new google.maps.KmlLayer(options);
				this.kml.setMap(this.$refs.map.$mapObject);
			});
		});
	}
};
</script>
