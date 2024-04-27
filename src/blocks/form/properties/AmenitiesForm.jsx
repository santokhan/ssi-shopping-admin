import { useNavigate } from 'react-router-dom';
import { FinalSubmitButton } from '../../../components/form/SubmitButton';
import { useContext, useEffect, useState } from 'react';
import { PropertyFormContext } from '../../../context/properties-form-context/create-properties-context';
import { formBack } from '../../../utils/form-steps';
import api from '../../../axios/api';
import { getAmenities } from '../../../axios/property/get';
import ReactJson from 'react-json-view';
import trimAmenities from '../../../utils/trimAmenities';
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
          onChange={() => {
            onChange(amenity.id);
          }}
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
  const navigate = useNavigate();
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
        {amenities.map((amenity) => (
          <CheckBoxContainer
            key={amenity.id || crypto.randomUUID()}
            amenity={amenity}
            onChange={setValue}
            checked={value.includes(amenity.id)}
          />
        ))}
      </div>
      <FinalSubmitButton
        onBack={() => {
          navigate(formBack('amenities'));
        }}
      />
    </form>
  );
};

export default AmenitiesForm;
