/**
 * Frontend JavaScript for the Contact Us block.
 *
 * This script adds form validation and submission handling for the default contact form.
 */

document.addEventListener("DOMContentLoaded", function () {
	// Find all default contact forms in Contact Us blocks
	const defaultForms = document.querySelectorAll(
		".wp-block-triablocks-contact-us .tb-default-form",
	);

	defaultForms.forEach((form) => {
		form.addEventListener("submit", function (event) {
			event.preventDefault();

			// Basic form validation
			const nameField = form.querySelector('input[name="name"]');
			const emailField = form.querySelector('input[name="email"]');
			const messageField = form.querySelector('textarea[name="message"]');

			// Reset validation styling
			const allFields = form.querySelectorAll(".tb-form-control");
			allFields.forEach((field) => {
				field.style.borderColor = "";
				const errorMsg = field.parentNode.querySelector(".tb-form-error");
				if (errorMsg) {
					errorMsg.remove();
				}
			});

			let isValid = true;

			// Validate required fields
			if (!nameField.value.trim()) {
				addErrorMessage(nameField, "Please enter your name");
				isValid = false;
			}

			if (!emailField.value.trim()) {
				addErrorMessage(emailField, "Please enter your email");
				isValid = false;
			} else if (!isValidEmail(emailField.value.trim())) {
				addErrorMessage(emailField, "Please enter a valid email address");
				isValid = false;
			}

			if (!messageField.value.trim()) {
				addErrorMessage(messageField, "Please enter your message");
				isValid = false;
			}

			if (isValid) {
				// Handle form submission - in a real implementation this would send data to the server
				const submitBtn = form.querySelector('button[type="submit"]');
				const originalText = submitBtn.textContent;

				// Show processing state
				submitBtn.disabled = true;
				submitBtn.textContent = "Sending...";

				// Simulate sending (replace with actual AJAX in production)
				setTimeout(() => {
					// Reset form
					form.reset();

					// Show success message
					const formContainer = form.closest(".tb-contact-form-container");
					const successMsg = document.createElement("div");
					successMsg.className = "tb-form-success-message";
					successMsg.innerHTML = `
                        <div class="tb-success-icon">✓</div>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. We'll get back to you soon.</p>
                        <button class="tb-btn tb-btn-secondary tb-send-another">Send Another Message</button>
                    `;

					// Replace form with success message
					form.style.display = "none";
					formContainer.appendChild(successMsg);

					// Set up "Send Another" button
					const sendAnotherBtn =
						formContainer.querySelector(".tb-send-another");
					if (sendAnotherBtn) {
						sendAnotherBtn.addEventListener("click", function () {
							successMsg.remove();
							form.style.display = "block";
							submitBtn.disabled = false;
							submitBtn.textContent = originalText;
						});
					}
				}, 1500);
			}
		});
	});

	// Helper function to add error message
	function addErrorMessage(field, message) {
		field.style.borderColor = "#e53e3e";
		const errorMsg = document.createElement("div");
		errorMsg.className = "tb-form-error";
		errorMsg.textContent = message;
		errorMsg.style.color = "#e53e3e";
		errorMsg.style.fontSize = "0.75rem";
		errorMsg.style.marginTop = "0.25rem";
		field.parentNode.appendChild(errorMsg);
	}

	// Helper function to validate email
	function isValidEmail(email) {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
});
