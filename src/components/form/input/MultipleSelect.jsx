import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import InputBox from '../InputBox';
import Label from './Label';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/16/solid';
import replace_ from '../../../utils/levelSplitter';
import InputError from '../InputError';

function MultipleSelect({
  options = [],
  label = '',
  error = '',
  className = '',
  onSelect,
  value,
}) {
  return (
    <InputBox className={twMerge(className)}>
      <Label>
        <span className="font-semibold capitalize">{replace_(label)}</span>
        <Listbox
          value={value}
          onChange={(selectedOptions) => {
            //  flag variable
            let filtered = [];

            selectedOptions.forEach((option) => {
              if (
                filtered.some((selected) => selected.value === option.value)
              ) {
                filtered = filtered.filter(
                  (selected) => selected.value !== option.value,
                );
              } else {
                filtered.push(option);
              }
            });

            onSelect(filtered);
          }}
          multiple
          as="div"
          className="relative"
        >
          <Listbox.Button className={buttonClassNames(className)}>
            <span className="px-4 flex-1 text-ellipsis overflow-hidden">
              {value.length
                ? value.map((option) => option.label).join(', ')
                : 'Select an option'}
            </span>
            <ChevronUpDownIcon className="w-5 h-5 flex-shrink-0" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 w-full bg-white">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className={optionClassNames(className)}
              >
                <div className="w-5 h-5">
                  {value.some(
                    (selected) => selected.value === option.value,
                  ) && (
                    <CheckIcon
                      className={twMerge(
                        'w-full h-full flex-shrink-0 text-primary',
                      )}
                    />
                  )}
                </div>
                <span className="flex-1 text-ellipsis overflow-hidden">
                  {option.label}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </Label>
      <InputError error={error} />
    </InputBox>
  );
}

const buttonClassNames = (className) =>
  twMerge(
    'w-full border rounded-lg h-12 py-3 text-start flex items-center',
    className,
  );

const optionClassNames = (className) =>
  twMerge(
    'w-full px-4 py-2.5 hover:bg-gray-50 flex gap-2 items-center',
    className,
  );

export default MultipleSelect;
