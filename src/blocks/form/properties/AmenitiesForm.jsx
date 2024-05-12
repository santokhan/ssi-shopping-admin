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
        />
        {amenity.icon && (
          <img
            src={amenity.icon}
            alt={amenity.title}
            className="size-12 rounded-full overflow-hidden object-cover"
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

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {amenities.map((amenity) => {
          const checkExist = (list, n) =>
            list.some((id) => {
              if (typeof id == 'number' && typeof n == 'number') {
                return id === n;
              }
            });

          return (
            <CheckBoxContainer
              key={crypto.randomUUID()}
              amenity={amenity}
              onChange={() => {
                if (checkExist(value, amenity.id)) {
                  setValue(value.filter((e) => e !== amenity.id));
                } else {
                  setValue([...value, amenity.id]);
                }
              }}
              checked={checkExist(value, amenity.id)}
            />
          );
        })}
      </div>
      <FinalSubmitButton back={formBack(pathname)} />
    </form>
  );
};

export default AmenitiesForm;
