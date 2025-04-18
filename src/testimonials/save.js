/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * The save function for the testimonials block
 */
export default function save({ attributes }) {
	const { columns, layout, showHeading, heading, subheading } = attributes;

	const blockProps = useBlockProps.save({
		className: `tb-testimonials-container tb-testimonials-layout-${layout}`,
	});

	return (
		<div {...blockProps}>
			{showHeading && (
				<div className="tb-testimonials-heading">
					{heading && (
						<RichText.Content
							tagName="h2"
							className="tb-testimonials-title"
							value={heading}
						/>
					)}
					{subheading && (
						<RichText.Content
							tagName="p"
							className="tb-testimonials-subtitle"
							value={subheading}
						/>
					)}
				</div>
			)}
			
			<div 
				className="tb-testimonials-grid"
				style={{ 
					gridTemplateColumns: layout === 'grid' ? 
						`repeat(${columns}, minmax(0, 1fr))` : undefined 
				}}
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}