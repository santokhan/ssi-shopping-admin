import { User } from 'iconsax-react';
import RemoveImage from '../action-buttons/RemoveImage';
import { twMerge } from 'tailwind-merge';

const ImagePreviewWithRemove = ({ src = '', onRemove = () => {} }) => {
  if (src) {
    return (
      <>
        <RemoveImage onRemove={onRemove} />
        {src ? (
          <img
            src={src}
            alt={src}
            className="w-full h-full object-cover rounded-lg"
            draggable={false}
            title={src}
          />
        ) : (
          <User className="w-16 lg:w-20 h-16 lg:h-20 m-auto text-gray-400" />
        )}
      </>
    );
  }
};

export default ImagePreviewWithRemove;
