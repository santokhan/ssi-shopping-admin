import { useEffect, useRef, useState } from 'react';
import Button from '../../Button';
import RemoveImage from '../../action-buttons/RemoveImage';
import { User } from 'iconsax-react';
import useAxios from '../../../context/useAxios';

const PreviewImage = ({ src = '' }) => {
  return src.length > 0 ? (
    <img
      src={src}
      alt="agent-image-input"
      className="w-full h-full object-cover rounded-xl"
    />
  ) : (
    <User className="w-16 lg:w-20 h-16 lg:h-20 m-auto text-gray-400" />
  );
};

const AgentImageInput = ({
  src = '',
  agentId = null,
  onChangeImage = (file) => {},
  API_URL = '',
  required = false,
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [inputImage, setInputImage] = useState(null);
  const fileInputRef = useRef(null);
  const { api } = useAxios();

  useEffect(() => {
    if (agentId || src) {
      setImageSrc(src);
    }
  }, [src]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!isValidFileType(file)) {
        alert('Invalid file type. Please select a JPEG or PNG file.');
        return;
      }
      if (!isValidFileSize(file)) {
        alert(
          'File size exceeds limit. Please select a file smaller than 5MB.',
        );
        return;
      }
      setInputImage(file);
      setImageSrc(URL.createObjectURL(file));
      onChangeImage(file);
    }
  };

  const isValidFileType = (file) => {
    const acceptedTypes = ['image/*'];
    return acceptedTypes.includes(file.type);
  };

  const isValidFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveClick = () => {
    if (agentId && API_URL) {
      // api
      //   .patch(API_URL, { photo: '' })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     setInputImage('');
      //     setImageSrc('');
      //   });
    } else {
      setInputImage('');
      setImageSrc('');
    }
  };

  return (
    <div className="flex items-end gap-4 rounded-lg text-gray-800">
      <div className="h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 relative bg-gray-50 rounded-xl border grid place-items-center">
        {(inputImage || imageSrc) && (
          <RemoveImage onRemove={handleRemoveClick} />
        )}
        <PreviewImage src={imageSrc} />
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Button onClick={handleButtonClick} variant="outline" withIcon={true}>
            Upload Photo
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            name="photo"
            accept="images/*"
            onChange={handleFileChange}
            className="opacity-0 absolute inset-0"
            required={required}
            defaultValue={''}
          />
        </div>
        <p>{'Photos must be JPEG or PNG format and least 2048x2048'}</p>
      </div>
    </div>
  );
};

export default AgentImageInput;
