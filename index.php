<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <title><?php wp_title(); ?> <?php bloginfo('site_name'); ?></title>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover">
  <link rel="shortcut icon" href="<?php echo get_template_directory_uri() . '/public/favicons/favicon.ico'; ?>">
  <link rel="icon" sizes="16x16 32x32 64x64" href="<?php echo get_template_directory_uri() . '/public/favicons/favicon.ico'; ?>">
  <link rel="icon" type="image/png" sizes="196x196" href="<?php echo get_template_directory_uri() . '/public/favicons/favicon-192.png'; ?>">
  <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri() . '/public/favicons/favicon-32.png'; ?>">
  <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri() . '/public/favicons/favicon-310.png'; ?>">
  <meta name="msapplication-TileColor" content="#FFFFFF">
  <meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri() . '/public/favicons/favicon-144.png'; ?>">
  <meta name="msapplication-config" content="<?php echo get_template_directory_uri() . '/public/favicons/browserconfig.xml'; ?>">
  <meta name="theme-color" content="#DE6D0F">
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
  <link href="https://fonts.googleapis.com/css?family=Concert+One" rel="stylesheet">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.1.0/css/light.css" integrity="sha384-ANTAgj8tbw0vj4HgQ4HsB886G2pH15LXbruHPCBcUcaPAtn66UMxh8HQcb1cH141" crossorigin="anonymous">
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.1.0/css/fontawesome.css" integrity="sha384-PnWzJku7hTqk2JREATthkLpYeVVGcBbXG5yEzk7hD2HIr/VxffIDfNSR7p7u4HUy" crossorigin="anonymous">
  <?php wp_head(); ?>
</head>
<body  <?php body_class() ?> >
  <div id="app">
  <?php
    if (have_posts()) {
      if (is_home() && ! is_front_page()) {
        echo '<h1>' . single_post_title('', false) . '</h1>';
      }

      while (have_posts()) {
        the_post();

        if (is_singular()) {
          the_title('<h1>', '</h1>');
        } else {
          the_title('<h2><a href="' . esc_url(get_permalink()) . '">', '</a></h2>');
        }

        the_content();
      }
    }
  ?>
  </div>

  <?php wp_footer(); ?>
</body>
</html>
