import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Textarea from '../../../components/form/input/Textarea';
import Select from '../../../components/form/input/SelectOption';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import CancelOrSubmit from '../../../components/form/CancelOrSubmit';
import PropertiesFormTitle from '../../../components/form/PropertiesFormTitle';
import { PropertyFormContext } from '../../../context/properties-form-context/create-properties-context';

const DetailsForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formState, setFormState] = useState({});
  const { storeFormData } = useContext(PropertyFormContext);

  const inputs = [
    {
      name: 'size_in_ft',
      label: 'Size in ft',
      type: 'number',
    },
    {
      name: 'suitable',
      label: 'Suitable',
      type: 'text',
    },
    {
      name: 'type',
      label: 'Type',
      type: 'text',
    },
    {
      name: 'bedrooms',
      label: 'Bedrooms',
      type: 'number',
    },
    {
      name: 'bathrooms',
      label: 'Bathrooms',
      type: 'number',
    },
    {
      name: 'parking',
      label: 'Parking',
      type: 'text',
    },
    {
      name: 'number_of_parking',
      label: 'Parking',
      type: 'number',
    },
    {
      name: 'garage_size',
      label: 'Garage size',
      type: 'number',
    },
    {
      name: 'year_built',
      label: 'Year built (numeric)',
      type: 'number',
    },
    {
      name: 'available_from',
      label: 'Available from (date)',
      type: 'date',
    },
    { name: 'basement', label: 'Basement', type: 'text' },
    { name: 'extra_details', label: 'Extra details', type: 'text' },
    { name: 'roofing', label: 'Roofing', type: 'text' },
    {
      name: 'exterior_material',
      label: 'Exterior Material',
      type: 'text',
    },
    { name: 'structure_type', label: 'Structure type', type: 'select' },
    { name: 'floors_no', label: 'Floors no', type: 'select' },
    {
      name: 'owner',
      label: 'Owner/ Agent nots (not visible on front end)',
      type: 'textareas',
    },
  ];

  const energyInputs = [
    {
      name: 'energy_class',
      label: 'Energy Class',
      type: 'select',
    },
    {
      name: 'energy_index',
      label: 'Energy index in kWh/m2a',
      type: 'select',
    },
  ];

  const options = {
    structure_type: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
    floors_no: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
    energy_class: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
    energy_index: [
      {
        label: 'Yes',
        value: 'yes',
      },
      {
        label: 'No',
        value: 'no',
      },
    ],
  };

  const setValue = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    storeFormData('details', formData);

    navigate('/properties/create/amenities');
  };

  return (
    <ResponsiveForm onSubmit={onSubmit}>
      {inputs.map(({ name, label, type }) => {
        if (['text', 'number', 'date'].includes(type)) {
          return (
            <Input
              key={name}
              type={type}
              name={name}
              label={label}
              value={formState[name] || ''}
              onChange={(e) => setValue(name, e.target.value)}
              required
            />
          );
        }

        if (type === 'select') {
          return (
            <Select
              key={name}
              name={name}
              label={label}
              options={options[name]}
              value={formState[name] || ''}
              onChange={(e) => setValue(name, e.target.value)}
              required
            />
          );
        }

        if (type === 'textarea') {
          return (
            <Textarea
              key={name}
              name={name}
              label={label}
              value={formState[name] || ''}
              onChange={(e) => setValue(name, e.target.value)}
              className="col-span-full"
            />
          );
        }
      })}

      <div className="col-span-full">
        <PropertiesFormTitle>Select Energy Class</PropertiesFormTitle>
      </div>
      {energyInputs.map(({ name, label, type }) => {
        if (type === 'select') {
          return (
            <Select
              key={name}
              name={name}
              label={label}
              options={options[name]}
              value={formState[name] || ''}
              onChange={(e) => setValue(name, e.target.value)}
              required
            />
          );
        }
      })}
      <CancelOrSubmit />
      {/* <pre>{JSON.stringify(formState, null, 2)}</pre> */}
    </ResponsiveForm>
  );
};

export default DetailsForm;
