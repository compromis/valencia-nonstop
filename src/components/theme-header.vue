<template>
	<div>
		<div class="brand">
			<transition name="fade">
				<div class="brand-share" v-show="show_share_buttons">
					<share-buttons />
				</div>
			</transition>
			<div class="brand-logo">
				<a href="https://compromis.net" target="_blank" rel="noopener">
					<img src="https://compromis.net/wp-content/themes/Compromis/images/logo-compromis-retina.png" alt="Compromís" />
				</a>
			</div>
		</div>

		<nav class="header-wrapper">
			<div class="header navbar-dark">
				<button class="navbar-toggler hamburger" @click="toggleSecondaryMenu()" type="button" aria-controls="navbarNavAltMarkup" :aria-expanded="false" aria-label="Mostra el menú">
					<span class="navbar-toggler-icon"></span>
				</button>
				<router-link :to="{ name: 'frontpage' }" class="site-name">VLC, el canvi no para</router-link>
				<div :class="{ 'secondary-menu': true, 'secondary-menu-visible': secondary_menu_visible }">
					<ul @click="toggleSecondaryMenu()">
						<li v-for="item in secondary_menu" v-if="item.type != 'custom'" :class="item.classes" :key="item.url">
							<router-link :to="{ name: 'page', params: { name: getUrlName( item.url ) }}"> {{ item.title }} </router-link>
						</li>
						<li v-else :class="item.classes" :key="item.url">
							<router-link :to="item.url"> {{ item.title }} </router-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="menu">
				<ul>
					<li v-for="item in primary_menu" v-if="item.type != 'custom'" :class="[ item.classes, 'category' ]" :key="item.url">
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
import ShareButtons from './partials/share-buttons.vue';

export default {
	components: {
		ShareButtons
	},
	mounted: function() {
		this.getMenu('primary-menu');
		this.getMenu('secondary-menu');
	},
	data() {
		return {
			primary_menu: [],
			secondary_menu: [],
			site_name: rtwp.site_name,
			show_share_buttons: true,
			secondary_menu_visible: false
		};
	},
	methods: {
		getMenu(menu_location) {
			this.$http.get( '/wp-json/wp-api-menus/v2/menu-locations/' + menu_location )
				.then( ( res ) => {
					if(menu_location == 'primary-menu') {
						this.primary_menu = res.data;
					} else {
						this.secondary_menu = res.data;
					}
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
		},

		toggleSecondaryMenu() {
			this.secondary_menu_visible = !this.secondary_menu_visible;
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