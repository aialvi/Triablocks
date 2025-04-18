/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import template from "./template";

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
	const { layout = "default" } = attributes;

	const blockProps = useBlockProps({
		className: "tb-cta-container",
	});

	// CTA block template with Tailwind classes
	const ctaTemplate = [
		[
			"core/paragraph",
			{
				placeholder: __("Add your call to action text here...", "triablocks"),
				className: "tb-cta-paragraph",
				content: __(
					"Ready to get started? Join thousands of satisfied customers today!",
					"triablocks",
				),
			},
		],
		[
			"core/button",
			{
				text: __("Get Started", "triablocks"),
				className: "tb-cta-button",
				align: "right",
			},
		],
	];

	// Second template option with different layout
	const ctaTemplateWithHeading = [
		[
			"core/heading",
			{
				level: 3,
				className: "tb-cta-heading",
				content: __("Try Our Service Today", "triablocks"),
			},
		],
		[
			"core/paragraph",
			{
				placeholder: __("Add your call to action text here...", "triablocks"),
				className: "tb-cta-paragraph",
				content: __(
					"Ready to take your business to the next level? Join thousands of satisfied customers!",
					"triablocks",
				),
			},
		],
		[
			"core/buttons",
			{
				className: "tb-cta-buttons",
			},
			[
				[
					"core/button",
					{
						text: __("Get Started", "triablocks"),
						className: "tb-cta-button",
					},
				],
				[
					"core/button",
					{
						text: __("Learn More", "triablocks"),
						className: "tb-cta-button-outline",
						style: {
							color: {
								text: "#ffffff",
							},
							border: {
								width: "1px",
								style: "solid",
								color: "#ffffff",
							},
						},
					},
				],
			],
		],
	];

	const templateChoice =
		layout === "with-heading" ? ctaTemplateWithHeading : ctaTemplate;

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Layout Settings", "triablocks")}>
					<SelectControl
						label={__("Layout Style", "triablocks")}
						value={layout}
						options={[
							{ label: __("Default", "triablocks"), value: "default" },
							{
								label: __("With Heading", "triablocks"),
								value: "with-heading",
							},
						]}
						onChange={(newLayout) => setAttributes({ layout: newLayout })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="tb-cta-content">
					<div className="tb-cta-text">
						<InnerBlocks template={templateChoice} templateLock={false} />
					</div>
				</div>
			</div>
		</>
	);
}
