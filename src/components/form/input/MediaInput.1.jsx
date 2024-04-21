import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../Button';
import ImagePreview from '../ImagePreview';
import MediaInputIcon from '../../icons/MediaInputIcon';
import { addToFileList, removeFileFromFileList } from './MediaInput';

export const MediaInput = ({
  value,
  setValue,
  required = false,
  inputName = 'images',
  className = '',
}) => {
  const [selectedFiles, setSelectedFiles] = React.useState(
    value[inputName] || [],
  );
  const [input, setInput] = React.useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    // const filesArray = Array.from(e.target.files);
    // setInput(e.target.files);
    // Update selectedFiles state with the new files
    setSelectedFiles((prev) => {
      return addToFileList(prev, e.target.files);
    });
  };

  const handleRemoveImage = (index) => {
    setSelectedFiles((prev) => {
      return removeFileFromFileList(prev, prev[index]);
    });
  };

  useEffect(() => {
    setValue(inputName, selectedFiles);
  }, [selectedFiles]);

  return (
    <div className={twMerge('w-full space-y-6', className)}>
      <label
        className={twMerge(
          'border-2 border-dashed rounded-lg border-gray-300 bg-gray-50',
          ' p-6 py-8 lg:py-16 text-center w-full',
          'flex flex-col items-center',
          'relative',
        )}
      >
        <div className="mb-6">
          <MediaInputIcon />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold mb-1">
            Drag and drop images here
          </div>
          <div className="text-sm mb-6">
            Photos must be JPEG or PNG format and least 2048x768
          </div>
          <Button variant="outline" withIcon={true}>
            Browse Files
          </Button>
        </div>
        <input
          name={inputName}
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-[1] bg-black"
          onChange={handleFileSelect}
          required={required}
          value={input}
        />
      </label>
      <div className="flex gap-4 flex-wrap">
        {selectedFiles.length > 0
          ? [...selectedFiles].map((file, index) => (
              <ImagePreview
                key={index}
                src={URL.createObjectURL(file)}
                onRemove={() => handleRemoveImage(index)}
              />
            ))
          : null}
      </div>
    </div>
  );
};
