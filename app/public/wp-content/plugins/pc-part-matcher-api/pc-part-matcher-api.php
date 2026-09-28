<?php
/**
 * Plugin Name: PC Part Matcher API
 * Description: Custom REST API endpoints for the PC Part Matcher SPA.
 * Version: 1.0.0
 * Author: James Daniel 
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_action( 'rest_api_init', 'pcpm_register_api_endpoints' );

/**
 * Register the custom REST API endpoints for PC Part Matcher.
 * Exposes a public endpoint at /wp-json/pc-part-matcher/v1/parts.
 * 
 * @return void
 */
function pcpm_register_api_endpoints() {
    // Endpoint for all parts
    register_rest_route( 'pc-part-matcher/v1', '/parts', array(
        'methods'             => 'GET',
        'callback'            => 'pcpm_get_parts',
        'permission_callback' => '__return_true'
    ) );
}

/**
 * Callback function for the /parts API endpoint.
 * Queries all published 'pc-part' custom post types, extracts their Advanced Custom Fields (ACF),
 * and returns a clean, highly structured JSON array without standard WordPress bloat.
 * 
 * @param WP_REST_Request $request The incoming API request object.
 * @return WP_REST_Response A structured JSON response containing all PC parts.
 */
function pcpm_get_parts( WP_REST_Request $request ) {
    // 1. Tell WordPress exactly what we want to query from the database.
    // 'pc-part' is the Custom Post Type we registered using the CPT UI plugin.
    // -1 tells it to fetch ALL parts at once (no pagination limit).
    $args = array(
        'post_type'      => 'pc-part',
        'posts_per_page' => -1, 
        'post_status'    => 'publish',
    );

    // 2. Execute the database query
    $query = new WP_Query( $args );
    $parts = array();

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            // 3. Set up the current post object so we can extract its data
            $query->the_post();
            
            // 4. Map the messy WordPress/ACF data into a perfectly clean array.
            // We use get_field() to pull the values from Advanced Custom Fields.
            // Casting (float) ensures numbers aren't accidentally sent as strings.
            $parts[] = array(
                'id'               => get_the_ID(),
                'name'             => html_entity_decode( get_the_title() ),
                'image'            => get_field( 'image' ) ? get_field( 'image' ) : '',
                'componentType'    => get_field( 'component_type' ),
                'price'            => (float) get_field( 'price' ),
                'socketType'       => get_field( 'socket_type' ),
                'memoryType'       => get_field( 'memory_type' ),
                'formFactor'       => get_field( 'form_factor' ),
                'wattage'          => (float) get_field( 'wattage' ),
                'storageInterface' => get_field( 'storage_interface' ),
                'description'      => get_field( 'description' ) ? get_field( 'description' ) : ''
            );
        }
        // 5. Always reset post data after a custom loop so it doesn't break other WP functions!
        wp_reset_postdata();
    }

    return rest_ensure_response( $parts );
}
