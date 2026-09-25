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

function pcpm_register_api_endpoints() {
    // Endpoint for all parts
    register_rest_route( 'pc-part-matcher/v1', '/parts', array(
        'methods'             => 'GET',
        'callback'            => 'pcpm_get_parts',
        'permission_callback' => '__return_true'
    ) );
}

function pcpm_get_parts( WP_REST_Request $request ) {
    $args = array(
        'post_type'      => 'pc-part',
        'posts_per_page' => -1, // Get all parts
        'post_status'    => 'publish',
    );

    $query = new WP_Query( $args );
    $parts = array();

    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            
            // Map the ACF fields to our clean JSON structure
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
                'storageInterface' => get_field( 'storage_interface' )
            );
        }
        wp_reset_postdata();
    }

    return rest_ensure_response( $parts );
}
