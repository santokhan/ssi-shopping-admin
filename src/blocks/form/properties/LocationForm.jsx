import PrevAndNext from '../../../components/form/CancelOrSubmit.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import Input from '../../../components/form/input/Input';
import ResponsiveForm from '../../../components/form/ResponsiveForm.jsx';
import { formBack, formNext } from '../../../utils/form-steps.js';
import CountriesProvider, {
  CountriesContext,
} from '../../../context/CountriesContext.jsx';
import CitiesProvider, {
  CitiesContext,
} from '../../../context/CitiesContext.jsx';
import GoogleMap from '../../../components/google-map/GoogleMap1.jsx';
import AreasProvider, { AreasContext } from '../../../context/AreasContext.jsx';

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
  const { pathname } = useLocation();

  return (
    <ResponsiveForm
      onSubmit={(e) => {
        e.preventDefault();
        navigate(formNext(pathname));
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
        <GoogleMap
          setPosition={({ lat, lng }) => {
            setValue('latitude', lat);
            setValue('longitude', lng);
          }}
          value={{
            lat: value.latitude,
            lng: value.longitude,
          }}
        />
      </div>
      <Input
        type="number"
        name={inputs.latitude}
        label={inputs.latitude}
        value={value.latitude}
        onChange={(e) => {
          setValue('latitude', parseFloat(e.target.value));
        }}
        disabled
      />
      <Input
        type="number"
        name={inputs.longitude}
        label={inputs.longitude}
        value={value.longitude}
        onChange={(e) => {
          setValue('longitude', parseFloat(e.target.value));
        }}
        disabled
      />
      <PrevAndNext back={formBack(pathname)} />
    </ResponsiveForm>
  );
};

export default LocationForm;
