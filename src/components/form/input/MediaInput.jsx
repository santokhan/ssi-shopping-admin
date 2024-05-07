// inputFileMultiple

import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../Button';
import ImagePreview from '../ImagePreview';
import MediaInputIcon from '../../icons/MediaInputIcon';
import Print from '../../Print';
import imageSrcValidator from '../../../lib/image/validateSrc';
import getImageURL from '../../../utils/getImageURL';

const MediaInput = ({
  setValue = (key = '', value = []) => {},
  required = false,
  inputName = 'images',
  className = '',
  multiple = true,
  accept = 'image/*',
  name = '',
  value = '',
  onRemoveFromServer = (id) => {},
}) => {
  name = name || inputName;

  const onChangeFile = (e) => {
    const files = Array.from(e.target.files);

    // combile FileList and Array of URLs
    const addedFiles = [...files, ...value];

    setValue(name, addedFiles);
  };

  function onRemoveFromLocal(index) {
    if (Array.isArray(value) && typeof index == 'number') {
      setValue(
        'images',
        value.filter((_, i) => i !== index),
      );
    } else {
      console.log('Something went wrong', value, index);
    }
  }

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
            Drag and drop file{multiple ? 's' : ''} here
          </div>
          <div className="text-sm mb-6">File must be {accept} format</div>
          <Button variant="outline" withIcon={true}>
            Browse file{multiple ? 's' : ''}
          </Button>
        </div>
        {/* read-only don't set value */}
        <input
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-[1] bg-black"
          onChange={onChangeFile}
          required={required}
        />
      </label>
      <div className="flex gap-4 flex-wrap">
        {Array.isArray(value) &&
          value.map((_, i) => {
            let src = '';

            if (_ instanceof File) {
              src = imageSrcValidator(_);
            } else if (_.image) {
              const path = imageSrcValidator(_.image);
              src = getImageURL(path);
            }

            return (
              <ImagePreview
                key={i}
                src={src}
                onRemove={() => {
                  if (_ instanceof File) {
                    onRemoveFromLocal(i);
                  } else if (_.id) {
                    onRemoveFromServer(_.id);
                  }
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MediaInput;
