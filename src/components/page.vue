<template>
	<div :class="[{ 'page container': true, 'has-map': hasMap }, pageClass]">
		<div class="band"></div>
		<div v-if="loaded === true">
			<h2>{{ page.title.rendered }}</h2>
			<div v-html="page.content.rendered"></div>
			<div v-if="page.page_children" class="subcategories">
				<ul>
					<li v-for="child in page.page_children" :key="child.id" class="category">
						<router-link :to="'/page/' + child.post_name">{{ child.post_title }}</router-link></li>
				</ul>
			</div>
			<div v-if="page.parent" class="subcategories">
				<ul>
					<li v-for="sibling in page.page_siblings" :key="sibling.id" class="category">
						<router-link :to="'/page/' + sibling.post_name">{{ sibling.post_title }}</router-link></li>
				</ul>
			</div>
		</div>
		<div v-else>
				<page-loading />
		</div>
		<gmap-map
			ref="gmap"
			:center="mapCenter"
			:zoom="14"
			:options="mapStyle"
			class="map"
		></gmap-map>
	</div>
</template>

<script>
import PageLoading from './partials/page-loading.vue';
const mapStyle = require('./maps/mapstyle.json');

export default {
	components: {
		PageLoading
	},
	data () {
		return {
			page: {},
			loaded: false,
			hasMap: false,
			pageClass: '',
			mapCenter: { 
				lat: 39.4650884, 
				lng: -0.3711834 // Valencia
			},
			mapStyle: { 
				styles: mapStyle, 
				streetViewControl: false, 
				mapTypeControl: false, 
				fullscreenControl: false,
				scrollwheel: false
			},
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

				if(this.page.custom_fields.hasOwnProperty('class')) {
					this.pageClass = this.page.custom_fields.class[0];
				}

				if(this.page.custom_fields.hasOwnProperty('kml')) {
					this.getMap(this.page.custom_fields.kml[0]);
				} else {
					this.hasMap = false;
				}
			}).catch((res) => {
				console.log(`Something went wrong : ${ res }`);
			});
		},
		getMap (url) {
			this.hasMap = true;
			this.$refs.gmap.$mapCreated.then(() => {
				this.$refs.gmap.$deferredReadyPromise.then(() => {
					this.kml = new google.maps.KmlLayer({ url, preserveViewport: true });
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
