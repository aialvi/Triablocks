/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
	BlockControls,
	AlignmentControl,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	Button,
	Placeholder,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import "./editor.scss";

/**
 * The edit function for the contact-us block
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		heading,
		subheading,
		formStyle,
		formId,
		showMap,
		mapEmbedUrl,
		showContactInfo,
		address,
		email,
		phone,
	} = attributes;

	const blockProps = useBlockProps({
		className: "tb-contact-us-container",
	});

	// Detect if Contact Form 7 is active
	const hasContactForm7 = window.triablocks?.hasContactForm7;

	// Form styles options
	const formStyleOptions = [
		{ label: __("Standard", "triablocks"), value: "standard" },
		{ label: __("Modern", "triablocks"), value: "modern" },
		{ label: __("Bordered", "triablocks"), value: "bordered" },
	];

	// Sample contact form HTML for preview - in real implementation, this would come from CF7 or other plugin
	const getFormPreview = () => {
		return (
			<div className={`tb-contact-form tb-contact-form-${formStyle}`}>
				<div className="tb-form-group">
					<label className="tb-form-label">
						{__("Full Name", "triablocks")}
					</label>
					<input
						type="text"
						className="tb-form-control"
						placeholder={__("Your name", "triablocks")}
					/>
				</div>
				<div className="tb-form-group">
					<label className="tb-form-label">{__("Email", "triablocks")}</label>
					<input
						type="email"
						className="tb-form-control"
						placeholder={__("Your email address", "triablocks")}
					/>
				</div>
				<div className="tb-form-group">
					<label className="tb-form-label">{__("Subject", "triablocks")}</label>
					<input
						type="text"
						className="tb-form-control"
						placeholder={__("Subject", "triablocks")}
					/>
				</div>
				<div className="tb-form-group">
					<label className="tb-form-label">{__("Message", "triablocks")}</label>
					<textarea
						className="tb-form-control"
						rows="5"
						placeholder={__("Your message", "triablocks")}
					></textarea>
				</div>
				<div className="tb-form-submit">
					<button className="tb-btn tb-btn-primary">
						{__("Send Message", "triablocks")}
					</button>
				</div>
			</div>
		);
	};

	// Contact Form 7 form selector
	const ContactFormSelector = () => {
		if (!hasContactForm7) {
			return (
				<Placeholder
					icon="email"
					label={__("Contact Form", "triablocks")}
					instructions={__(
						"Contact Form 7 plugin is not detected. Install it to use dynamic forms or use the default form layout.",
						"triablocks",
					)}
				>
					<Button
						variant="primary"
						href="https://wordpress.org/plugins/contact-form-7/"
						target="_blank"
						rel="noopener noreferrer"
					>
						{__("Get Contact Form 7", "triablocks")}
					</Button>
				</Placeholder>
			);
		}

		return (
			<div className="tb-form-selector">
				<TextControl
					label={__("Contact Form 7 Shortcode ID", "triablocks")}
					value={formId}
					onChange={(value) => setAttributes({ formId: value })}
					help={__(
						'Enter the form ID, e.g. "123" for [contact-form-7 id="123"]',
						"triablocks",
					)}
				/>
				<p className="tb-form-help">
					{__("You can find form IDs in the Contact menu.", "triablocks")}
				</p>
			</div>
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Form Settings", "triablocks")}>
					<SelectControl
						label={__("Form Style", "triablocks")}
						value={formStyle}
						options={formStyleOptions}
						onChange={(value) => setAttributes({ formStyle: value })}
					/>
					<ContactFormSelector />
				</PanelBody>

				<PanelBody title={__("Map Settings", "triablocks")}>
					<ToggleControl
						label={__("Show Map", "triablocks")}
						checked={showMap}
						onChange={() => setAttributes({ showMap: !showMap })}
					/>
					{showMap && (
						<TextControl
							label={__("Google Maps Embed URL", "triablocks")}
							value={mapEmbedUrl}
							onChange={(value) => setAttributes({ mapEmbedUrl: value })}
							help={__("Paste the embed URL from Google Maps", "triablocks")}
						/>
					)}
				</PanelBody>

				<PanelBody title={__("Contact Information", "triablocks")}>
					<ToggleControl
						label={__("Show Contact Information", "triablocks")}
						checked={showContactInfo}
						onChange={() =>
							setAttributes({ showContactInfo: !showContactInfo })
						}
					/>
					{showContactInfo && (
						<>
							<TextControl
								label={__("Address", "triablocks")}
								value={address}
								onChange={(value) => setAttributes({ address: value })}
							/>
							<TextControl
								label={__("Email", "triablocks")}
								value={email}
								onChange={(value) => setAttributes({ email: value })}
							/>
							<TextControl
								label={__("Phone", "triablocks")}
								value={phone}
								onChange={(value) => setAttributes({ phone: value })}
							/>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="tb-contact-us-heading">
					<RichText
						tagName="h2"
						className="tb-contact-heading"
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
						placeholder={__("Get In Touch", "triablocks")}
					/>
					<RichText
						tagName="p"
						className="tb-contact-subheading"
						value={subheading}
						onChange={(value) => setAttributes({ subheading: value })}
						placeholder={__(
							"We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
							"triablocks",
						)}
					/>
				</div>

				<div className="tb-contact-us-content">
					<div className="tb-contact-form-container">{getFormPreview()}</div>

					<div className="tb-contact-info-container">
						{showContactInfo && (
							<div className="tb-contact-info">
								<div className="tb-contact-info-heading">
									<h3>{__("Contact Information", "triablocks")}</h3>
								</div>

								<div className="tb-contact-info-item">
									<div className="tb-contact-icon">
										<span className="dashicons dashicons-location"></span>
									</div>
									<div className="tb-contact-text">
										<RichText
											tagName="p"
											value={address}
											onChange={(value) => setAttributes({ address: value })}
											placeholder={__("Address", "triablocks")}
										/>
									</div>
								</div>

								<div className="tb-contact-info-item">
									<div className="tb-contact-icon">
										<span className="dashicons dashicons-email"></span>
									</div>
									<div className="tb-contact-text">
										<RichText
											tagName="p"
											value={email}
											onChange={(value) => setAttributes({ email: value })}
											placeholder={__("Email", "triablocks")}
										/>
									</div>
								</div>

								<div className="tb-contact-info-item">
									<div className="tb-contact-icon">
										<span className="dashicons dashicons-phone"></span>
									</div>
									<div className="tb-contact-text">
										<RichText
											tagName="p"
											value={phone}
											onChange={(value) => setAttributes({ phone: value })}
											placeholder={__("Phone", "triablocks")}
										/>
									</div>
								</div>
							</div>
						)}

						{showMap && (
							<div className="tb-contact-map">
								{mapEmbedUrl ? (
									<iframe
										src={mapEmbedUrl}
										width="100%"
										height="300"
										style={{ border: 0 }}
										allowFullScreen=""
										loading="lazy"
										title={__("Google Maps", "triablocks")}
									></iframe>
								) : (
									<div className="tb-map-placeholder">
										<span className="dashicons dashicons-location"></span>
										<p>
											{__(
												"Enter a Google Maps URL in the block settings",
												"triablocks",
											)}
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
