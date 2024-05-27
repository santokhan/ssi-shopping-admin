import { User } from 'iconsax-react';
import RemoveImage from '../action-buttons/RemoveImage';
import { twMerge } from 'tailwind-merge';

const ImagePreviewWithRemove = ({ src = '', onRemove = () => {}, ...rest }) => {
  if (src) {
    return (
      <div
        className={twMerge(
          'relative',
          'h-24 w-24 sm:h-40 sm:w-40 flex-shrink-0 overflow-hidden',
          'border rounded-xl text-gray-800',
        )}
        {...rest}
      >
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
      </div>
    );
  }
};

export default ImagePreviewWithRemove;
