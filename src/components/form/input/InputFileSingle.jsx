import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../Button';
import ImagePreview from '../ImagePreview';
import MediaInputIcon from '../../icons/MediaInputIcon';
import imageSrcValidator from '../../../lib/image/validateSrc';

const InputFileSingle = ({
  setValue,
  required = false,
  className = '',
  accept = 'image/*',
  name = '',
  value = '',
  onRemoveFromServer = () => {},
}) => {
  return (
    <div className={twMerge('w-full space-y-6', className)}>
      <label
        className={twMerge(
          'border-2 border-dashed rounded-lg border-gray-300 bg-gray-50',
          'p-6 py-8 lg:py-16 text-center w-full',
          'flex flex-col items-center',
          'relative',
        )}
      >
        <div className="mb-6" title="Gallery icon for large input box">
          <MediaInputIcon />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold mb-1">
            Drag and drop file here
          </div>
          <div className="text-sm mb-6">File must be {accept} format</div>
          <Button variant="outline" withIcon={true}>
            Browse file
          </Button>
        </div>
        {/* read-only don't set value */}
        <input
          name={name}
          type="file"
          accept={accept}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-[1] bg-black"
          onChange={(e) => {
            setValue(name, e.target.files[0]);
          }}
          required={required}
        />
      </label>

      {/* value = 'url' || 'File' */}
      {value && (
        <div className="flex gap-4 flex-wrap">
          <ImagePreview
            src={imageSrcValidator(value)}
            onRemove={() => {
              setValue(name, '');
              onRemoveFromServer();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InputFileSingle;
