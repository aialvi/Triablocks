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
	MediaUpload,
	MediaUploadCheck,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	ColorPalette,
} from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	Button,
	ButtonGroup,
	RadioControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		layout = "default",
		style = "standard",
		contentWidth = "contained",
		backgroundType = "color",
		backgroundColor,
		backgroundImage,
		overlayOpacity = 40,
		alignment = "center",
		buttonStyle = "filled",
		buttonSize = "medium",
		buttonFullWidth = false,
		buttonColor,
		buttonTextColor,
		buttonBorderColor,
		buttonBorderRadius,
		buttonBorderWidth = 1,
		buttonPadding,
		buttonGap = 16,
	} = attributes;

	// Get block props with custom classes
	const blockProps = useBlockProps({
		className: `tb-cta-container tb-cta-style-${style}`,
	});

	// CTA block template with minimal design
	const ctaTemplateMinimal = [
		[
			"core/paragraph",
			{
				placeholder: __("Add your call to action text here...", "triablocks"),
				className: "tb-cta-paragraph",
				content: __(
					"Ready to get started? Join thousands of satisfied customers today!",
					"triablocks"
				),
			},
		],
		[
			"core/button",
			{
				text: __("Get Started", "triablocks"),
				className: "tb-cta-button",
				align: alignment,
			},
		],
	];

	// CTA template with heading and subtext
	const ctaTemplateWithHeading = [
		[
			"core/heading",
			{
				level: 3,
				className: "tb-cta-heading",
				content: __("Try Our Service Today", "triablocks"),
				align: alignment,
			},
		],
		[
			"core/paragraph",
			{
				placeholder: __("Add your call to action text here...", "triablocks"),
				className: "tb-cta-paragraph",
				content: __(
					"Ready to take your business to the next level? Join thousands of satisfied customers!",
					"triablocks"
				),
				align: alignment,
			},
		],
		[
			"core/buttons",
			{
				className: "tb-cta-buttons",
				align: alignment,
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

	// CTA template with split content
	const ctaTemplateSplit = [
		[
			"core/columns",
			{
				className: "tb-cta-columns",
			},
			[
				[
					"core/column",
					{
						className: "tb-cta-column tb-cta-column-left",
					},
					[
						[
							"core/heading",
							{
								level: 3,
								className: "tb-cta-heading",
								content: __("Transform Your Business", "triablocks"),
							},
						],
						[
							"core/paragraph",
							{
								className: "tb-cta-description",
								content: __(
									"Elevate your online presence with our powerful tools and expert guidance.",
									"triablocks"
								),
							},
						],
					],
				],
				[
					"core/column",
					{
						className: "tb-cta-column tb-cta-column-right",
					},
					[
						[
							"core/buttons",
							{
								className: "tb-cta-buttons",
								align: "right",
							},
							[
								[
									"core/button",
									{
										text: __("Get Started Today", "triablocks"),
										className: "tb-cta-button",
									},
								],
							],
						],
					],
				],
			],
		],
	];

	// CTA template with stats
	const ctaTemplateWithStats = [
		[
			"core/heading",
			{
				level: 2,
				className: "tb-cta-heading",
				align: "center",
				content: __("Join Thousands of Happy Customers", "triablocks"),
			},
		],
		[
			"core/columns",
			{
				className: "tb-cta-stats",
			},
			[
				[
					"core/column",
					{},
					[
						[
							"core/heading",
							{
								level: 3,
								className: "tb-stat-number",
								align: "center",
								content: "5000+",
							},
						],
						[
							"core/paragraph",
							{
								className: "tb-stat-label",
								align: "center",
								content: __("Happy Customers", "triablocks"),
							},
						],
					],
				],
				[
					"core/column",
					{},
					[
						[
							"core/heading",
							{
								level: 3,
								className: "tb-stat-number",
								align: "center",
								content: "98%",
							},
						],
						[
							"core/paragraph",
							{
								className: "tb-stat-label",
								align: "center",
								content: __("Satisfaction Rate", "triablocks"),
							},
						],
					],
				],
				[
					"core/column",
					{},
					[
						[
							"core/heading",
							{
								level: 3,
								className: "tb-stat-number",
								align: "center",
								content: "24/7",
							},
						],
						[
							"core/paragraph",
							{
								className: "tb-stat-label",
								align: "center",
								content: __("Customer Support", "triablocks"),
							},
						],
					],
				],
			],
		],
		[
			"core/buttons",
			{
				className: "tb-cta-buttons",
				align: "center",
			},
			[
				[
					"core/button",
					{
						text: __("Start Your Free Trial", "triablocks"),
						className: "tb-cta-button",
					},
				],
			],
		],
	];

	// Select template based on layout choice
	const getTemplateChoice = () => {
		switch (layout) {
			case 'with-heading':
				return ctaTemplateWithHeading;
			case 'split':
				return ctaTemplateSplit;
			case 'with-stats':
				return ctaTemplateWithStats;
			default:
				return ctaTemplateMinimal;
		}
	};

	const templateChoice = getTemplateChoice();

	// Background style based on type
	const backgroundStyle = {};
	if (backgroundType === 'image' && backgroundImage && backgroundImage.url) {
		backgroundStyle.backgroundImage = `url(${backgroundImage.url})`;
		backgroundStyle.backgroundSize = 'cover';
		backgroundStyle.backgroundPosition = 'center';
	}

	// Overlay style 
	const overlayStyle = {
		opacity: overlayOpacity / 100,
	};

	// Container classes based on settings
	const containerClasses = [
		'tb-cta-content-wrap',
		`tb-cta-align-${alignment}`,
		`tb-cta-width-${contentWidth}`,
	].join(' ');

	// Generate button styles for inline application
	const getButtonStyleVariables = () => {
		const vars = {};

		if (buttonGap) {
			vars['--cta-button-gap'] = `${buttonGap}px`;
		}

		if (buttonColor) {
			vars['--cta-button-bg-color'] = buttonColor;
		}
		
		if (buttonTextColor) {
			vars['--cta-button-text-color'] = buttonTextColor;
		}
		
		if (buttonBorderColor) {
			vars['--cta-button-border-color'] = buttonBorderColor;
		}
		
		if (buttonBorderRadius !== undefined) {
			vars['--cta-button-border-radius'] = `${buttonBorderRadius}px`;
		}
		
		if (buttonBorderWidth !== undefined) {
			vars['--cta-button-border-width'] = `${buttonBorderWidth}px`;
		}

		return vars;
	};

	// Add button style variables to inline style
	backgroundStyle.cssText = Object.entries(getButtonStyleVariables())
		.map(([key, value]) => `${key}: ${value};`)
		.join(' ');

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Layout Settings", "triablocks")}>
					<SelectControl
						label={__("Layout Style", "triablocks")}
						value={layout}
						options={[
							{ label: __("Default", "triablocks"), value: "default" },
							{ label: __("With Heading", "triablocks"), value: "with-heading" },
							{ label: __("Split Content", "triablocks"), value: "split" },
							{ label: __("With Stats", "triablocks"), value: "with-stats" },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
					
					<SelectControl
						label={__("Design Style", "triablocks")}
						value={style}
						options={[
							{ label: __("Standard", "triablocks"), value: "standard" },
							{ label: __("Modern", "triablocks"), value: "modern" },
							{ label: __("Minimal", "triablocks"), value: "minimal" },
							{ label: __("Gradient", "triablocks"), value: "gradient" },
							{ label: __("Boxed", "triablocks"), value: "boxed" },
						]}
						onChange={(value) => setAttributes({ style: value })}
					/>
					
					<SelectControl
						label={__("Content Width", "triablocks")}
						value={contentWidth}
						options={[
							{ label: __("Contained", "triablocks"), value: "contained" },
							{ label: __("Full Width", "triablocks"), value: "full" },
						]}
						onChange={(value) => setAttributes({ contentWidth: value })}
					/>
					
					<RadioControl
						label={__("Content Alignment", "triablocks")}
						selected={alignment}
						options={[
							{ label: __("Left", "triablocks"), value: "left" },
							{ label: __("Center", "triablocks"), value: "center" },
							{ label: __("Right", "triablocks"), value: "right" },
						]}
						onChange={(value) => setAttributes({ alignment: value })}
					/>
				</PanelBody>

				<PanelBody title={__("Background Settings", "triablocks")}>
					<SelectControl
						label={__("Background Type", "triablocks")}
						value={backgroundType}
						options={[
							{ label: __("Color", "triablocks"), value: "color" },
							{ label: __("Image", "triablocks"), value: "image" },
						]}
						onChange={(value) => setAttributes({ backgroundType: value })}
					/>

					{backgroundType === "color" && (
						<div className="tb-color-option">
							<span>{__("Background Color", "triablocks")}</span>
							<ColorPalette
								value={backgroundColor}
								onChange={(color) => setAttributes({ backgroundColor: color })}
							/>
						</div>
					)}

					{backgroundType === "image" && (
						<>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => setAttributes({ backgroundImage: media })}
									allowedTypes={["image"]}
									value={backgroundImage ? backgroundImage.id : ""}
									render={({ open }) => (
										<div>
											<Button
												isPrimary
												onClick={open}
												className="tb-media-button"
											>
												{!backgroundImage
													? __("Choose Background Image", "triablocks")
													: __("Replace Image", "triablocks")}
											</Button>
											
											{backgroundImage && backgroundImage.url && (
												<>
													<div className="tb-image-preview">
														<img src={backgroundImage.url} alt={backgroundImage.alt || ""} />
													</div>
													<Button
														isDestructive
														onClick={() => setAttributes({ backgroundImage: null })}
													>
														{__("Remove Image", "triablocks")}
													</Button>
												</>
											)}
										</div>
									)}
								/>
							</MediaUploadCheck>

							<RangeControl
								label={__("Overlay Opacity", "triablocks")}
								value={overlayOpacity}
								onChange={(value) => setAttributes({ overlayOpacity: value })}
								min={0}
								max={100}
							/>
						</>
					)}
				</PanelBody>

				<PanelBody title={__("Button Settings", "triablocks")} initialOpen={false}>
					<SelectControl
						label={__("Button Style", "triablocks")}
						value={buttonStyle}
						options={[
							{ label: __("Filled", "triablocks"), value: "filled" },
							{ label: __("Outline", "triablocks"), value: "outline" },
							{ label: __("Ghost", "triablocks"), value: "ghost" },
							{ label: __("Pill", "triablocks"), value: "pill" },
						]}
						onChange={(value) => setAttributes({ buttonStyle: value })}
					/>
					
					<SelectControl
						label={__("Button Size", "triablocks")}
						value={buttonSize}
						options={[
							{ label: __("Small", "triablocks"), value: "small" },
							{ label: __("Medium", "triablocks"), value: "medium" },
							{ label: __("Large", "triablocks"), value: "large" },
							{ label: __("Extra Large", "triablocks"), value: "xlarge" },
						]}
						onChange={(value) => setAttributes({ buttonSize: value })}
					/>
					
					<ToggleControl
						label={__("Full Width Buttons", "triablocks")}
						checked={buttonFullWidth}
						onChange={(value) => setAttributes({ buttonFullWidth: value })}
					/>
					
					<RangeControl
						label={__("Button Gap", "triablocks")}
						value={buttonGap}
						onChange={(value) => setAttributes({ buttonGap: value })}
						min={0}
						max={48}
						help={__("Space between multiple buttons", "triablocks")}
					/>
					
					<RangeControl
						label={__("Border Radius", "triablocks")}
						value={buttonBorderRadius}
						onChange={(value) => setAttributes({ buttonBorderRadius: value })}
						min={0}
						max={50}
					/>
					
					{buttonStyle === "outline" && (
						<RangeControl
							label={__("Border Width", "triablocks")}
							value={buttonBorderWidth}
							onChange={(value) => setAttributes({ buttonBorderWidth: value })}
							min={1}
							max={5}
						/>
					)}
					
					<div className="tb-color-settings">
						<p className="tb-color-label">{__("Button Colors", "triablocks")}</p>
						
						<div className="tb-color-option">
							<span>{__("Background Color", "triablocks")}</span>
							<ColorPalette
								value={buttonColor}
								onChange={(color) => setAttributes({ buttonColor: color })}
							/>
						</div>
						
						<div className="tb-color-option">
							<span>{__("Text Color", "triablocks")}</span>
							<ColorPalette
								value={buttonTextColor}
								onChange={(color) => setAttributes({ buttonTextColor: color })}
							/>
						</div>
						
						{buttonStyle === "outline" && (
							<div className="tb-color-option">
								<span>{__("Border Color", "triablocks")}</span>
								<ColorPalette
									value={buttonBorderColor}
									onChange={(color) => setAttributes({ buttonBorderColor: color })}
								/>
							</div>
						)}
					</div>
					
					<BoxControl
						label={__("Button Padding", "triablocks")}
						values={buttonPadding}
						onChange={(value) => setAttributes({ buttonPadding: value })}
						units={[
							{ value: 'px', label: 'px', default: 0 },
							{ value: 'em', label: 'em', default: 0 },
							{ value: 'rem', label: 'rem', default: 0 },
						]}
						allowReset={true}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} style={backgroundStyle}>
				{backgroundType === "image" && (
					<div className="tb-cta-overlay" style={overlayStyle}></div>
				)}
				
				<div className={containerClasses}>
					<div className="tb-cta-content">
						<InnerBlocks
							template={templateChoice}
							templateLock={false}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
