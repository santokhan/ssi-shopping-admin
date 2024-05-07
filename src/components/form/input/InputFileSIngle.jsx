import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../Button';
import ImagePreview from '../ImagePreview';
import MediaInputIcon from '../../icons/MediaInputIcon';

const MediaInput = ({
  setValue,
  required = false,
  inputName = 'images',
  className = '',
  src = '',
  accept = 'image/*',
  name = '',
  value = '',
}) => {
  name = name || inputName;

  const handleFileSelect = (e) => {
    setValue(name, e.target.files[0]);
  };

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

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
        <div className="mb-6">
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
          onChange={handleFileSelect}
          required={required}
        />
      </label>
      <div className="flex gap-4 flex-wrap">
        {src.length > 0 && value.length === 0 ? (
          <ImagePreview src={src} />
        ) : null}
        {value && !value.name.includes('pdf') && (
          <ImagePreview
            src={URL.createObjectURL(value)}
            onRemove={() => {
              setValue(name, '');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MediaInput;
