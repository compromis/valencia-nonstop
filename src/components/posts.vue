<template>
	<div class="posts">
		<div v-if="loaded === 'true'" >
			<div v-for="post in posts" :key="post.slug" class="post-container container">
				<div class="post">
					<div class="band"></div>
					<div class="post-summary">
						<div class="post-thumbnail progressive full" v-if="post.hasOwnProperty('featured_image_src') && post.featured_image_src['full'][0]">
							<img class="lazy" v-progressive="post.featured_image_src['full'][0]" :data-srcset="post.featured_image_src['srcset']" :src="post.featured_image_src['full'][0]" />
						</div>
						<div class="post-summary-content">
							<h2 class="post-title"><router-link :to="{ name: 'article', params: { name: post.slug, remote: true }}"><span v-html="post.title.rendered"></span></router-link> </h2>
							<div class="post-meta">
								<span class="posted-on">
									<span class="date" v-text="formatDate( post )">
									</span>
								</span>
							</div>
							<div class="post-excerpt post-content" v-html="post.excerpt.rendered"></div>
							<div class="post-read-more">
								<router-link :to="{ name: 'article', params: { name: post.slug, remote: true }}">Llegeix més</router-link>
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
		};
	},

	methods: {
		getPosts( pageNumber = 1 ) {
			const vm = this;
			const url = 'https://valencia.compromis.net/wp-json/wp/v2/posts';
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
				vm.$router.push( { 'name': 'articles', params: { 'page': vm.currentPage } } );
			}
		},
		rtShowPrev( event ) {
			const vm = this;
			if ( vm.currentPage != 1 ) {
				vm.currentPage = vm.currentPage - 1;
				vm.$router.push( { 'name': 'articles', params: { 'page': vm.currentPage } } );
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
