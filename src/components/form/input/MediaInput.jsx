import React, { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../Button';
import ImagePreviewWithRemove from '../ImagePreview';
import MediaInputIcon from '../../icons/MediaInputIcon';
import imageSrcValidator from '../../../lib/image/validateSrc';
import getImageURL from '../../../utils/getImageURL';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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
  reArrange = () => {},
}) => {
  name = name || inputName;
  const isValue = Array.isArray(value) && value.length > 0;
  const initialDragableList = useMemo(() => {
    return isValue ? value?.map((_) => ({ id: uuidv4(), content: _ })) : [];
  }, [isValue, value]);

  const [items, setItems] = useState([...initialDragableList]);

  useEffect(() => {
    if (isValue) {
      setItems([...initialDragableList]);
    }
  }, [initialDragableList, isValue, value]);

  const onChangeFile = (e) => {
    const files = Array.from(e.target.files);

    // combile FileList and Array of URLs
    const addedFiles = [...files, ...value];

    setValue(name, addedFiles);
  };

  function onRemoveFromLocal(index) {
    if (isValue && typeof index == 'number') {
      setValue(
        name,
        value.filter((_, i) => i !== index),
      );
    } else {
      console.log('Something went wrong', value, index);
    }
  }

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // If the item is dropped outside the list
    if (!destination) {
      return;
    }

    // If the item is dropped in the same position
    if (destination.index === source.index) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removed);

    setItems(reorderedItems);
    const onlyImages = reorderedItems?.map((item) => item.content);
    setValue(name, onlyImages);

    reArrange(
      onlyImages?.map((item, i) => {
        if (item.id) {
          return {
            id: item.id,
            order: i,
          };
        }
      }),
    );
  };

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
        <MediaInputIcon className="mb-6" />
        <div className="flex flex-col items-center">
          <div className="text-lg font-semibold mb-1">
            Drag and drop file{multiple ? 's' : ''} here
          </div>
          <div className="text-sm mb-6">File must be {accept} format</div>
          <Button variant="outline" withIcon={true} disabled>
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
      {/* https://codesandbox.io/p/sandbox/react-beautiful-dnd-grid-vypgtd?file=%2Fsrc%2Findex.js */}
      <DragDropContext onDragEnd={onDragEnd} onDragStart={console.log}>
        <Droppable droppableId="droppable" direction="horizontal" type="ROW">
          {(provided) => (
            <ul
              className="w-full inline-flex flex-wrap+ gap-4 overflow-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items?.map((item, i) => {
                let src = '';
                const content = item.content;

                if (!content) return null;

                if (content instanceof File) {
                  src = imageSrcValidator(content);
                } else if (content.image) {
                  const path = imageSrcValidator(content.image);
                  src = getImageURL(path);
                } else if (typeof content === 'string') {
                  src = content;
                }

                return (
                  <Draggable key={item.id} draggableId={item.id} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          minHeight: '50px',
                          ...provided.draggableProps.style,
                          cursor: 'grab',
                        }}
                        draggable={true}
                      >
                        <ImagePreviewWithRemove
                          key={i}
                          src={src}
                          onRemove={() => {
                            if (content instanceof File) {
                              onRemoveFromLocal(i);
                            } else if (content.id) {
                              onRemoveFromServer(content.id);
                            } else {
                              onRemoveFromLocal(i);
                            }
                          }}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default MediaInput;
