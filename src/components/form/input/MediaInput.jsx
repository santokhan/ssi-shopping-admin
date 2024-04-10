import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../Button';
import ImagePreview from '../ImagePreview';
import MediaInputIcon from '../../icons/MediaInput';

// Example function to remove a file from FileList
function removeFileFromFileList(fileList, fileToRemove) {
  const newFileList = new DataTransfer(); // Create a new DataTransfer object

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];

    // Add files to the new DataTransfer object except the file to be removed
    if (file !== fileToRemove) {
      newFileList.items.add(file);
    }
  }

  return newFileList.files; // Return the new FileList from the DataTransfer object
}

// Function to add a file to a FileList
function addToFileList(fileList, inputFiles) {
  const newFileList = new DataTransfer(); // Create a new DataTransfer object

  // Add existing files from original FileList to the new DataTransfer object
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    newFileList.items.add(file);
  }
  // Add existing files from input Files to the new DataTransfer object
  for (let i = 0; i < inputFiles.length; i++) {
    const file = inputFiles[i];
    newFileList.items.add(file);
  }

  return newFileList.files; // Return the new FileList from the DataTransfer object
}

const MediaInput = ({ value, setValue, className = '' }) => {
  const inputName = 'images';
  const [selectedFiles, setSelectedFiles] = React.useState(
    value[inputName] || [],
  );
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    // const filesArray = Array.from(e.target.files);

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
          name="media"
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="absolute top-0 left-0 w-full h-full opacity-0 z-[1] bg-black"
          onChange={handleFileSelect}
          required
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

export default MediaInput;
