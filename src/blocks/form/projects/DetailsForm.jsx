import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../components/form/input/Input';
import ResponsiveForm from '../../../components/form/ResponsiveForm';
import PrevAndNext from '../../../components/form/CancelOrSubmit';
import { formBack, formNext } from '../../../utils/form-steps';
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

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
      }}
    >
      <Input
        type="date"
        name="launch_date"
        label="launch_date"
        value={
          value.launch_date
            ? new Date(value.launch_date).toISOString()?.slice(0, 10)
            : ''
        }
        onChange={(e) => {
          setValue(e.target.name, e.target.value);
        }}
        required={true}
      />
      <Input
        type="number"
        name="size"
        label="total area (in ft)"
        value={value.size}
        step="any"
        onChange={(e) => {
          setValue(e.target.name, parseFloat(e.target.value));
        }}
        required={true}
      />
      <AmenitiesGrid className="col-span-full">
        {features?.map((_) => {
          // remove duplicates
          const isExists = (list, n) => {
            if (Array.isArray(list)) {
              return list.some((id) => id == n);
            }
          };
          let clone = amenitiesReducer(value.features);

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
                    'categories',
                    clone?.filter((e) => e != _.id),
                  );
                } else {
                  setValue('categories', [...clone, _.id]);
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
