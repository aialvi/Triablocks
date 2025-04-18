/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * The save function for the testimonial-item block
 */
export default function save({ attributes }) {
	const { authorName, authorPosition, authorAvatar, rating } = attributes;

	const blockProps = useBlockProps.save({
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
		<div {...blockProps}>
			<div className="tb-testimonial-content">
				<InnerBlocks.Content />
			</div>
			
			<div className="tb-testimonial-rating">
				{renderStars(rating)}
			</div>
			
			<div className="tb-testimonial-author">
				{authorAvatar?.url && (
					<div className="tb-testimonial-avatar">
						<img
							src={authorAvatar.url}
							alt={authorAvatar.alt || ''}
						/>
					</div>
				)}
				
				<div className="tb-testimonial-info">
					{authorName && (
						<RichText.Content
							tagName="span"
							className="tb-testimonial-name"
							value={authorName}
						/>
					)}
					{authorPosition && (
						<RichText.Content
							tagName="span"
							className="tb-testimonial-position"
							value={authorPosition}
						/>
					)}
				</div>
			</div>
		</div>
	);
}