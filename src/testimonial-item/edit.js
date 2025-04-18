/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	Button,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function for the testimonial-item block
 */
export default function Edit({ attributes, setAttributes }) {
	const { authorName, authorPosition, authorAvatar, rating } = attributes;

	const blockProps = useBlockProps({
		className: 'tb-testimonial-item',
	});

	// Helper function to render stars based on rating
	const renderStars = (count) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(
				<span 
					key={i}
					className={`dashicons ${i <= count ? 'dashicons-star-filled' : 'dashicons-star-empty'} tb-text-primary-500`}
					style={{ color: i <= count ? '#E4A11B' : '#CBD5E1' }}
				/>
			);
		}
		return stars;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Testimonial Settings', 'triablocks')}>
					<TextControl
						label={__('Author Name', 'triablocks')}
						value={authorName}
						onChange={(value) => setAttributes({ authorName: value })}
					/>
					<TextControl
						label={__('Author Position', 'triablocks')}
						value={authorPosition}
						onChange={(value) => setAttributes({ authorPosition: value })}
					/>
					<RangeControl
						label={__('Rating', 'triablocks')}
						value={rating}
						onChange={(value) => setAttributes({ rating: value })}
						min={1}
						max={5}
						step={1}
					/>
					<div className="tb-testimonial-avatar-upload">
						<p>{__('Author Avatar', 'triablocks')}</p>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									setAttributes({
										authorAvatar: {
											id: media.id,
											url: media.url,
											alt: media.alt || '',
										},
									});
								}}
								allowedTypes={['image']}
								value={authorAvatar?.id}
								render={({ open }) => (
									<div>
										{authorAvatar?.url ? (
											<div className="tb-testimonial-avatar-preview">
												<img
													src={authorAvatar.url}
													alt={authorAvatar.alt}
													style={{
														width: '60px',
														height: '60px',
														borderRadius: '50%',
														objectFit: 'cover',
													}}
												/>
												<div className="tb-testimonial-avatar-buttons">
													<Button 
														onClick={open} 
														variant="secondary"
														isSmall
													>
														{__('Replace', 'triablocks')}
													</Button>
													<Button
														onClick={() => setAttributes({ authorAvatar: undefined })}
														variant="tertiary"
														isDestructive
														isSmall
													>
														{__('Remove', 'triablocks')}
													</Button>
												</div>
											</div>
										) : (
											<Button onClick={open} variant="secondary">
												{__('Upload Avatar', 'triablocks')}
											</Button>
										)}
									</div>
								)}
							/>
						</MediaUploadCheck>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="tb-testimonial-content">
					<InnerBlocks
						template={[
							[
								'core/paragraph',
								{
									placeholder: __('Write the testimonial content here...', 'triablocks'),
									className: 'tb-testimonial-text',
								},
							],
						]}
						templateLock="all"
					/>
				</div>
				
				<div className="tb-testimonial-rating">
					{renderStars(rating)}
				</div>
				
				<div className="tb-testimonial-author">
					{authorAvatar?.url && (
						<div className="tb-testimonial-avatar">
							<img
								src={authorAvatar.url}
								alt={authorAvatar.alt || __('Author Avatar', 'triablocks')}
							/>
						</div>
					)}
					
					<div className="tb-testimonial-info">
						<RichText
							tagName="span"
							className="tb-testimonial-name"
							value={authorName}
							onChange={(value) => setAttributes({ authorName: value })}
							placeholder={__('Author Name', 'triablocks')}
						/>
						<RichText
							tagName="span"
							className="tb-testimonial-position"
							value={authorPosition}
							onChange={(value) => setAttributes({ authorPosition: value })}
							placeholder={__('Author Position', 'triablocks')}
						/>
					</div>
				</div>
			</div>
		</>
	);
}