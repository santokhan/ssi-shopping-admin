import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Label from './input/Label';
import { twMerge } from 'tailwind-merge';
import replace_ from '../../utils/levelSplitter';

const Input = ({ setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        setTags(inputValue.trim());
        setInputValue('');
      }
      return;
    } else {
      console.log('Enter not working');
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      onKeyDown={handleInputKeyDown}
      placeholder="Type and press Enter"
      className="focus:outline-none px-2"
    />
  );
};

const InputBox = ({ children, className }) => {
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>{children}</div>
  );
};

export const InputLabel = ({ label = '', children, className = '' }) => {
  return (
    <div
      className={twMerge(
        'flex flex-col gap-2',
        'relative overflow-hidden',
        className,
      )}
    >
      <div className="space-y-2">
        <span className="font-semibold capitalize block">
          {replace_(label)}
        </span>
        {children}
      </div>
    </div>
  );
};

const TagsInput = ({
  valueFromServer = [],
  setContextValue = () => {},
  className = '',
  label,
  name,
}) => {
  function setValue(value = []) {
    setContextValue({
      target: {
        name,
        value,
      },
    });
  }
  return (
    <InputLabel label={label} className={className}>
      <div className="border p-[8px] rounded-lg h-[46px] flex items-center gap-2">
        {valueFromServer.map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 p-[5px] rounded-full inline-flex items-center gap-1 "
          >
            <span className="px-2 flex-shrink-0">{_}</span>
            <button
              onClick={() => {
                setValue(valueFromServer.filter((_) => _ !== _));
              }}
              className="bg-white rounded-full size-5 flex justify-center items-center overflow-hidden"
            >
              <XMarkIcon className="size-4" />
            </button>
          </div>
        ))}
        <Input
          setTags={(value) => {
            if (valueFromServer.length > 0) {
              if (valueFromServer.includes(value)) return;
              setValue([...valueFromServer, value]);
            } else {
              setValue([value]);
            }
          }}
        />
      </div>
    </InputLabel>
  );
};

export default TagsInput;
