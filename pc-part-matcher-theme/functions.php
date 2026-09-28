<?php
/**
 * Enqueue scripts and styles for the Vue SPA.
 * This function dynamically locates the hashed Vite build files and enqueues them.
 * It also injects a global JavaScript variable containing the absolute theme URL
 * to ensure assets load correctly across different server environments.
 * 
 * @return void
 */
function pc_part_matcher_enqueue_scripts() {
    $theme_uri = get_template_directory_uri();
    
    // Use PHP's glob() to search the /dist/assets/ folder for the compiled CSS file. 
    // Vite changes the filename (adds a hash) every time we build, so we can't hardcode it.
    $css_files = glob( get_template_directory() . '/dist/assets/*.css' );
    if ( ! empty( $css_files ) ) {
        // Grab the first file found (there should only be one after we run 'rm -rf dist')
        $css_file = basename( $css_files[0] );
        wp_enqueue_style( 'pc-part-matcher-style', $theme_uri . '/dist/assets/' . $css_file, array(), null );
    }

    // Do the exact same thing to find the compiled JavaScript file
    $js_files = glob( get_template_directory() . '/dist/assets/*.js' );
    if ( ! empty( $js_files ) ) {
        // SECURITY & PORTABILITY: Instead of hardcoding the theme path in Vite, we ask WordPress 
        // for the correct path here. We inject it as a global 'window.wpThemeUrl' variable.
        // This guarantees image paths won't break if the theme is moved to a live server.
        wp_register_script( 'pc-part-matcher-config', false );
        wp_enqueue_script( 'pc-part-matcher-config' );
        wp_add_inline_script( 'pc-part-matcher-config', 'window.wpThemeUrl = "' . get_template_directory_uri() . '";' );

        $js_file = basename( $js_files[0] );
        wp_enqueue_script( 'pc-part-matcher-script', $theme_uri . '/dist/assets/' . $js_file, array(), null, true );
        
        // Vue 3 strictly requires its JavaScript to be loaded as an ES Module.
        // Standard WordPress wp_enqueue_script doesn't support type="module" natively, 
        // so we use this filter to manually intercept the <script> tag and add it.
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
 * Route all frontend URLs to index.php so the Vue Router can handle client-side routing.
 * This prevents 404 errors when a user directly navigates to a subpage (e.g. /browse)
 * or refreshes the browser.
 * 
 * @return void
 */
function pc_part_matcher_rewrite_rules() {
    // This Regex '^([^/]*)/?$' basically says: "Take whatever the user typed after the domain name, 
    // ignore WordPress's default page-finding logic, and forcefully load index.php instead."
    // Once index.php loads, the Vue Router takes over and reads the URL to show the right Vue component.
    add_rewrite_rule( '^([^/]*)/?$', 'index.php', 'top' );
}
add_action( 'init', 'pc_part_matcher_rewrite_rules' );
