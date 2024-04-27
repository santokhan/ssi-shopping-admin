import PrevAndNext from '../../../components/form/CancelOrSubmit.jsx';
import { useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import GoogleMapInput from '../../../components/form/input/GoogleMapInput.jsx';
import { useState, useEffect } from 'react';
import ResponsiveForm from '../../../components/form/ResponsiveForm.jsx';
import { formBack, formNext } from '../../../utils/form-steps.js';
import CountriesProvider, {
  CountriesContext,
} from '../../../context/CountriesContext.jsx';
import CitiesProvider, {
  CitiesContext,
} from '../../../context/CitiesContext.jsx';
import GoogleMap from '../../../components/google-map/GoogleMap.jsx';
import AreasProvider, { AreasContext } from '../../../context/AreasContext.jsx';

const selectOptions = {
  country: [
    { label: 'USA', value: '1' },
    { label: 'Canada', value: '2' },
    { label: 'UK', value: '3' },
  ],
  city: [
    { label: 'New York', value: '1' },
    { label: 'Los Angeles', value: '2' },
    { label: 'London', value: '3' },
  ],
  area: [],
  custom_1: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  custom_2: [
    { label: 'Choice A', value: 'a' },
    { label: 'Choice B', value: 'b' },
    { label: 'Choice C', value: 'c' },
  ],
  custom_3: [
    { label: 'Item X', value: 'X' },
    { label: 'Item Y', value: 'Y' },
    { label: 'Item Z', value: 'Z' },
  ],
};

const inputList = [
  'address',
  'country',
  'city',
  'area',
  'latitude',
  'longitude',
];

const inputs = inputList.reduce((obj, item) => ({ ...obj, [item]: item }), {});

const LocationForm = ({ value, setValue }) => {
  const navigate = useNavigate();
  const thisFormName = 'location';

  console.log('value on location', value);

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(thisFormName));
      }}
    >
      <Input
        type="text"
        name={inputs.address}
        label={inputs.address}
        value={value.address}
        onChange={(e) => {
          setValue(inputs.address, e.target.value);
        }}
        className="col-span-full"
        required
      />
      <CountriesProvider>
        <CountriesContext.Consumer>
          {({ countries }) => {
            return (
              <Select
                name={inputs.country}
                options={countries.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                label={inputs.country}
                onChange={(e) => {
                  setValue(inputs.country, e.target.value);
                }}
                value={value.country}
                required
              />
            );
          }}
        </CountriesContext.Consumer>
      </CountriesProvider>
      <CitiesProvider>
        <CitiesContext.Consumer>
          {({ cities }) => {
            return (
              <Select
                name={inputs.city}
                options={cities
                  .filter((city) => city.country.id === parseInt(value.country))
                  .map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                label={inputs.city}
                onChange={(e) => {
                  setValue(inputs.city, e.target.value);
                }}
                value={value.city}
                required
              />
            );
          }}
        </CitiesContext.Consumer>
      </CitiesProvider>
      <AreasProvider>
        <AreasContext.Consumer>
          {({ areas }) => {
            return (
              <Select
                name={inputs.area}
                options={areas
                  .filter((area) => area.city.id === parseInt(value.city))
                  .map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                label={inputs.area}
                onChange={(e) => {
                  setValue(inputs.area, e.target.value);
                }}
                value={value.area}
                required
              />
            );
          }}
        </AreasContext.Consumer>
      </AreasProvider>
      <div className="col-span-full py-2">
        <GoogleMap />
      </div>
      <Input
        type="text"
        name={inputs.latitude}
        label={inputs.latitude}
        value={value.latitude}
        onChange={(e) => {
          setValue(inputs.latitude, e.target.value);
        }}
      />
      <Input
        type="text"
        name={inputs.longitude}
        label={inputs.longitude}
        value={value.longitude}
        onChange={(e) => {
          setValue(inputs.longitude, e.target.value);
        }}
      />
      <PrevAndNext
        onBack={() => {
          navigate(formBack(thisFormName));
        }}
      />
    </ResponsiveForm>
  );
};

export default LocationForm;
