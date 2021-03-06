<?php

function get_assets_manifest() {
    $manifest = file_get_contents(get_template_directory() . '/dist/manifest.json');
    $manifest = json_decode($manifest, true);
    return $manifest;
}

function rt_rest_theme_scripts() {
    $manifest = get_assets_manifest();

    wp_enqueue_style('app-css', $manifest['app.css']);
    wp_enqueue_script('vendors-js', $manifest['chunk-vendors.js'], null, null, true);
    wp_enqueue_script('app-js', $manifest['app.js'], null, null, true);
    wp_deregister_script('wp-embed');
}

add_action('wp_enqueue_scripts', 'rt_rest_theme_scripts');

if (function_exists('register_nav_menus')) {
    register_nav_menus(
        array(
        'primary-menu' => __('Primary Menu'),
        'secondary-menu' => __('Secondary Menu'),
     )
 );
}

add_filter('excerpt_more', '__return_false');

add_action('after_setup_theme', 'rt_theme_setup');

function rt_theme_setup() {
    add_theme_support('post-thumbnails');
}

function rt_custom_rewrite_rule() {
    global $wp_rewrite;
    $wp_rewrite->front = $wp_rewrite->root;
    $wp_rewrite->set_permalink_structure('agenda/%postname%/');
    $wp_rewrite->page_structure = $wp_rewrite->root . 'page/%pagename%/';
    $wp_rewrite->author_base = 'author';
    $wp_rewrite->author_structure = '/' . $wp_rewrite->author_base . '/%author%';
    $wp_rewrite->set_category_base('category');
    $wp_rewrite->set_tag_base('tag');
    $wp_rewrite->add_rule('^agenda$', 'index.php', 'top');
}
add_action('init', 'rt_custom_rewrite_rule');

//Forcing permalink structure
add_action('permalink_structure_changed', 'rt_forcee_perma_struct', 10, 2);

function rt_forcee_perma_struct($old, $new) {
    update_option('permalink_structure', 'agenda/%postname%');
}
// Polyfill for wp_title()
add_filter('wp_title','rt_vue_title', 10, 3);

function rt_vue_title($title, $sep, $seplocation) {
    if (false !== strpos($title, __('Pàgina no trobada'))) {
        $replacement = ucwords(str_replace('/', ' ', $_SERVER['REQUEST_URI']));
        $title = str_replace(__('Pàgina no trobada'), $replacement, $title);
    }

    return $title;
}

// Extend rest response
add_action('rest_api_init', 'rt_extend_rest_post_response');

function rt_extend_rest_post_response() {
    // Add featured image
    register_rest_field('post',
        'featured_image_src',
        array(
            'get_callback' => 'get_image_src',
            'update_callback' => null,
            'schema' => null,
        )
    );

    register_rest_field('post',
        'cat_name',
        array(
            'get_callback' => 'rt_get_cat_name',
            'update_callback' => null,
            'schema' => null,
        )
    );

    register_rest_field('post',
        'tag_name',
        array(
            'get_callback' => 'rt_get_tag_name',
            'update_callback' => null,
            'schema' => null,
        )
    );
}
// Get featured image
function get_image_src($object, $field_name, $request) {
    $feat_img_array['full'] = wp_get_attachment_image_src($object['featured_media'], 'full', false);
    $feat_img_array['large'] = wp_get_attachment_image_src($object['featured_media'], 'large', false);
    $feat_img_array['srcset'] = wp_get_attachment_image_srcset($object['featured_media']);
    $image = is_array($feat_img_array) ? $feat_img_array : false;
    return $image;
}

function rt_get_cat_name($object, $field_name, $request) {
    $cats = $object['categories'];
    $res = [];
    $ob = [];
    foreach ($cats as $x) {
        $cat_id = (int) $x;
        $cat = get_category($cat_id);
        if (is_wp_error($cat)) {
            $res[] = '';
        } else {
            $ob['name'] = isset($cat->name) ? $cat->name : '';
            $ob['id']     = isset($cat->term_id) ? $cat->term_id : '';
            $ob['slug'] = isset($cat->slug) ? $cat->slug : '';
            $res[] = $ob;
        }
    }
    return $res;
}

function rt_get_tag_name($object, $field_name, $request) {
    $tags = $object['tags'];
    $res = [];
    $ob = [];

    foreach ($tags as $x) {
        $tag_id = (int) $x;
        $tag = get_tag($tag_id);
        if (is_wp_error($tag)) {
            $res[] = '';
        } else {
            $ob['name'] = isset($tag->name) ? $tag->name : '';
            $ob['id'] = isset($tag->term_id) ? $tag->term_id : '';
            $ob['slug'] = isset($tag->slug) ? $tag->slug : '';
            $res[] = $ob;
        }
    }
    return $res;
}

add_action('rest_api_init', 'add_custom_fields');

function add_custom_fields() {
    register_rest_field(
        array('post', 'page'),
        'custom_fields',
        array(
            'get_callback' => 'get_custom_fields',
            'update_callback' => null,
            'schema' => null,
     )
 );
}

function get_custom_fields($object, $field_name, $request) {
    $wp_custom_fields = get_post_meta($object['id']);
    if(function_exists('get_fields')) {
        $acf_custom_fields = get_fields($object['id']);
        return (object) array_merge((array) $wp_custom_fields, (array) $acf_custom_fields);
    }

    return $wp_custom_fields;
}

add_action('rest_api_init', 'add_page_children');

function add_page_children() {
    register_rest_field(
        array('page'),
        'page_children',
        array(
            'get_callback' => 'get_subpages',
            'update_callback' => null,
            'schema' => null,
     )
 );
}

function get_subpages($object) {
    $my_wp_query = new WP_Query();
    $all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'posts_per_page' => '-1'));
    return get_page_children($object['id'], $all_wp_pages);
}

add_action('rest_api_init', 'add_page_siblings');

function add_page_siblings() {
    register_rest_field(
        array('page'),
        'page_siblings',
        array(
            'get_callback' => 'get_page_siblings',
            'update_callback' => null,
            'schema' => null,
     )
 );
}

function get_page_siblings($object) {
    if(isset($object['parent']) && $object['parent']) {
        $my_wp_query = new WP_Query();
        $all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'posts_per_page' => '-1'));
        return get_page_children($object['parent'], $all_wp_pages);
    }

    return false;
}

add_action('rest_api_init', 'add_page_parent_slug');

function add_page_parent_slug() {
    register_rest_field(
        'page',
        'parent_info',
        array(
            'get_callback' => 'get_parent_slug',
            'update_callback' => null,
            'schema' => null,
     )
 );
}

function get_parent_slug($object) {
    if(isset($object['parent']) && $object['parent']) {
        $page = get_post($object['parent']);
        return array('slug' => $page->post_name, 'title' => $page->post_title);
    }

    return false;
}

function my_acf_google_map_api($api){
    $api['key'] = 'AIzaSyDEC0TPaQ4ndq1QDQcyELcJ2IQagLNoyfo';
    return $api;
}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');