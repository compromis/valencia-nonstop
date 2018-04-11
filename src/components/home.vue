<template>
	<div>dsd
		<gmap-map
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
			mapStyle: { styles: mapStyle }
		}
	}
};
</script>
