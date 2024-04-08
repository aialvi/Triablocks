<?php
/**
 * Plugin Name:       Triablocks
 * Description:       A collection of blocks for the new WordPress block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
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
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
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

	$categories[] = array (
		'slug' => 'triablocks',
		'title' => 'Triablocks',
	);

	return $categories;
});
