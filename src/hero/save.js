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
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { image, imagePosition, overlayEnabled } = attributes;

	const blockProps = useBlockProps.save({
		className: 'tb-hero-container',
	});

	const imageStyle = image?.url ? {
		backgroundImage: `url(${image.url})`,
		backgroundSize: 'cover', 
		backgroundPosition: 'center',
	} : {};

	return (
		<div {...blockProps}>
			<div className={`tb-hero-content ${imagePosition === 'left' ? 'tb-flex-row-reverse' : ''}`}>
				<div className="tb-hero-text">
					<InnerBlocks.Content />
				</div>
				
				<div className="tb-hero-image" style={imageStyle}>
					{overlayEnabled && <div className="tb-absolute tb-inset-0 tb-bg-black tb-opacity-40"></div>}
				</div>
			</div>
		</div>
	);
}
