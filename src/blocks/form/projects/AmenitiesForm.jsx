import { useLocation } from 'react-router-dom';
import { FinalSubmitButton } from '../../../components/form/SubmitButton';
import { useEffect, useState } from 'react';
import { formBack } from '../../../utils/form-steps';
import { getAmenities } from '../../../axios/property/get';
// import dummyImageFile from '../../../utils/base64';

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
  // const navigate = useNavigate();
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
    if (Array.isArray(list) && typeof n == 'number') {
      list.some((id) => id == n);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {amenities.map((amenity) => (
          <CheckBoxContainer
            key={amenity.id || crypto.randomUUID()}
            amenity={amenity}
            onChange={() => {
              if (isExists(value, amenity.id)) {
                setValue(value.filter((id) => id != amenity.id));
              } else {
                setValue([...value, amenity.id]);
              }
            }}
            checked={isExists(value, amenity.id)}
          />
        ))}
      </div>
      <FinalSubmitButton back={formBack(pathname)} />
    </form>
  );
};

export default AmenitiesForm;
