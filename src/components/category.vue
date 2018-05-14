<template>
	<div class="posts">
		<div v-if="loaded === 'true'" >
			<div v-for="post in posts" :key="post.slug" class="post-container container">
				<div class="post">
					<div class="band"></div>
					<h2 class="post-title"><router-link :to="{ name: 'post', params: { name:post.slug }}"> {{ post.title.rendered }} </router-link> </h2>
					<div class="meta">
						<span class="posted-on">
							Publicat el
							<span class="date" v-text="formatDate( post )"></span>
						</span>
					</div>

					<div class="progressive full" v-if="post.featured_image_src['full'][0]">
						<img class="lazy" v-progressive="post.featured_image_src['full'][0]" :data-srcset="post.featured_image_src['srcset']" :src="post.featured_image_src['full'][0]" />
					</div>
					<div class="post-excerpt post-content" v-html="post.excerpt.rendered"></div>
				</div>
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
	mounted: function() {
		const vm = this;
		if ( vm.$route.params.name ) {
			vm.getCatId( vm.$route.params.name );
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

	methods: {
		getPosts: function( catId ) {
			const vm = this;
			vm.loaded = 'false';
			vm.$http.get( 'wp/v2/posts', {
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
			vm.$http.get( 'wp/v2/categories/?slug=' + name )
			.then( ( res ) => {
				res = res.data[ 0 ];
				vm.totalCount = ( res.data );
				vm.getPosts( res.id );
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},
		formatDate: function( value ) {
			value = value.date;
			if ( value ) {
				const date = new Date( value );
				const monthNames = [ "Gener", "Febrer", "Març",
					"Abril", "Maig", "Juny", "Juliol",
					"Agost", "Setembrr", "Octubre",
					"Novembre", "Desembre" ];
				const day = date.getDate();
				const monthIndex = date.getMonth();
				const year = date.getFullYear();
				return monthNames[ monthIndex ] + ',' + day + ' ' + year;
			}
		}
	}
};
</script>
