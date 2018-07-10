<template>
	<div class="post">
		<div v-if="loaded === 'true'">
			<div class="post-container container post-full" >
				<div class="band"></div>
				<h2 class="post-title" v-html="post.title.rendered"></h2>
				<div class="post-image progressive full" v-if="post.hasOwnProperty('featured_image_src') && post.featured_image_src['full'][0]">
					<img class="lazy"
						v-progressive="post.featured_image_src['full'][0]" 
						:data-srcset="post.featured_image_src['srcset']" 
						:src="post.featured_image_src['full'][0]" 
					/>
				</div>

				<div class="post-thumbnail" v-if="!remote">
					<gmap-map
						v-if="post.custom_fields.venue"
						:center="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }"
						:zoom="16"
						:options="mapOptions"
						class="post-map">
						<GmapMarker :position="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }" />
					</gmap-map>
				</div>

				<div class="post-fields" v-if="!remote">
					<ul>
						<li><i class="fal fa-calendar-alt fa-fw"></i> <span v-text="formatDate(post.custom_fields.date)"></span> a les {{ post.custom_fields.time }}</li>
						<li><i class="fal fa-map-marker-alt fa-fw"></i> {{ post.custom_fields.venue_text }}</li>
						<li v-if="post.custom_fields.link"><i class="fal fa-link fa-fw"></i> <a :href="post.custom_fields.link" target="_blank" rel="noopener">{{ post.custom_fields.link }}</a></li>
						<li v-if="post.custom_fields.speakers" class="d-flex"><i class="fal fa-users fa-fw"></i> <div v-html="post.custom_fields.speakers" class="post-speakers"></div></li>
					</ul>
				</div>

				<div class="post-content" v-html="post.content.rendered"></div>
				<div class="cat-list">
					<router-link v-for="x in post.cat_name" :to="{ name: (remote) ? 'cat' : 'event-cat', params: { name: x.slug } }" :key="x.id">{{ x.name }}</router-link>
				</div>

				<div class="tag-list">
					<router-link v-for="x in post.tag_name" :to="{ name: (remote) ? 'tag' : 'event-tag', params: { name: x.slug } }" :key="x.id">{{ x.name }}</router-link>
				</div>
			</div>
		</div>
		<div v-else>
				<page-loading />
		</div>
	</div>
</template>

<script>
import PageLoading from './partials/page-loading.vue';
import * as VueGoogleMaps from 'vue2-google-maps';
const mapStyle = require('./maps/events-mapstyle.json');

export default {
	component: {
		PageLoading
	},
	mounted: function() {
		this.getPost();
	},
	props: {
		remote: Boolean
	},
	data() {
		return {
			base_path: rtwp.base_path,
			post: {},
			loaded: 'false',
			pageTitle: '',
			mapOptions: {
				styles: mapStyle,
				streetViewControl: false, 
				mapTypeControl: false, 
				fullscreenControl: false,
				scrollwheel: false,
				disableDefaultUI: true,
				draggable: false,
			}
		};
	},
	methods: {
		getPost: function() {
			const vm = this;
			const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/posts' : '/wp-json/wp/v2/posts';
			vm.$http.get( url, {
				params: { slug: vm.$route.params.name }
			} )
			.then( ( res ) => {
				vm.post = res.data[ 0 ];
				vm.loaded = 'true';
				vm.pageTitle = vm.post.title.rendered;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${res}` );
			} );
		},
		formatDate( value ) {
			if ( value ) {
				const date = new Date( value );
				const monthNames = [ "gener", "febrer", "març",
					"abril", "maig", "juny", "juliol",
					"agost", "setembre", "octubre",
					"novembre", "desembre" ];
				const monthStartingWithVowels = [3, 7, 9];
 
				const day = date.getDate();
				const monthIndex = date.getMonth();
				const year = date.getFullYear();
				const prep = (monthStartingWithVowels.includes(monthIndex)) ? 'd\' ' : 'de ';

				return day + ' ' + prep + monthNames[ monthIndex ] + ' de ' + year;
			}
		}
	}
};
</script>
