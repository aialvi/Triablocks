/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} root0
 * @param {Object} root0.attributes
 * @param {Object} root0.attributes.image
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes: { image } } ) {
	return (
		<div { ...useBlockProps.save() }>
			<div className="tria-hero__column--text">
				<InnerBlocks.Content />
			</div>
			<div
				className="tria-hero__column--image"
				style={ { backgroundImage: `url('${ image?.url }')` } }
			/>
		</div>
	);
}
