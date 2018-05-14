<template>
	<div>
		<div class="brand d-none d-lg-flex">
			<transition name="fade">
				<div class="brand-share" v-show="show_share_buttons">Facebook Twitter</div>
			</transition>
			<div class="brand-logo">
				<a href="https://compromis.net" target="_blank" rel="noopener">
					<img src="https://compromis.net/wp-content/themes/Compromis/images/logo-compromis-retina.png" alt="Compromís" />
				</a>
			</div>
		</div>

		<nav class="nav-menu">
			<div class="header">
				<router-link :to="{ name: 'frontpage' }" class="site-name">{{ site_name }}</router-link>
			</div>
			<div class="menu">
				<ul>
					<li v-for="item in menus" v-if="item.type != 'custom'" :class="[ item.classes, 'category' ]" :key="item.url">
						<router-link :to="{ name: 'page', params: { name: getUrlName( item.url ) }}" class="category-button"> {{ item.title }} </router-link>
					</li>
					<li v-else :class="[ item.classes, 'category' ]" :key="item.url">
						<router-link :to="item.url" class="category-button"> {{ item.title }} </router-link>
					</li>
				</ul>
			</div>
		</nav>
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
			show_share_buttons: true
		};
	},
	methods: {
		getMenu() {
			const vm = this;
			vm.$http.get( 'wp-api-menus/v2/menu-locations/primary-menu' )
			.then( ( res ) => {
				vm.menus = res.data;
			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},

		getUrlName( url ) {
			const array = url.split( '/' );
			return array[ array.length - 2 ];
		},

		handleScroll() {
			this.show_share_buttons = window.scrollY < 50;
		}
	},
	created() {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll);
	}
};
</script>