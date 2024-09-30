import React, { Fragment, useEffect, useRef, useState } from 'react';
import { InputLabel } from './input/Input';
import FormTitle from './FormTitle';
import { Add, Minus } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';

const RoadMapInput = ({
  onChange,
  value,
  label,
  name,
  focused,
  resetFocus,
  className = '',
}) => {
  const ref = useRef(null);

  useEffect(() => {
    // reset focus element on click outside
    const listener = (e) => {
      if (!ref.current.contains(e.target)) {
        resetFocus();
      }
    };

    if (focused) {
      // When you are inside focus add onClickOutside
      window.addEventListener('click', listener);

      // focus after re-render array of inputs
      ref.current.focus();

      // on unmount if listener was added
      return () => {
        window.removeEventListener('click', listener);
      };
    }
  }, []);

  return (
    <InputLabel label={label}>
      <input
        ref={ref}
        type="text"
        name={name}
        className={twMerge('flex-1 border rounded-lg px-4 py-2.5', className)}
        onChange={(e) => {
          onChange([name, e.target.value]); // [ 'name of input': 'value' ]
        }}
        value={value}
      />
    </InputLabel>
  );
};

const AddRemove = ({ onClick, children, className = '', ...props }) => {
  return (
    <button
      type="button"
      className={twMerge(
        'text-2xl font-semibold border rounded-lg flex justify-center items-center size-11 flex-shrink-0',
        'hover:bg-gray-50',
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const RoadMapInputContainer = ({ value, setValue = (roadmap) => {} }) => {
  const [focusIndex, setFocusIndex] = useState({ index: null, name: '' });

  const setInput = (name, inputValue, i) => {
    const updated = value?.map((e, idx) => {
      if (idx === i) {
        e[name] = inputValue;
      }
      return e;
    });
    setValue(updated);
    setFocusIndex({ index: i, name: name });
  };

  if (Array.isArray(value)) {
    return (
      <div className="col-span-full space-y-2">
        <FormTitle>Roadmap</FormTitle>
        <ul className="flex flex-col items-start gap-2">
          {value?.map(({ place, distance }, i) => {
            return (
              <Fragment key={i}>
                <li className="flex-grow flex items-end gap-4">
                  <RoadMapInput
                    label={'place'}
                    name={'place'}
                    value={place}
                    onChange={([name, value]) => setInput(name, value, i)}
                    focused={
                      focusIndex.index == i && focusIndex.name == 'place'
                    }
                    resetFocus={() => {
                      setFocusIndex({ index: '', name: '' });
                    }}
                  />
                  <RoadMapInput
                    label={'distance'}
                    name={'distance'}
                    value={distance}
                    onChange={([name, value]) => setInput(name, value, i)}
                    focused={
                      focusIndex.index == i && focusIndex.name == 'distance'
                    }
                    resetFocus={() => {
                      setFocusIndex({ index: '', name: '' });
                    }}
                  />
                  {i == value.length - 1 ? (
                    <AddRemove
                      onClick={() => {
                        setValue([
                          ...value,
                          {
                            place: '',
                            distance: '',
                          },
                        ]);
                      }}
                      title="Add"
                    >
                      <Add className="size-6" />
                    </AddRemove>
                  ) : (
                    <AddRemove
                      onClick={() => {
                        setValue(
                          value?.filter((e, idx) => {
                            return idx !== i;
                          }),
                        );
                      }}
                      title="Remove"
                    >
                      <Minus className="size-6" />
                    </AddRemove>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default RoadMapInputContainer;
