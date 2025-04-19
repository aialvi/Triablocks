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
	const { 
		image, 
		overlayEnabled = false,
		overlayOpacity = 40,
		contentPosition = 'center',
		textColor = '#ffffff',
		overlayColor = '#000000',
		minHeight = 500
	} = attributes;

	const blockProps = useBlockProps.save({
		className: 'tb-hero-full',
	});

	// Calculate inline styles
	const containerStyle = {
		minHeight: `${minHeight}px`,
	};

	// Set default background color when no image is provided
	const imageStyle = image?.url ? {
		backgroundImage: `url(${image.url})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
	} : {
		backgroundColor: '#f5f5f5', // Default background color when no image is selected
	};

	const overlayStyle = overlayEnabled ? {
		backgroundColor: overlayColor,
		opacity: overlayOpacity / 100,
	} : {};

	const contentStyle = {
		color: textColor,
	};

	// Content position class
	const getContentPositionClass = () => {
		switch (contentPosition) {
			case 'top':
				return 'tb-items-start';
			case 'bottom':
				return 'tb-items-end';
			default:
				return 'tb-items-center';
		}
	};

	return (
		<div {...blockProps}>
			<div 
				className="tb-hero-container tb-relative tb-w-full tb-overflow-hidden" 
				style={containerStyle}
			>
				<div 
					className="tb-hero-background tb-absolute tb-inset-0" 
					style={imageStyle} 
					aria-hidden="true"
				></div>
				
				{overlayEnabled && (
					<div 
						className="tb-hero-overlay tb-absolute tb-inset-0" 
						style={overlayStyle}
						aria-hidden="true"
					></div>
				)}
				
				<div 
					className={`tb-hero-content-wrapper tb-absolute tb-inset-0 tb-flex tb-justify-center ${getContentPositionClass()} tb-px-4 tb-py-8`}
				>
					<div 
						className="tb-hero-content tb-max-w-4xl tb-w-full tb-relative tb-z-10"
						style={contentStyle}
					>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		</div>
	);
}
