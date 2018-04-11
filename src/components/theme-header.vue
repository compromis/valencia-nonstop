<template>
	<div>
		<router-link :to="{ name: 'home'}" class="site-name"> {{ site_name }} </router-link>
		<ul>
			<li v-for="item in menus" v-if="item.type != 'custom'">
				 <router-link :to="{ name: 'page', params: { name: getUrlName( item.url ) }}"> {{ item.title }} </router-link>
			</li>
		</ul>
	</div>

</template>

<script>
export default {

	mounted: function() {
		this.getMenu();
	},
	data() {
		return {
			menus: [],
			site_name: rtwp.site_name,
		};
	},
	methods: {
		getMenu: function() {
			const vm = this;
			vm.$http.get( 'wp-api-menus/v2/menu-locations/primary-menu' )
			.then( ( res ) => {
				vm.menus = res.data;
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},
		getUrlName: function( url ) {
			const array = url.split( '/' );
			return array[ array.length - 2 ];
		}
	}
};
</script>

<style>


</style>
