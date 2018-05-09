import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { HTTP as axios } from './axios/axios';
import VueProgressiveImage from 'progressive-image/dist/vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.prototype.$http = axios;

Vue.use( Vuex );
Vue.use( VueRouter );
Vue.use( VueProgressiveImage, {
	removePreview: true
} );
Vue.use( VueRouter );

Vue.use( VueGoogleMaps, {
	load: {
		key: 'AIzaSyCHia_53O9k25YuqFb3PKkvp-XO6l5KNWY',
		libraries: ''
	}
} );

Vue.config.debug = true;
Vue.config.devTools = true;

//Import all vue components
import posts from './components/posts.vue';
Vue.component( 'posts', posts );
import post from './components/post.vue';
Vue.component( 'post', post );
import header from './components/theme-header.vue';
Vue.component( 'theme-header', header );
import frontpage from './components/frontpage.vue';
Vue.component( 'frontpage', frontpage );
import footer from './components/theme-footer.vue';
Vue.component( 'theme-footer', footer );
import page from './components/page.vue';
Vue.component( 'page', page );
import category from './components/category.vue';
Vue.component( 'category', category );
import tag from './components/tag.vue';
Vue.component( 'tag', tag );
//Create main vue component
const App = Vue.extend( {
	template: '<div id="page" :class="[template, \'hfeed site\']"><theme-header></theme-header>' +
			'<main class="content"><router-view></router-view></main>' +
			'<theme-footer></theme-footer></div>',
	data() {
		return {
			template: ''
		};
	},
	watch: {
		'$route': function( to, from ) {
			this.template = to.name;
		}
	},
	mounted() {
		this.template = this.$route.name;
	}
} );

//Define route for vue app
//ref : http://router.vuejs.org/en/
const router = new VueRouter( {
	mode: 'history',
	routes: [

		{ path: '/blog/:page(\\d+)?', name: 'posts', component: posts },
		{ path: '/blog/:name', name: 'post', component: post },
		{ path: '/page/:name', name: 'page', component: page },
		{ path: '/category/:name', name: 'cat', component: category },
		{ path: '/tag/:name', name: 'tag', component: tag },
		{ path: '/', name: 'frontpage', component: frontpage },

	],
	scrollBehavior( to, from, savedPosition ) {
		if ( savedPosition ) {
			return savedPosition;
		}

		return { x: 0, y: 0 };
	}
} );

//Define vuex store
const store = new Vuex.Store( {
	state: {
		title: ''
	},
	mutations: {
		rtChangeTitle( state, value ) {
			// mutate state
			state.title = value;
			document.title = ( state.title ? state.title + ' - ' : '' ) + rtwp.site_name;
		}
	}
} );

//Create instance of main component
new App( {
	store,
	router
} ).$mount( '#app' );
