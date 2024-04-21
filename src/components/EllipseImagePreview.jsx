/**
 * Renders an ellipse image preview component based on the provided source URL.
 *
 * @param {string} src - The URL of the image to be displayed. Defaults to an empty string.
 * @return {JSX.Element|string} - Returns either an image preview component or the string "Image not found" if the source URL is invalid.
 */
const EllipseImagePreview = ({ src = '' }) => {
  if (typeof src === 'string' && src.length > 0) {
    return (
      <div className="grid size-12 flex-shrink-0 place-items-center rounded-xl bg-gray-50">
        <img
          src={src}
          alt={src}
          className="w-full h-full object-cover rounded-full overflow-hidden"
        />
      </div>
    );
  } else {
    return 'Image not found';
  }
};

export default EllipseImagePreview;
