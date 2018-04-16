<template>
	<transition name="slide-fade">
		<div>
			<div v-if="loaded === true">
				<h2>{{ page.title.rendered }}</h2>
				<div v-html="page.content.rendered"></div>
			</div>
			<div v-if="page.page_children.length !== 0">
				<ul>
					<li v-for="child in page.page_children">
						<router-link :to="'/page/' + child.post_name">{{ child.post_title }}</router-link></li>
				</ul>
			</div>
			<gmap-map
				ref="gmap"
				:center="mapCenter"
				:zoom="14"
				:options="mapStyle"
				class="main-map"
			></gmap-map>
		</div>
	</transition>
</template>

<style>

</style>

<script>
const mapStyle = require('./maps/mapstyle.json');

export default {
	data () {
		return {
			page: {},
			loaded: false,
			mapCenter: { lat: 39.4751256, lng:-0.3831809 }, // Valencia
			mapStyle: { styles: mapStyle },
			pageTitle: '',
			kml: null
		};
	},

	mounted () {
		this.getPage();
	},

	methods: {
		getPage () {
			this.loaded = false;
			if(this.kml) this.kml.setMap(null);

			this.$http.get('wp/v2/pages', {
				params: { slug: this.$route.params.name }
			}).then((res) => {
				this.page = res.data[0];
				this.loaded = true;
				this.pageTitle = this.page.title.rendered;
				this.$store.commit('rtChangeTitle', this.pageTitle);

				if(this.page.custom_fields.hasOwnProperty('kml')) {
					this.getMap(this.page.custom_fields.kml[0]);
				}
			}).catch((res) => {
				console.log(`Something went wrong : ${ res }`);
			});
		},
		getMap (url) {
			this.hasMap = true;
			this.$refs.gmap.$mapCreated.then(() => {
				this.$refs.gmap.$deferredReadyPromise.then(() => {
					this.kml = new google.maps.KmlLayer({ url });
					this.kml.setMap(this.$refs.gmap.$mapObject);
				});
			});
		}
	},
	watch: {
		'$route': function (to, from) {
			// react to route changes...
			this.getPage();
		}
	}
};
</script>
