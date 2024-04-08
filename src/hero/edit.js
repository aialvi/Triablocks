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
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

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
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { image } = attributes;

	const selectImageButton = image
		? __("Change Image", "tkm-blocks")
		: __("Select Image", "tkm-blocks");

	const template = [
		[
			"core/heading",
			{
				placeholder: "Lorem Ipsum",
				level: 2,
				className: "tria-hero__title",
			},
		],
		[
			"core/paragraph",
			{
				placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				className: "tria-hero__paragraph",
			},
		],
		[
			"core/buttons",
			{
				className: "tria-hero__buttons",
			},
		],
	];

	return (
		<div {...useBlockProps()}>
			<div className="tria-hero__column--text">
				<InnerBlocks template={template} />
			</div>
			<div
				className="tria-hero__column--image"
				style={{ backgroundImage: `url(${image?.url})` }}
			>
				<MediaUploadCheck>
					<MediaUpload
						allowedTypes={["image"]}
						onSelect={(image) => {
							setAttributes({ image });
						}}
						value={image}
						render={({ open }) => {
							return (
								<Button
									className="tria-hero__select-image-button"
									onClick={open}
								>
									{selectImageButton}
								</Button>
							);
						}}
					/>
				</MediaUploadCheck>
			</div>
		</div>
	);
}
