import { Document } from 'iconsax-react';
import RemoveImage from '../action-buttons/RemoveImage';
import { twMerge } from 'tailwind-merge';

const PDFPreview = ({ src = '', onRemove = () => {}, type }) => {
  if (src) {
    return (
      <div className="flex items-end gap-4 rounded-lg text-gray-800">
        <div
          className={twMerge(
            'h-24 w-24 sm:h-40 sm:w-40 flex-shrink-0 relative overflow-hidden',
            'rounded-xl bg-gray-50 flex flex-col items-center justify-center',
          )}
        >
          <RemoveImage onRemove={onRemove} />
          {src && <Document className="size-16 lg:size-20 text-gray-400" />}
          <span className="font-medium text-center mt-2">
            {type.includes('pdf') && 'PDF'}
          </span>
        </div>
      </div>
    );
  }
};

export default PDFPreview;
