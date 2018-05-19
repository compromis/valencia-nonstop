<template>
	<div class="post">
		<div v-if="loaded === 'true'">
			<div class="post-container container" >
				<div class="band"></div>
				<h2> {{ post.title.rendered }}</h2>
				<div class="progressive full" v-if="post.hasOwnProperty('featured_image_surc') && post.featured_image_src['full'][0]">
					<img class="lazy"
						v-progressive="post.featured_image_src['full'][0]" 
						:data-srcset="post.featured_image_src['srcset']" 
						:src="post.featured_image_src['full'][0]" 
					/>
				</div>

				<div class="rt-post-content rt-content" v-html="post.content.rendered" ></div>
				<div class="rt-cat-list">
					<router-link v-for="x in post.cat_name" :to="{ name: 'cat', params: { name:x.slug } }" :key="x.id"> {{ x.name }} </router-link>
				</div>

				<div class="rt-tag-list">
					<router-link v-for="x in post.tag_name" :to="{ name: 'tag', params: { name:x.slug } }" :key="x.id"> {{ x.name }} </router-link>
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
			pageTitle: ''
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
		}
	}
};
</script>
