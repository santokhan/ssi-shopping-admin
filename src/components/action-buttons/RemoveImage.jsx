import { Trash } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';

const RemoveImage = ({ onRemove, className = '' }) => {
  return (
    <button
      type="button" // otherwise it will submit the form
      onClick={onRemove}
      className={twMerge(
        'absolute top-1 sm:top-2 left-1 sm:left-2',
        'w-6 sm:w-8 h-6 sm:h-8',
        'flex justify-center items-center',
        'bg-white rounded-md hover:text-red-500 border',
        className,
      )}
    >
      <Trash className="w-3 sm:w-4 h-3 sm:h-4" />
    </button>
  );
};

export default RemoveImage;
