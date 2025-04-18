/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
	useBlockProps, 
	InnerBlocks,
	InspectorControls 
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl
} from '@wordpress/components';

/**
 * Editor styles
 */
import './editor.scss';

/**
 * The edit function for the Services block
 *
 * @param {Object}   root0
 * @param {Object}   root0.attributes
 * @param {Function} root0.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { columns = 3, layout = 'grid' } = attributes;
	
	const ALLOWED_BLOCKS = ['triablocks/services-item'];

	const blockProps = useBlockProps({
		className: `tb-services-container tb-services-layout-${layout}`,
		style: layout === 'grid' ? { 
			'--tb-services-columns': columns
		} : {},
	});

	// Set up a template with the number of items matching the columns
	const getTemplate = () => {
		const template = [];
		const initialItemCount = Math.min(columns, 6); // Limit to 6 items initially
		
		for (let i = 0; i < initialItemCount; i++) {
			template.push(['triablocks/services-item']);
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
				</PanelBody>
			</InspectorControls>
			
			<div {...blockProps}>
				<InnerBlocks
					allowedBlocks={ALLOWED_BLOCKS}
					template={getTemplate()}
					orientation="horizontal"
					renderAppender={InnerBlocks.ButtonBlockAppender}
				/>
			</div>
		</>
	);
}
