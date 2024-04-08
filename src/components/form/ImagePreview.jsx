import { User } from 'iconsax-react';
import RemoveImage from '../action-buttons/RemoveImage';
import { twMerge } from 'tailwind-merge';

const ImagePreview = ({ src = '', onRemove }) => {
  return (
    <div className="flex items-end gap-4 rounded-lg text-gray-800">
      <div
        className={twMerge(
          'h-24 w-24 sm:h-40 sm:w-40 flex-shrink-0 relative overflow-hidden',
          'rounded-xl bg-gray-50 grid align-items-center',
        )}
      >
        <RemoveImage onRemove={onRemove} />
        {src ? (
          <img
            src={src}
            alt={src}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <User className="w-16 lg:w-20 h-16 lg:h-20 m-auto text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
