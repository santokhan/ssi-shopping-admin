import { useForm } from 'react-hook-form';
import CancelOrSubmit from '../../../components/form/CancelOrSubmit';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import GoogleMapInput from '../../../components/form/input/GoogleMapInput.jsx';
import { useContext, useState } from 'react';
import ResponsiveForm from '../../../components/form/ResponsiveForm.jsx';
import { PropertyFormContext } from '../../../context/properties-form-context/create-properties-context.jsx';

const selectOptions = {
  country: [
    { label: 'USA', value: 'USA' },
    { label: 'Canada', value: 'Canada' },
    { label: 'UK', value: 'UK' },
  ],
  city: [
    { label: 'New York', value: 'New York' },
    { label: 'Los Angeles', value: 'Los Angeles' },
    { label: 'London', value: 'London' },
  ],
  area: [
    { label: 'Manhattan', value: 'Manhattan' },
    { label: 'Brooklyn', value: 'Brooklyn' },
    { label: 'West Hollywood', value: 'West Hollywood' },
  ],
  custom_1: [
    { label: 'Option 1', value: 'Option 1' },
    { label: 'Option 2', value: 'Option 2' },
    { label: 'Option 3', value: 'Option 3' },
  ],
  custom_2: [
    { label: 'Choice A', value: 'Choice A' },
    { label: 'Choice B', value: 'Choice B' },
    { label: 'Choice C', value: 'Choice C' },
  ],
  custom_3: [
    { label: 'Item X', value: 'Item X' },
    { label: 'Item Y', value: 'Item Y' },
    { label: 'Item Z', value: 'Item Z' },
  ],
};

const inputList = [
  'address',
  'country',
  'city',
  'area',
  'custom_1',
  'custom_2',
  'custom_3',
  'latitude',
  'longitude',
];

const inputs = inputList.reduce((obj, item) => {
  obj[item] = item;
  return obj;
}, {});

const LocationForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(
    inputList.reduce((obj, item) => {
      obj[item] = '';
      return obj;
    }, {}),
  );
  const [error, setError] = useState({});
  const { storeFormData } = useContext(PropertyFormContext);

  function setValue(key, value) {
    if (typeof key == 'string' && !key) return;

    const changed = { ...formState, [key.trim()]: value };
    setFormState(changed);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    storeFormData('location', formData);

    navigate('/properties/create/details');
  };

  return (
    <ResponsiveForm onSubmit={onSubmit}>
      <Input
        type="text"
        name={inputs.address}
        label={inputs.address}
        value={formState.address}
        onChange={(e) => {
          setValue(inputs.address, e.target.value);
        }}
        className="col-span-full"
        required
      />
      <Select
        name={inputs.country}
        options={selectOptions[inputs.country] || []}
        label={inputs.country}
        onChange={(e) => {
          setValue(inputs.country, e.target.value);
        }}
        required
      />
      <Select
        name={inputs.city}
        options={selectOptions[inputs.city] || []}
        label={inputs.city}
        onChange={(e) => {
          setValue(inputs.city, e.target.value);
        }}
        required
      />
      <Select
        name={inputs.area}
        options={selectOptions[inputs.area] || []}
        label={inputs.city}
        onChange={(e) => {
          setValue(inputs.city, e.target.value);
        }}
        required
      />
      <Select
        name={inputs.custom_1}
        options={selectOptions[inputs.custom_1] || []}
        label={inputs.custom_1}
        onChange={(e) => {
          setValue(inputs.custom_1, e.target.value);
        }}
        required
      />
      <Select
        name={inputs.custom_2}
        options={selectOptions[inputs.custom_2] || []}
        label={inputs.custom_2}
        onChange={(e) => {
          setValue(inputs.custom_2, e.target.value);
        }}
        required
      />
      <Select
        name={inputs.custom_3}
        options={selectOptions[inputs.custom_3] || []}
        label={inputs.custom_3}
        onChange={(e) => {
          setValue(inputs.custom_3, e.target.value);
        }}
        required
      />
      <div className="col-span-full py-2">
        <GoogleMapInput />
      </div>
      <Input
        type="text"
        name={inputs.latitude}
        label={inputs.latitude}
        value={formState.latitude}
        onChange={(e) => {
          setValue(inputs.latitude, e.target.value);
        }}
        required
      />
      <Input
        type="text"
        name={inputs.longitude}
        label={inputs.longitude}
        value={formState.longitude}
        onChange={(e) => {
          setValue(inputs.longitude, e.target.value);
        }}
        required
      />
      <CancelOrSubmit />
    </ResponsiveForm>
  );
};

export default LocationForm;
