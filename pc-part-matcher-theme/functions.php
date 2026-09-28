<?php
/**
 * Enqueue scripts and styles for the Vue SPA.
 */
function pc_part_matcher_enqueue_scripts() {
    $theme_uri = get_template_directory_uri();
    
    // Find the latest built CSS file
    $css_files = glob( get_template_directory() . '/dist/assets/*.css' );
    if ( ! empty( $css_files ) ) {
        $css_file = basename( $css_files[0] );
        wp_enqueue_style( 'pc-part-matcher-style', $theme_uri . '/dist/assets/' . $css_file, array(), null );
    }

    // Find the latest built JS file
    $js_files = glob( get_template_directory() . '/dist/assets/*.js' );
    if ( ! empty( $js_files ) ) {
        // Inject dynamic theme path into the window object for Vue to use
        wp_register_script( 'pc-part-matcher-config', false );
        wp_enqueue_script( 'pc-part-matcher-config' );
        wp_add_inline_script( 'pc-part-matcher-config', 'window.wpThemeUrl = "' . get_template_directory_uri() . '";' );

        $js_file = basename( $js_files[0] );
        wp_enqueue_script( 'pc-part-matcher-script', $theme_uri . '/dist/assets/' . $js_file, array(), null, true );
        
        // Add type="module" to the script tag
        add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
            if ( 'pc-part-matcher-script' !== $handle ) {
                return $tag;
            }
            return '<script type="module" crossorigin src="' . esc_url( $src ) . '"></script>';
        }, 10, 3 );
    }
}
add_action( 'wp_enqueue_scripts', 'pc_part_matcher_enqueue_scripts' );

/**
 * Route all frontend URLs to index.php so the Vue Router can handle them
 */
function pc_part_matcher_rewrite_rules() {
    add_rewrite_rule( '^([^/]*)/?$', 'index.php', 'top' );
}
add_action( 'init', 'pc_part_matcher_rewrite_rules' );
