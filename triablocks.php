<?php
/**
 * Plugin Name:       Triablocks
 * Description:       A collection of dynamic blocks with Tailwind CSS for the WordPress block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.2.0
 * Author:            Aminul Islam Alvi
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       triablocks
 *
 * @package Triablocks
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Define constants
 */
define('TRIABLOCKS_VERSION', '0.2.0');
define('TRIABLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('TRIABLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Registers the blocks using the metadata loaded from their `block.json` files.
 */
function triablocks_block_init()
{
	$blocks_dir = __DIR__ . '/build';
	$blocks = glob($blocks_dir . '/*');

	foreach ($blocks as $block) {
		register_block_type($block);
	}
}
add_action('init', 'triablocks_block_init');

/**
 * Add a new category to the list of block categories.
 *
 * @param array $categories Array of block categories.
 * @return array Array of block categories.
 */
add_filter('block_categories_all', function ($categories) {
	$categories[] = array(
		'slug' => 'triablocks',
		'title' => 'Triablocks',
	);

	return $categories;
});

/**
 * Enqueue Tailwind CSS styles for editor and front-end
 */
function triablocks_enqueue_assets() {
    // Enqueue Tailwind CSS for front-end
    wp_enqueue_style(
        'triablocks-tailwind',
        TRIABLOCKS_PLUGIN_URL . 'src/tailwind-output.css',
        array(),
        TRIABLOCKS_VERSION
    );
}
add_action('wp_enqueue_scripts', 'triablocks_enqueue_assets');
add_action('enqueue_block_editor_assets', 'triablocks_enqueue_assets');
