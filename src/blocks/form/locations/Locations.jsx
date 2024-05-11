import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import { LocationsContext } from '../../../context/locations/locations-context';
import CountriesProvider, {
  CountriesContext,
} from '../../../context/CountriesContext';
import CitiesProvider, { CitiesContext } from '../../../context/CitiesContext';
import Select from '../../../components/form/input/SelectOption';
import FormBox from '../../../components/form/FormBox';
import BackAnchor from '../../../components/BackAnchor';
import InputFileSingle from '../../../components/form/input/InputFileSingle';

const SharedForm = ({ onSubmit }) => {
  const { value, setValue } = useContext(LocationsContext);

  return (
    <form className="space-y-4 lg:space-y-6" onSubmit={onSubmit}>
      <CountriesProvider>
        <CountriesContext.Consumer>
          {({ countries }) => {
            return (
              <Select
                name={'country'}
                options={countries.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                label={'country'}
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
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
                name={'city'}
                options={cities
                  .filter(
                    (c) => parseInt(c.country.id) === parseInt(value.country),
                  )
                  .map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                label={'city'}
                onChange={(e) => {
                  setValue(e.target.name, e.target.value);
                }}
                value={value.city}
                required
              />
            );
          }}
        </CitiesContext.Consumer>
      </CitiesProvider>
      <Input
        name={'name'}
        label={'area'}
        onChange={(e) => {
          setValue(e.target.name, e.target.value);
        }}
        value={value.name}
        required
      />
      <InputFileSingle
        name="icon"
        setValue={setValue}
        required
        value={value.icon}
      />
      <div className="">
        <SubmitButton type="submit" className="" />
      </div>
    </form>
  );
};

export const CreateLocations = () => {
  const { setValue, refetch } = useContext(LocationsContext);
  const { api } = useAxios();

  useEffect(() => {
    // reset
    setValue('city', '');
    setValue('country', '');
    setValue('name', '');
    setValue('icon', '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('areas/', new FormData(e.target), {
        header: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res) {
          // refetch table
          refetch();

          // reset
          setValue('city', '');
          setValue('country', '');
          setValue('name', '');
          setValue('icon', '');
        }
      })
      .catch((err) => {
        console.log(err);
        const data = err.response.data;

        if (data) {
          Object.keys(data).forEach((key) => {
            toast.error(data[key]);
          });
        }
      });
  };

  return (
    <FormBox>
      <h5 className="text-lg font-semibold">Create Location</h5>
      <SharedForm onSubmit={handleSubmit} />
    </FormBox>
  );
};

export const EditLocations = () => {
  const { setValue, refetch } = useContext(LocationsContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`areas/${id}/`)
      .then((res) => {
        if (res.data) {
          const data = res.data;
          setValue('city', data.city.id);
          setValue('country', data.city.country);
          setValue('name', data.name);
          /** Follow up these kay name. Because the naem of this label is `area` */
          setValue('icon', data.icon);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .patch(`areas/${id}/`, new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res) {
          // refetch table
          refetch();

          // reset
          setValue('city', '');
          setValue('country', '');
          setValue('name', '');
          setValue('icon', '');

          // redirect
          navigate('/locations');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
      <div className="flex items-center gap-2">
        {id && <BackAnchor to="/locations" />}
        <h5 className="text-lg font-semibold">
          {id ? 'Edit location' : 'Create location'}
        </h5>
      </div>
      <hr />
      <SharedForm onSubmit={handleSubmit} />
    </div>
  );
};
