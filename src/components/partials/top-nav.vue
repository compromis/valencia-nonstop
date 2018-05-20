<template>
	<div class="top-nav navbar-dark">
		<button class="navbar-toggler hamburger" @click="toggleSecondaryMenu()" type="button" aria-controls="navbarNavAltMarkup" :aria-expanded="secondary_menu_visible" aria-label="Mostra el menú">
			<span class="navbar-toggler-icon"></span>
		</button>
		<router-link :to="{ name: 'frontpage' }" class="site-name">VLC, el canvi no para</router-link>
		<div :class="{ 'secondary-menu': true, 'secondary-menu-visible': secondary_menu_visible }">
			<ul @click="toggleSecondaryMenu()">
				<li v-for="item in secondaryMenu" v-if="item.type != 'custom'" :class="item.classes" :key="item.url">
					<router-link :to="{ name: 'page', params: { name: getUrlName( item.url ) }}"> {{ item.title }} </router-link>
				</li>
				<li v-else :class="item.classes" :key="item.url">
					<router-link :to="item.url"> {{ item.title }} </router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'top-nav',

	props: {
		secondaryMenu: Array
	},

	data() {
		return {
			secondary_menu_visible: false
		}
	},

	methods: {
		toggleSecondaryMenu() {
			this.secondary_menu_visible = !this.secondary_menu_visible;
		},

		getUrlName( url ) {
			const array = url.split( '/' );
			// Deal with trailing slashes
			if(url.substring(url.length - 1) == '/') {
				return array[ array.length - 2 ];
			}
			return array[ array.length - 1 ];
		}
	}
};
</script>