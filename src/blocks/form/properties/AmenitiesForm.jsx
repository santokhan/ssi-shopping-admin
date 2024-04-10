import { useNavigate } from 'react-router-dom';
import { FinalSubmitButton } from '../../../components/form/SubmitButton';
import { useContext, useState } from 'react';
import { PropertyFormContext } from '../../../context/properties-form-context/create-properties-context';
import { formBack } from '../../../utils/form-steps';
import api from '../../../axios/api';

function CheckBoxContainer({ amenity, onChange, checked }) {
  return (
    <label key={amenity.id} className="flex gap-x-2 items-center">
      <input
        name={amenity.id}
        type="checkbox"
        className="h-4 w-4 rounded-lg border-gray-300"
        onChange={onChange}
        checked={checked}
      />
      <span className="font-medium text-gray-900">{amenity.name}</span>
    </label>
  );
}

const AmenitiesForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const { formData } = useContext(PropertyFormContext);

  const combineFromData = (values) => {
    const data = new FormData();

    const converter = (values) => {
      for (const key in values) {
        if (Object.hasOwnProperty.call(values, key)) {
          const element = values[key];
          if (element) {
            if (key == 'images') {
              for (let i = 0; i < element.length; i++) {
                data.append(key, element[i]);
              }
            } else {
              data.append(key, element);
            }
          }
        }
      }
    };

    converter(values.description);
    converter(values.media);
    converter(values.details);
    // data.append('amenities', JSON.stringify(values.amenities));

    return data;
  };

  async function sendToServer(formData) {
    console.log(Array.from(formData));

    api
      .post('/properties/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res);
      });
  }

  const amenities = [
    { id: '156d29e3-9658-4f37-a3b7-ff8a2a46d57d', name: 'Attic' },
    {
      id: 'ca8ea9ce-85d3-4a6c-8ee6-0217373fa92b',
      name: 'Basketball court',
    },
    {
      id: '5fd95038-858d-4d4d-a09c-5f82a16dae0f',
      name: 'Air Conditioning',
    },
    { id: '1b9957a5-8e3b-483c-a82f-46e2ebadc318', name: 'Lawn' },
    { id: '28e10576-920c-4db7-bc3c-d177058b651b', name: 'Swimming Pool' },
    { id: '2ebb9193-76c3-4552-8818-61fc3a0aaf4b', name: 'Barbeque' },
    { id: 'c673ca1f-52e8-459a-b566-d03d5e767222', name: 'Microwave' },
    { id: '4c77b50a-1aff-4acc-a145-efa30f72d2a4', name: 'TV Cable' },
    { id: 'd766ece9-8af3-4322-be08-f8edce19d2db', name: 'Dryer' },
    {
      id: 'b68e3b99-7bae-4ed2-b568-1a6b5f7fcb4a',
      name: 'Outdoor Shower',
    },
    { id: 'f558cabb-461d-4de4-aa94-de6788713c8a', name: 'Washer' },
    { id: '0127a455-1082-4bcb-8e3e-9dd7b9222ab3', name: 'Ocean view' },
    { id: 'fa057d58-6cb6-469b-91c9-03a34fc1f55b', name: 'Private space' },
    { id: 'ee1a9a74-c74b-47d3-ac1d-0e9caa2dd69b', name: 'Lake view' },
    { id: '8b669e61-1e51-4131-8292-112292ceedbf', name: 'Wine cellar' },
    { id: '4d215cb8-43b9-4b85-a4d3-e47b36642408', name: 'Front yard' },
    { id: '2283cf72-8089-4021-813e-5586d4bb15e3', name: 'Refrigerator' },
    { id: '3782e917-bb92-4fcc-84b5-b4e82c6cc877', name: 'WiFi' },
    { id: '15ce6ad3-53a1-4b87-93e3-864fe85b133d', name: 'Laundry' },
    { id: 'f3a35660-5f76-4b3a-85ce-bb4781f34dc6', name: 'Sauna' },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const encrypted = combineFromData(formData);
        sendToServer(encrypted);
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {amenities.map((amenity) => (
          <CheckBoxContainer
            key={amenity.id}
            amenity={amenity}
            onChange={() => {
              // Check if the amenity already exists in formState based on amenity.id
              const existingAmenity = value.find(
                (item) => item.id === amenity.id,
              );

              if (existingAmenity) {
                // If amenity with the same id already exists, perform filtering
                const filteredFormState = value.filter(
                  (item) => item.id !== amenity.id,
                );
                setValue(filteredFormState);
              } else {
                // If amenity doesn't exist in formState, add it
                setValue([...value, amenity]);
              }
            }}
            checked={value.some((item) => item.id === amenity.id)}
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
