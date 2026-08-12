<?php
/**
 * Hello Elementor Child — functions.php
 *
 * Enqueues the parent theme's stylesheet and this child theme's stylesheet.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function hello_elementor_child_enqueue_styles() {
	// Parent theme stylesheet.
	wp_enqueue_style(
		'hello-elementor-parent',
		get_template_directory_uri() . '/style.min.css',
		array(),
		wp_get_theme()->parent()->get( 'Version' )
	);

	// Child theme stylesheet (loads after parent so it can override).
	wp_enqueue_style(
		'hello-elementor-child',
		get_stylesheet_uri(),
		array( 'hello-elementor-parent' ),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'hello_elementor_child_enqueue_styles' );
