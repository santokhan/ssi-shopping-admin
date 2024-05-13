import { useLocation } from 'react-router-dom';
import { FinalSubmitButton } from '../../../components/form/SubmitButton';
import { useEffect, useState } from 'react';
import { formBack } from '../../../utils/form-steps';
import { getAmenities } from '../../../axios/property/get';

function CheckBoxContainer({ amenity, onChange, checked }) {
  if (!amenity.id) {
    return null;
  }
  return (
    <div className="flex justify-start">
      <label key={amenity.id} className="inline-flex gap-x-2 items-center">
        <input
          name={amenity.id}
          type="checkbox"
          className="h-4 w-4 rounded-lg border-gray-300"
          onChange={onChange}
          checked={checked}
          title={amenity.id}
        />
        {amenity.icon && (
          <img
            src={amenity.icon}
            alt={amenity.title}
            className="size-12 rounded-full overflow-hidden object-cover"
            title={amenity.icon}
          />
        )}
        <span className="font-medium text-gray-900 capitalize">
          {amenity.title}
        </span>
      </label>
    </div>
  );
}

const AmenitiesForm = ({ value, setValue, onSubmit }) => {
  const { pathname } = useLocation();
  const [amenities, setAmenities] = useState([{ label: '', value: '' }]);

  useEffect(() => {
    getAmenities().then((res) => {
      if (res.data) {
        const data = res.data;
        setAmenities(data);
      }
    });
  }, []);

  const isExists = (list, n) => {
    if (Array.isArray(list)) {
      return list.some((id) => id == n);
    }
  };

  function amenitiesReducer(arrayOfNumbers) {
    if (Array.isArray(arrayOfNumbers)) {
      return arrayOfNumbers.reduce((newList, current) => {
        if (!newList.includes(current)) {
          newList.push(current);
        }
        return newList;
      }, []);
    }
  }

  if (Array.isArray(amenities) && Array.isArray(value)) {
    return (
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {amenities.map((_) => {
            // remove duplicates
            let clone = amenitiesReducer(value);

            return (
              <CheckBoxContainer
                key={_.id}
                amenity={_}
                onChange={() => {
                  if (isExists(clone, _.id)) {
                    setValue(clone.filter((e) => e != _.id));
                  } else {
                    setValue([...clone, _.id]);
                  }
                }}
                checked={isExists(clone, _.id)}
              />
            );
          })}
        </div>
        <FinalSubmitButton back={formBack(pathname)} />
      </form>
    );
  }
};

export default AmenitiesForm;
