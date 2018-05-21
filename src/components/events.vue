<template>
	<div class="posts">
		<div v-if="loaded === 'true'" >
			<div v-for="post in posts" :key="post.slug" class="post-container container">
				<div class="post">
					<div class="band"></div>
					<h2 class="post-title"><router-link :to="{ name: 'event', params: { name:post.slug }}"><span v-html="post.title.rendered"></span></router-link> </h2>
					<div class="meta">
						<span class="posted-on">
							Posted On
							<span class="date" v-text="formatDate( post )">
							</span>
						</span>
					</div>
					<div class="progressive full" v-if="post.hasOwnProperty('featured_image_src') && post.featured_image_src['full'][0]">
						<img class="lazy" v-progressive="post.featured_image_src['full'][0]" :data-srcset="post.featured_image_src['srcset']" :src="post.featured_image_src['full'][0]" />
					</div>
					<div class="post-excerpt post-content" v-html="post.excerpt.rendered" > </div>
				</div>
			</div>
			<div class="posts-navigation">
					<a href=""  v-if="showPrev" v-on:click.prevent="rtShowPrev()"> &LT; anterior  </a>
					<a > {{ currentPage }} / {{ totalPages }} </a>
					<a href=""  v-if="showNext" v-on:click.prevent="rtShowNext()"> següent &GT; </a>
			</div>
		</div>
		<div v-else>
				<posts-loading />
		</div>
	</div>
</template>

<script>
import PostsLoading from './partials/posts-loading.vue';

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
			showNext: 'true',
			showPrev: 'true',
			postCollection: '',
			postPerPage: '10',
			totalPages: '',
			loaded: 'false',
			pageTitle: '',
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
				} else {
					vm.$router.push( { 'name': 'posts' } );
					vm.currentPage = 1;
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
			value = value.date;
			if ( value ) {
				const date = new Date( value );
				const monthNames = [ "gener", "febrer", "març",
					"abril", "maig", "juny", "juliol",
					"agost", "setembre", "octubre",
					"novembre", "desembre" ];

				const day = date.getDate();
				const monthIndex = date.getMonth();
				const year = date.getFullYear();

				return day + ' ' + monthNames[ monthIndex ] + ' ' + year;
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
