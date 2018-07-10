<template>
	<div class="posts">
		<div v-if="loaded === 'true'" >
			<div v-for="post in posts" :key="post.slug" class="post-container container">
				<post-summary :post="post" :remote="remote" />
			</div>
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
	mounted: function() {
		const vm = this;
		if ( vm.$route.params.name ) {
			vm.getCatId( vm.$route.params.name );
		}
	},
	props: {
		remote: Boolean
	},
	data() {
		return {
			posts: {},
			loaded: 'false',
			pageTitle: '',
			totalCount: '',
			catName: ''
		};
	},

	methods: {
		getPosts: function( catId ) {
			const vm = this;
			vm.loaded = 'false';
			const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/posts' : '/wp-json/wp/v2/posts';
			vm.$http.get( url, {
				params: { categories: catId }
			} )
			.then( ( res ) => {
				vm.posts = res.data;
				vm.loaded = 'true';
				vm.pageTitle = 'Category' + ' - ' + vm.catName;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},
		getCatId: function( name ) {
			const vm = this;
			vm.catName = name;
			vm.loaded = 'false';
			const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/categories/?slug=' : '/wp-json/wp/v2/categories/?slug=';
			vm.$http.get( url + name )
			.then( ( res ) => {
				res = res.data[ 0 ];
				vm.totalCount = ( res.data );
				vm.getPosts( res.id );
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		}
	}
};
</script>
