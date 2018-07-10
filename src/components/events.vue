<template>
	<div class="posts">
		<div v-if="loaded === 'true'" >
			<div v-for="post in posts" :key="post.slug" class="post-container container">
				<div class="post">
					<div class="band"></div>
					<div class="post-summary">
						<div class="post-thumbnail progressive full" v-if="post.custom_fields.venue">
							<gmap-map
								:center="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }"
								:zoom="16"
								:options="mapOptions"
								class="post-map">
								<GmapMarker :position="{ lat: parseFloat(post.custom_fields.venue.lat), lng: parseFloat(post.custom_fields.venue.lng) }" />
							</gmap-map>
						</div>
						<div class="post-summary-content">
							<h2 class="post-title"><router-link :to="{ name: 'event', params: { name: post.slug, remote: true }}"><span v-html="post.title.rendered"></span></router-link> </h2>
							<div class="post-fields">
								<ul>
									<li><i class="fal fa-calendar-alt fa-fw"></i> <span v-text="formatDate(post.custom_fields.date)"></span> a les {{ post.custom_fields.time }}</li>
									<li><i class="fal fa-map-marker-alt fa-fw"></i> {{ post.custom_fields.venue_text }}</li>
								</ul>
							</div>
							<div class="post-read-more">
								<router-link :to="{ name: 'event', params: { name: post.slug, remote: true }}">+ Més info</router-link>
							</div>
						</div>
					</div>
				</div>
			</div>
			<nav aria-label="Navegació">
				<ul class="pagination">
					<li><a href="#" v-if="showPrev" v-on:click.prevent="rtShowPrev()" class="btn btn-outline-primary btn-lg">&LT; Anterior</a></li>
					<li><a href="#" v-if="showNext" v-on:click.prevent="rtShowNext()" class="btn btn-outline-primary btn-lg">Següent &GT;</a></li>
				</ul>
			</nav>
		</div>
		<div v-else>
				<posts-loading />
		</div>
	</div>
</template>

<script>
import PostsLoading from './partials/posts-loading.vue';
import * as VueGoogleMaps from 'vue2-google-maps';
const mapStyle = require('./maps/events-mapstyle.json');


export default {
	components: {
		PostsLoading
	},
	mounted() {
		const vm = this;
		if ( vm.$route.params.page ) {
			vm.getPosts( vm.$route.params.page );
		} else {
			vm.getPosts();
		}
	},
	data() {
		return {
			posts: {},
			currentPage: '',
			prevPage: '',
			nextPage: '',
			showNext: true,
			showPrev: true,
			postCollection: '',
			postPerPage: '10',
			totalPages: '',
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
		getPosts( pageNumber = 1 ) {
			const vm = this;
			const url = '/wp-json/wp/v2/posts';
			vm.loaded = 'false';
			vm.$http.get( url, {
				params: { per_page: vm.postPerPage, page: pageNumber }
			} )
			.then( ( res ) => {
				vm.posts = res.data;
				vm.totalPages = res.headers[ 'x-wp-totalpages' ];
				if ( pageNumber <= parseInt( vm.totalPages ) ) {
					vm.currentPage = parseInt( pageNumber );
					vm.showPrev = (pageNumber == 1) ? false : true;
					vm.showNext = (pageNumber == vm.totalPages) ? false : true;
				} else {
					vm.$router.push( { 'name': 'posts' } );
					vm.currentPage = 1;
					vm.showPrev = false;
					vm.showNext = true;
				}
				vm.loaded = 'true';
				vm.pageTitle = 'Notícies';
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},
		rtShowNext( event ) {
			const vm = this;
			if ( vm.currentPage < vm.totalPages ) {
				vm.currentPage = vm.currentPage + 1;
				vm.$router.push( { 'name': 'events', params: { 'page': vm.currentPage } } );
			}
		},
		rtShowPrev( event ) {
			const vm = this;
			if ( vm.currentPage != 1 ) {
				vm.currentPage = vm.currentPage - 1;
				vm.$router.push( { 'name': 'events', params: { 'page': vm.currentPage } } );
			}
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
	},
	watch: {
		'$route'( to, from ) {
			this.getPosts( this.$route.params.page );
		}
	}
};
</script>
