import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Textarea from '../../../components/form/input/Textarea';
import Select from '../../../components/form/input/SelectOption';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PropertiesFormTitle from '../../../components/form/PropertiesFormTitle';
import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { formBack, formNext } from '../../../utils/form-steps';
import { yesNoOptions } from '../../../utils/yes-no-options';

const DetailsForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const thisFormName = 'details';

  const inputs = [
    {
      name: 'total_area',
      label: 'total area (in ft)',
      type: 'number',
    },
    {
      name: 'built_top_size',
      label: 'built top size (in FT)',
      type: 'number',
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
    { name: 'basement', label: 'Basement', type: 'yes/no' },
    {
      name: 'extra_detail',
      label: 'Owner/ Agent nots (not visible on front end)',
      type: 'textarea',
    },
  ];

  const energyInputs = [
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
    floor_no: [
      {
        label: '5',
        value: '5',
      },
      {
        label: '10',
        value: '10',
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

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(thisFormName));
      }}
    >
      {inputs.map(({ name, label, type }) => {
        if (['text', 'number'].includes(type)) {
          return (
            <Input
              key={name}
              type={type}
              name={name}
              label={label}
              value={value[name]}
              onChange={(e) => {
                let v = e.target.value;
                if (type === 'number') {
                  v = parseInt(v);
                }
                setValue(name, v);
              }}
              required
            />
          );
        }
        if (type == 'date') {
          return (
            <Input
              key={name}
              type={type}
              name={name}
              label={label}
              value={value[name]}
              onChange={(e) => {
                setValue(name, e.target.value);
              }}
              placeholder={type === 'date' && 'YYYY'}
              min={(type = 'date' && 1900)}
              max={(type = 'date' && 2100)}
              step={(type = 'date' && 1)}
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
              value={value[name]}
              onChange={(e) => setValue(name, e.target.value)}
              required
            />
          );
        }
        if (type === 'yes/no') {
          return (
            <Select
              key={name}
              name={name}
              label={label}
              options={yesNoOptions}
              value={value[name]}
              onChange={(e) => setValue(name, e.target.value)}
            />
          );
        }
        if (type === 'textarea') {
          return (
            <Textarea
              key={name}
              name={name}
              label={label}
              value={value[name]}
              onChange={(e) => setValue(name, e.target.value)}
              className="col-span-full"
            />
          );
        }
      })}

      <div className="col-span-full">
        <PropertiesFormTitle>Select Energy Class</PropertiesFormTitle>
      </div>
      {energyInputs.map(({ name, label }) => {
        return (
          <Select
            key={name}
            name={name}
            label={label}
            options={yesNoOptions}
            value={value[name]}
            onChange={(e) => setValue(name, e.target.value)}
            required
          />
        );
      })}
      <PrevAndNext
        onBack={() => {
          navigate(formBack(thisFormName));
        }}
      />
    </ResponsiveForm>
  );
};

export default DetailsForm;
