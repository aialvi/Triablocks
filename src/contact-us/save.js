/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * The save function for the contact-us block
 */
export default function save({ attributes }) {
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

	const blockProps = useBlockProps.save({
		className: "tb-contact-us-container",
	});

	// Helper function to render the contact form
	const renderContactForm = () => {
		// If Contact Form 7 ID is provided, render shortcode placeholder
		if (formId) {
			return (
				<div className={`tb-contact-form tb-contact-form-${formStyle}`}>
					{`[contact-form-7 id="${formId}"]`}
				</div>
			);
		}

		// Otherwise, render the default form
		return (
			<div className={`tb-contact-form tb-contact-form-${formStyle}`}>
				<form className="tb-default-form">
					<div className="tb-form-group">
						<label htmlFor="name" className="tb-form-label">
							Full Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="tb-form-control"
							placeholder="Your name"
							required
						/>
					</div>

					<div className="tb-form-group">
						<label htmlFor="email" className="tb-form-label">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="tb-form-control"
							placeholder="Your email address"
							required
						/>
					</div>

					<div className="tb-form-group">
						<label htmlFor="subject" className="tb-form-label">
							Subject
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							className="tb-form-control"
							placeholder="Subject"
						/>
					</div>

					<div className="tb-form-group">
						<label htmlFor="message" className="tb-form-label">
							Message
						</label>
						<textarea
							id="message"
							name="message"
							className="tb-form-control"
							rows="5"
							placeholder="Your message"
							required
						></textarea>
					</div>

					<div className="tb-form-submit">
						<button type="submit" className="tb-btn tb-btn-primary">
							Send Message
						</button>
					</div>
				</form>
			</div>
		);
	};

	return (
		<div {...blockProps}>
			<div className="tb-contact-us-heading">
				{heading && (
					<RichText.Content
						tagName="h2"
						className="tb-contact-heading"
						value={heading}
					/>
				)}
				{subheading && (
					<RichText.Content
						tagName="p"
						className="tb-contact-subheading"
						value={subheading}
					/>
				)}
			</div>

			<div className="tb-contact-us-content">
				<div className="tb-contact-form-container">{renderContactForm()}</div>

				<div className="tb-contact-info-container">
					{showContactInfo && (
						<div className="tb-contact-info">
							<div className="tb-contact-info-heading">
								<h3>Contact Information</h3>
							</div>

							{address && (
								<div className="tb-contact-info-item">
									<div className="tb-contact-icon">
										<span className="dashicons dashicons-location"></span>
									</div>
									<div className="tb-contact-text">
										<RichText.Content tagName="p" value={address} />
									</div>
								</div>
							)}

							{email && (
								<div className="tb-contact-info-item">
									<div className="tb-contact-icon">
										<span className="dashicons dashicons-email"></span>
									</div>
									<div className="tb-contact-text">
										<RichText.Content tagName="p" value={email} />
									</div>
								</div>
							)}

							{phone && (
								<div className="tb-contact-info-item">
									<div className="tb-contact-icon">
										<span className="dashicons dashicons-phone"></span>
									</div>
									<div className="tb-contact-text">
										<RichText.Content tagName="p" value={phone} />
									</div>
								</div>
							)}
						</div>
					)}

					{showMap && mapEmbedUrl && (
						<div className="tb-contact-map">
							<iframe
								src={mapEmbedUrl}
								width="100%"
								height="300"
								style={{ border: 0 }}
								allowFullScreen=""
								loading="lazy"
								title="Google Maps"
							></iframe>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
