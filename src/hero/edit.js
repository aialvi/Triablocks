/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

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
	BlockControls,
} from "@wordpress/block-editor";
import {
	Button,
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	Toolbar,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import "./editor.scss";

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
	const {
		image,
		overlayEnabled = false,
		overlayOpacity = 40,
		contentPosition = "center",
		textColor = "#ffffff",
		overlayColor = "#000000",
		minHeight = 500,
	} = attributes;

	const blockProps = useBlockProps({
		className: "tb-hero-full",
	});

	const onSelectImage = (selectedImage) => {
		setAttributes({
			image: {
				id: selectedImage.id,
				url: selectedImage.url,
				alt: selectedImage.alt || "",
			},
		});
	};

	const onRemoveImage = () => {
		setAttributes({ image: undefined });
	};

	const selectImageButton = image
		? __("Change Background Image", "triablocks")
		: __("Select Background Image", "triablocks");

	// Hero block template with Tailwind classes
	const template = [
		[
			"core/heading",
			{
				level: 2,
				placeholder: __("Add Hero Title", "triablocks"),
				className: "tb-hero-title",
			},
		],
		[
			"core/paragraph",
			{
				placeholder: __("Add your hero description here...", "triablocks"),
				className: "tb-hero-paragraph",
			},
		],
		[
			"core/buttons",
			{
				className: "tb-hero-buttons",
			},
			[
				[
					"core/button",
					{
						text: __("Primary Button", "triablocks"),
						className: "tb-hero-button tb-hero-button-primary",
					},
				],
				[
					"core/button",
					{
						text: __("Secondary Button", "triablocks"),
						className: "tb-hero-button tb-hero-button-secondary",
					},
				],
			],
		],
	];

	// Calculate inline styles
	const containerStyle = {
		minHeight: `${minHeight}px`,
	};

	const imageStyle = image?.url
		? {
				backgroundImage: `url(${image.url})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
		  }
		: {
				backgroundColor: "#f5f5f5",
		  };

	const overlayStyle = overlayEnabled
		? {
				backgroundColor: overlayColor,
				opacity: overlayOpacity / 100,
				transition: "opacity 0.5s ease-in-out, background-color 0.3s ease",
		  }
		: {};

	const contentStyle = {
		color: textColor,
	};

	// Content position class
	const getContentPositionClass = () => {
		switch (contentPosition) {
			case "top":
				return "tb-items-start";
			case "bottom":
				return "tb-items-end";
			default:
				return "tb-items-center";
		}
	};

	// Media upload UI components - reused for both toolbar and sidebar
	const ImageUploadUI = ({ open }) => (
		<Button
			onClick={open}
			className="tb-hero-select-image tb-bg-white tb-text-primary-700 tb-px-6 tb-py-3 tb-rounded-md tb-font-medium tb-transition-all tb-duration-300 hover:tb-shadow-lg focus:tb-outline-none focus:tb-ring-2 focus:tb-ring-primary-500"
			icon="format-image"
		>
			{selectImageButton}
		</Button>
	);

	return (
		<>
			{/* Add BlockControls for toolbar image options */}
			<BlockControls>
				<Toolbar>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={["image"]}
							value={image?.id}
							render={({ open }) => (
								<Button
									className="components-toolbar__control"
									label={selectImageButton}
									icon="format-image"
									onClick={open}
								/>
							)}
						/>
					</MediaUploadCheck>

					{image?.id && (
						<Button
							className="components-toolbar__control"
							label={__("Remove image", "triablocks")}
							icon="trash"
							onClick={onRemoveImage}
						/>
					)}
				</Toolbar>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__("Background Image", "triablocks")}>
					<div className="tb-hero-image-controls">
						{!image?.url ? (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={["image"]}
									value={image?.id}
									render={({ open }) => <ImageUploadUI open={open} />}
								/>
							</MediaUploadCheck>
						) : (
							<>
								<div
									className="tb-hero-image-preview"
									style={{
										backgroundImage: `url(${image.url})`,
										height: "150px",
										backgroundSize: "cover",
										backgroundPosition: "center",
										marginBottom: "10px",
										borderRadius: "4px",
									}}
								></div>
								<div className="tb-hero-image-buttons">
									<MediaUploadCheck>
										<MediaUpload
											onSelect={onSelectImage}
											allowedTypes={["image"]}
											value={image?.id}
											render={({ open }) => (
												<Button onClick={open} variant="secondary">
													{__("Replace Image", "triablocks")}
												</Button>
											)}
										/>
									</MediaUploadCheck>
									<Button
										onClick={onRemoveImage}
										variant="link"
										isDestructive
									>
										{__("Remove Image", "triablocks")}
									</Button>
								</div>
							</>
						)}
					</div>
				</PanelBody>

				<PanelBody title={__("Layout Settings", "triablocks")}>
					<RangeControl
						label={__("Minimum Height (px)", "triablocks")}
						value={minHeight}
						onChange={(value) => setAttributes({ minHeight: value })}
						min={300}
						max={1000}
					/>
					<SelectControl
						label={__("Content Vertical Alignment", "triablocks")}
						value={contentPosition}
						options={[
							{ label: __("Top", "triablocks"), value: "top" },
							{ label: __("Center", "triablocks"), value: "center" },
							{ label: __("Bottom", "triablocks"), value: "bottom" },
						]}
						onChange={(value) => setAttributes({ contentPosition: value })}
					/>
				</PanelBody>
				<PanelBody title={__("Overlay Settings", "triablocks")}>
					<ToggleControl
						label={__("Enable dark overlay", "triablocks")}
						checked={overlayEnabled}
						onChange={(value) => setAttributes({ overlayEnabled: value })}
					/>
					{overlayEnabled && (
						<>
							<RangeControl
								label={__("Overlay Opacity", "triablocks")}
								value={overlayOpacity}
								onChange={(value) => setAttributes({ overlayOpacity: value })}
								min={0}
								max={100}
							/>
							<div>
								<p>{__("Overlay Color", "triablocks")}</p>
								<ColorPalette
									value={overlayColor}
									onChange={(value) => setAttributes({ overlayColor: value })}
								/>
							</div>
						</>
					)}
				</PanelBody>
				<PanelBody title={__("Text Settings", "triablocks")}>
					<div>
						<p>{__("Text Color", "triablocks")}</p>
						<ColorPalette
							value={textColor}
							onChange={(value) => setAttributes({ textColor: value })}
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div
					className="tb-hero-container tb-relative tb-w-full tb-overflow-hidden"
					style={containerStyle}
				>
					<div
						className="tb-hero-background tb-absolute tb-inset-0 hover:tb-scale-105"
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
							className="tb-hero-content tb-max-w-4xl tb-w-full tb-relative tb-z-10 tb-transition-all tb-duration-500 tb-ease-in-out"
							style={contentStyle}
						>
							<InnerBlocks template={template} />
						</div>
					</div>

					{!image?.url && (
						<div className="tb-hero-placeholder tb-absolute tb-inset-0 tb-flex tb-items-center tb-justify-center">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectImage}
									allowedTypes={["image"]}
									value={image?.id}
									render={({ open }) => <ImageUploadUI open={open} />}
								/>
							</MediaUploadCheck>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
