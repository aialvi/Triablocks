/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props
 * @param {Object} props.attributes
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const {
		layout,
		style,
		contentWidth,
		backgroundType,
		backgroundImage,
		overlayOpacity,
		alignment,
		buttonStyle,
		buttonSize,
		buttonFullWidth,
		buttonColor,
		buttonTextColor,
		buttonBorderColor,
		buttonBorderRadius,
		buttonBorderWidth,
		buttonPadding,
		buttonGap,
	} = attributes;

	// Generate class names for the block
	const classes = [
		`tb-cta-style-${style}`,
		`tb-cta-button-style-${buttonStyle}`,
		`tb-cta-button-size-${buttonSize}`,
		buttonFullWidth ? "tb-cta-button-full-width" : "",
	]
		.filter(Boolean)
		.join(" ");

	// Background style based on type
	const backgroundStyle = {};
	if (backgroundType === "image" && backgroundImage && backgroundImage.url) {
		backgroundStyle.backgroundImage = `url(${backgroundImage.url})`;
		backgroundStyle.backgroundSize = "cover";
		backgroundStyle.backgroundPosition = "center";
	}

	// Generate button styles for inline application
	const cssVars = {};

	if (buttonGap !== undefined) {
		cssVars["--cta-button-gap"] = `${buttonGap}px`;
	}

	if (buttonColor) {
		cssVars["--cta-button-bg-color"] = buttonColor;
	}

	if (buttonTextColor) {
		cssVars["--cta-button-text-color"] = buttonTextColor;
	}

	if (buttonBorderColor) {
		cssVars["--cta-button-border-color"] = buttonBorderColor;
	}

	if (buttonBorderRadius !== undefined) {
		cssVars["--cta-button-border-radius"] = `${buttonBorderRadius}px`;
	}

	if (buttonBorderWidth !== undefined) {
		cssVars["--cta-button-border-width"] = `${buttonBorderWidth}px`;
	}

	// Apply button padding if set
	if (buttonPadding) {
		const { top, right, bottom, left } = buttonPadding;
		if (top) cssVars["--cta-button-padding-top"] = top;
		if (right) cssVars["--cta-button-padding-right"] = right;
		if (bottom) cssVars["--cta-button-padding-bottom"] = bottom;
		if (left) cssVars["--cta-button-padding-left"] = left;
	}

	// Add CSS variables to background style
	const cssText = Object.entries(cssVars)
		.map(([key, value]) => `${key}: ${value};`)
		.join(" ");

	if (cssText) {
		backgroundStyle.cssText = cssText;
	}

	// Set block props with custom classes
	const blockProps = useBlockProps.save({
		className: `tb-cta-container ${classes}`,
		style: backgroundStyle,
	});

	// Container classes based on settings
	const containerClasses = [
		"tb-cta-content-wrap",
		`tb-cta-align-${alignment}`,
		`tb-cta-width-${contentWidth}`,
		`tb-cta-layout-${layout}`,
	].join(" ");

	return (
		<div {...blockProps}>
			{backgroundType === "image" && (
				<div
					className="tb-cta-overlay"
					style={{ opacity: overlayOpacity / 100 }}
				></div>
			)}

			<div className={containerClasses}>
				<div className="tb-cta-content">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
