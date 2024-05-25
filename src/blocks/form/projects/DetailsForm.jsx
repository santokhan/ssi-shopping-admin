import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import Textarea from '../../../components/form/input/Textarea';
import Select from '../../../components/form/input/SelectOption';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { formBack, formNext } from '../../../utils/form-steps';
import { yesNoOptions } from '../../../utils/yes-no-options';
import {
  AmenitiesGrid,
  CheckBoxContainer,
  amenitiesReducer,
} from './AmenitiesForm';
import { getFeatures } from '../../../axios/property/get';

const DetailsForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [features, setFeatures] = useState([{ label: '', value: '' }]);
  useEffect(() => {
    getFeatures().then((res) => {
      if (res.data) {
        const data = res.data;
        setFeatures(data);
      }
    });
  }, []);

  const inputs = [
    {
      name: 'size',
      label: 'total area (in ft)',
      type: 'number',
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
        navigate(formNext(pathname));
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
      <AmenitiesGrid className="col-span-full">
        {features.map((_) => {
          // remove duplicates
          const isExists = (list, n) => {
            if (Array.isArray(list)) {
              return list.some((id) => id == n);
            }
          };
          let clone = amenitiesReducer(value.features);
          console.log(clone);

          return (
            <CheckBoxContainer
              key={_.id}
              checkboxes={{
                id: _.id,
                icon: _.image,
                title: _.name,
              }}
              onChange={() => {
                if (isExists(clone, _.id)) {
                  setValue(
                    'features',
                    clone.filter((e) => e != _.id),
                  );
                } else {
                  setValue('features', [...clone, _.id]);
                }
              }}
              checked={isExists(clone, _.id)}
            />
          );
        })}
      </AmenitiesGrid>
      <PrevAndNext back={formBack(pathname)} />
    </ResponsiveForm>
  );
};

export default DetailsForm;
