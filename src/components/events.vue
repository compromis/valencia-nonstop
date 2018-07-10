<template>
	<div class="posts">
		<div v-if="loaded === 'true'" >
			<div v-for="post in posts" :key="post.slug" class="post-container container">
				<post-summary :post="post" :remote="false" />
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
import PostSummary from './partials/post-summary.vue';

export default {
	components: {
		PostsLoading,
		PostSummary
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
			pageTitle: ''
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
		}
	},
	watch: {
		'$route'( to, from ) {
			this.getPosts( this.$route.params.page );
		}
	}
};
</script>
