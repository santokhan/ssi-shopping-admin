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
import { errorToast } from '../../../components/ShowError';
import FormTitle from '../../../components/form/FormTitle';

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
                options={countries?.map((c) => ({
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
                  ?.filter(
                    (c) => parseInt(c.country.id) === parseInt(value.country),
                  )
                  ?.map((c) => ({
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
        required={!value.icon}
        value={value.icon}
      />
      <div className="">
        <SubmitButton type="submit" className="" />
      </div>
    </form>
  );
};

/**
 *
 * @param {*} id :id from route path
 * @returns
 */
const FormHeader = ({ id = '' }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {id && <BackAnchor to="/locations" />}
        <FormTitle>{id ? 'Edit Form' : 'Create form'}</FormTitle>
      </div>
      <hr />
    </>
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
        const errors = err?.response?.data;
        errorToast(errors);
      });
  };

  return (
    <FormBox>
      <FormHeader id={''} />
      <SharedForm onSubmit={handleSubmit} />
    </FormBox>
  );
};

const encode = (value) => {
  const formData = new FormData();
  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      const element = value[key];
      /**
       * Always check this input name ➡ 'icon'
       */
      if (key == 'icon') {
        if (element instanceof File) {
          formData.append(key, element);
        }
        // don't append if it is not a File
      } else {
        formData.append(key, element);
      }
    }
  }
  return formData;
};

export const EditLocations = () => {
  const { value, setValue, refetch } = useContext(LocationsContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`areas/${id}/`)
      .then((res) => {
        if (res.data) {
          setIsLoading(false);

          const data = res.data;
          setValue('city', data.city.id);
          setValue('country', data.city.country);
          setValue('name', data.name);
          /** Follow up these kay name. Because the naem of this label is `area` */
          setValue('icon', data.icon);
        }
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .patch(`areas/${id}/`, encode(value), {
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
    <FormBox>
      <FormHeader id={id} />
      <SharedForm onSubmit={handleSubmit} />
    </FormBox>
  );
};
