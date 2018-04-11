<template>
	<div>dsd
		<gmap-map
			ref="map"
		  :center="{lat: 39.4751256, lng:-0.3831809}"
		  :zoom="14"
			:options="mapStyle"
			class="main-map"
		></gmap-map>
	</div>
</template>

<style>

</style>

<script>
const mapStyle = require('./maps/mapstyle.json');

export default {
	name: 'home',

	data() {
		return {
			map: null,
			mapLoaded: false,
			mapStyle: { styles: mapStyle }
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
