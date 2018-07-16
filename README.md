# Valencia, el canvi no para
Wordpress theme for Compromís' *Valencia el canvi no para* campaign website. Built on top of [rtCamp](https://rtcamp.com).

## Install
1. Go to your WP theme directory (in `/wp-content/theme/`)
2. Clone / download this repo
3. Install dependencies `npm install` and compile `npm run build`
4. Activate the theme
5. Make sure you fulfill all the requirements before using theme. (See [Requirements](#requirements))

## Development
1. Go to your WP theme directory & navigate to the theme.
2. Install dependencies `npm install`
3. Make sure you add `define('RT_VUE_DEV', true);` in `wp-config.php` to get asset files from webpack dev server.
4. To start dev server with hot reload `npm run dev`
5. To create build for production with minification `npm run build`

## Requirements
* [WP API Menus plugin](https://wordpress.org/plugins/wp-api-menus/)
* WordPress Version 4.7+

## Frameworks / Packages used
* [Vue 2](http://vuejs.org)
* [Vue-Router](https://github.com/vuejs/vue-router)
* [Vuex](https://github.com/vuejs/vuex)
* [Axios](https://github.com/mzabriskie/axios)
* [Babel](https://babeljs.io)
* [Bootstrap](http://getbootstrap.com/)
* [Webpack](https://webpack.js.org/)
* [Gulp](http://gulpjs.com/)

<p align="center">
<a href="https://wordpress.org" target="_blank"><img width="200"src="https://s.w.org/about/images/logos/wordpress-logo-hoz-rgb.png"></a>
<a href="https://vuejs.org" target="_blank"><img width="50"src="https://vuejs.org/images/logo.png"></a>
<a href="https://rtcamp.com" target="_blank"><img width="200"src="https://rtcamp.com/wp-content/uploads/2016/06/rtcamp-logo.svg"></a>
</p>
