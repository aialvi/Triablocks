/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	InnerBlocks,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * The edit function for the testimonials block
 */
export default function Edit({ attributes, setAttributes }) {
	const { columns = 3, layout = 'grid', showHeading = true, heading, subheading } = attributes;
	
	const ALLOWED_BLOCKS = ['triablocks/testimonial-item'];

	const blockProps = useBlockProps({
		className: `tb-testimonials-container tb-testimonials-layout-${layout}`,
	});

	// Set up a template with the number of items matching the columns
	const getTemplate = () => {
		const template = [];
		const initialItemCount = Math.min(columns, 6); // Limit to 6 items initially
		
		for (let i = 0; i < initialItemCount; i++) {
			template.push(['triablocks/testimonial-item']);
		}
		
		return template;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Layout Settings', 'triablocks')}>
					<SelectControl
						label={__('Layout', 'triablocks')}
						value={layout}
						options={[
							{ label: __('Grid', 'triablocks'), value: 'grid' },
							{ label: __('Carousel', 'triablocks'), value: 'carousel' },
							{ label: __('Masonry', 'triablocks'), value: 'masonry' },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
					
					{layout === 'grid' && (
						<RangeControl
							label={__('Columns', 'triablocks')}
							value={columns}
							onChange={(value) => setAttributes({ columns: value })}
							min={1}
							max={4}
						/>
					)}

					<ToggleControl
						label={__('Show heading section', 'triablocks')}
						checked={showHeading}
						onChange={() => setAttributes({ showHeading: !showHeading })}
					/>
				</PanelBody>
			</InspectorControls>
			
			<div {...blockProps}>
				{showHeading && (
					<div className="tb-testimonials-heading">
						<RichText
							tagName="h2"
							className="tb-testimonials-title"
							value={heading}
							onChange={(value) => setAttributes({ heading: value })}
							placeholder={__('What Our Clients Say', 'triablocks')}
						/>
						<RichText
							tagName="p"
							className="tb-testimonials-subtitle"
							value={subheading}
							onChange={(value) => setAttributes({ subheading: value })}
							placeholder={__('Trusted by businesses worldwide', 'triablocks')}
						/>
					</div>
				)}

				<div 
					className="tb-testimonials-grid"
					style={{ 
						gridTemplateColumns: layout === 'grid' ? 
							`repeat(${columns}, minmax(0, 1fr))` : undefined 
					}}
				>
					<InnerBlocks
						allowedBlocks={ALLOWED_BLOCKS}
						template={getTemplate()}
						orientation="horizontal"
						renderAppender={InnerBlocks.ButtonBlockAppender}
					/>
				</div>
			</div>
		</>
	);
}