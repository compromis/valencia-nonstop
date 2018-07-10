<template>
	<div :class="[{ 'page container': true, 'has-map': hasMap }, pageClass]">
		<div class="band"></div>
		<div v-if="loaded === true">
			<span class="page-parent" v-if="page.parent">
			<router-link :to="'/page/' + page.parent_info.slug">{{ page.parent_info.title }}</router-link></span>
			<h2 class="page-title" v-html="page.title.rendered"></h2>
			<div class="page-content-wrapper">
				<div v-html="page.content.rendered" class="page-content"></div>
				<div v-if="page.parent" class="subcategories siblings">
					<ul>
						<li v-for="sibling in page.page_siblings" :key="sibling.id" :class="['category', 'category-' + sibling.post_name]">
							<router-link :to="'/page/' + page.parent_info.slug + '/' + sibling.post_name" class="category-button">{{ sibling.post_title }}</router-link></li>
					</ul>
				</div>
				<div v-if="page.page_children.length > 0" class="subcategories children">
					<ul>
						<li v-for="child in page.page_children" :key="child.id" :class="['category', 'category-' + child.post_name]">
							<router-link :to="'/page/' + page.slug + '/' + child.post_name" class="category-button">{{ child.post_title }}</router-link></li>
					</ul>
				</div>
			</div>
		</div>
		<div v-else>
				<page-loading />
		</div>
		<gmap-map
			ref="gmap"
			:center="mapCenter"
			:zoom="14"
			:options="mapOptions"
			:class="{ 'map': true, 'map-background': !hasMap }"
		></gmap-map>
		<div class="map-decorations">
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
import PageLoading from './partials/page-loading.vue';
import * as VueGoogleMaps from 'vue2-google-maps'
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
			mapOptions: { 
				styles: mapStyle, 
				streetViewControl: false, 
				mapTypeControl: false, 
				fullscreenControl: false,
				scrollwheel: false,
				disableDefaultUI: false,
				draggable: true,
				gestureHandling: 'greedy'
			},
			pageTitle: '',
			kml: [],
			children: null
		};
	},

	mounted () {
		this.getPage();

		VueGoogleMaps.loaded.then(() => {
			this.mapOptions.zoomControlOptions = {
				position: google.maps.ControlPosition.RIGHT_CENTER
			};
		});
	},

	methods: {
		getPage () {
			this.loaded = false;
			if(this.kml.length !== 0){
				this.kml.forEach((element) => {
					element.setMap(null);
				});
			}

			this.$http.get('/wp-json/wp/v2/pages', {
				params: { slug: this.$route.params.name }
			}).then((res) => {
				this.page = res.data[0];
				this.loaded = true;
				this.pageTitle = this.page.title.rendered;
				this.$store.commit('rtChangeTitle', this.pageTitle);
				if(this.page.parent) {
					this.pageClass = 'page-' + this.page.slug + ' page-' + this.page.parent_info.slug + ' category-' + this.page.parent_info.slug;
				} else {
					this.pageClass = 'page-' + this.page.slug + ' category-' + this.page.slug;
				}

				if(this.page.custom_fields.hasOwnProperty('kml')) {
					this.getMap(this.page.custom_fields.kml[0]);
				} else {
					this.hasMap = false;
					this.mapOptions.disableDefaultUI = true;
					this.mapOptions.draggable = false;
				}
			}).catch((res) => {
				console.log(`Something went wrong : ${ res }`);
			});
		},
		getMap (url) {
			this.hasMap = true;
			this.mapOptions.disableDefaultUI = false;
			this.mapOptions.draggable = true;

			this.$refs.gmap.$mapCreated.then(() => {
				this.$refs.gmap.$deferredReadyPromise.then(() => {
					const maps = url.split(',');
					maps.forEach((kmlAddress) => {
						this.kml.push(new google.maps.KmlLayer({ 
							url: kmlAddress, 
							preserveViewport: true,
							map: this.$refs.gmap.$mapObject
						}));
					});
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
