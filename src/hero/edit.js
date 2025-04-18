/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { 
	Button,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   root0
 * @param {Object}   root0.attributes
 * @param {Function} root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { image, imagePosition = 'right', overlayEnabled = false } = attributes;

	const blockProps = useBlockProps({
		className: 'tb-hero-container',
	});

	const onSelectImage = (selectedImage) => {
		setAttributes({ 
			image: {
				id: selectedImage.id,
				url: selectedImage.url,
				alt: selectedImage.alt || '',
			} 
		});
	};

	const selectImageButton = image
		? __('Change Image', 'triablocks')
		: __('Select Image', 'triablocks');

	// Hero block template with Tailwind classes
	const template = [
		[
			'core/heading',
			{
				level: 2,
				placeholder: __('Add Hero Title', 'triablocks'),
				className: 'tb-hero-title',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: __('Add your hero description here...', 'triablocks'),
				className: 'tb-hero-paragraph',
			},
		],
		[
			'core/buttons',
			{
				className: 'tb-hero-buttons',
			},
			[
				[
					'core/button',
					{
						text: __('Primary Button', 'triablocks'),
						className: 'tb-hero-button tb-hero-button-primary',
					},
				],
				[
					'core/button',
					{
						text: __('Secondary Button', 'triablocks'),
						className: 'tb-hero-button tb-hero-button-secondary',
					},
				],
			],
		],
	];

	const imageStyle = image?.url ? {
		backgroundImage: `url(${image.url})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	} : {};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'triablocks')}>
					<ToggleControl
						label={__('Image on left side', 'triablocks')}
						checked={imagePosition === 'left'}
						onChange={() => setAttributes({
							imagePosition: imagePosition === 'left' ? 'right' : 'left'
						})}
					/>
					<ToggleControl
						label={__('Enable dark overlay', 'triablocks')}
						checked={overlayEnabled}
						onChange={(value) => setAttributes({ overlayEnabled: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className={`tb-hero-content ${imagePosition === 'left' ? 'tb-flex-row-reverse' : ''}`}>
					<div className="tb-hero-text">
						<InnerBlocks template={template} />
					</div>
					
					<div className="tb-hero-image" style={imageStyle}>
						{overlayEnabled && <div className="tb-absolute tb-inset-0 tb-bg-black tb-opacity-40"></div>}
						{!image?.url && (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={['image']}
									value={image?.id}
									render={({ open }) => (
										<Button 
											onClick={open}
											className="tb-bg-white tb-text-primary-700 tb-px-4 tb-py-2 tb-rounded-md tb-font-medium"
										>
											{selectImageButton}
										</Button>
									)}
								/>
							</MediaUploadCheck>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
