<?php
/**
 * Theme for the Postlight Headless WordPress Starter Kit.
 *
 * Read more about this project at https://postlight.com/trackchanges/introducing-postlights-wordpress-react-starter-kit.
 *
 * @package  Postlight_Headless_WP
 */

// Frontend origin.
require_once 'inc/frontend-origin.php';

// ACF commands.
require_once 'inc/class-acf-commands.php';

// Logging functions.
require_once 'inc/log.php';

// CORS handling.
require_once 'inc/cors.php';

// Admin modifications.
require_once 'inc/admin.php';

// Add Menus.
require_once 'inc/menus.php';

// Add Headless Settings area.
require_once 'inc/acf-options.php';

// Add GraphQL resolvers.
require_once 'inc/graphql/resolvers.php';

// Add Featured Image Support
add_theme_support('post-thumbnails');


// Custom Post Type Added
add_filter( 'register_post_type_args', function($args, $post_type) {
    // Registering in Graphql
    switch($post_type) {
        case "promo":
            $args['show_in_graphql'] = true;
            $args['graphql_single_name'] = 'Promo';
            $args['graphql_plural_name'] = 'Promos';
        break;
    }

    return $args;

}, 10, 2);