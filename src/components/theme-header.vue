<template>
	<nav class="nav-menu">
		<div class="header">
			<router-link :to="{ name: 'frontpage' }" class="site-name">{{ site_name }}</router-link>
		</div>
		<div class="menu">
			<ul>
				<li v-for="item in menus" v-if="item.type != 'custom'" :class="item.classes" :key="item.url">
					<router-link :to="{ name: 'page', params: { name: getUrlName( item.url ) }}"> {{ item.title }} </router-link>
				</li>
			</ul>
		</div>
	</nav>
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
