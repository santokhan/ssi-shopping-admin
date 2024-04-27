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
      name: 'built_up_size',
      label: 'Built Up Size (In FT)',
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
      label: 'Owner/ Agent notes (not visible on front end)',
      type: 'textarea',
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
              required={
                ['garage_size', 'year_built'].includes(name) ? false : true
              }
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

      <PrevAndNext
        onBack={() => {
          navigate(formBack(thisFormName));
        }}
      />
    </ResponsiveForm>
  );
};

export default DetailsForm;
