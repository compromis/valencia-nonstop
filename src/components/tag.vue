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
			vm.getTagId( vm.$route.params.name );
		}
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
	props: {
		remote: Boolean
	},
	methods: {
		getPosts: function( tagId ) {
			const vm = this;
			vm.loaded = 'false';
			const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/posts' : '/wp-json/wp/v2/posts';
			vm.$http.get( url, {
				params: { tags: tagId }
			} )
			.then( ( res ) => {
				vm.posts = res.data;
				vm.loaded = 'true';
				vm.pageTitle = 'Etiqueta' + ' - ' + vm.tagName;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},
		getTagId: function( name ) {
			const vm = this;
			vm.tagName = name;
			vm.loaded = 'false';
			const url = (this.remote) ? 'https://valencia.compromis.net/wp-json/wp/v2/tags/?slug=' : '/wp-json/wp/v2/tags/?slug=';
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
