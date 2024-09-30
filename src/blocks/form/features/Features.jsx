import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import { FeaturesContext } from '../../../context/features/features-context';
import BackAnchor from '../../../components/BackAnchor';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import { errorToast } from '../../../components/ShowError';
import FormTitle from '../../../components/form/FormTitle';
import FormBox from '../../../components/form/FormBox';

const inputs = {
  name: 'name',
  image: 'image',
};

const SharedForm = ({ onSubmit = (e) => {} }) => {
  const { value, setValue } = useContext(FeaturesContext);

  return (
    <form className="space-y-4 lg:space-y-6" onSubmit={onSubmit}>
      <Input
        label={inputs.name}
        type="text"
        className="w-full"
        onChange={(e) => {
          setValue(inputs.name, e.target.value);
        }}
        value={value[inputs.name]}
        name={inputs.name}
        required
      />
      <InputFileSingle
        name="image"
        setValue={setValue}
        required={!value.image}
        value={value.image}
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
        {id && <BackAnchor to="/features" />}
        <FormTitle>{id ? 'Edit Form' : 'Create form'}</FormTitle>
      </div>
      <hr />
    </>
  );
};

export const CreateFeatures = () => {
  const { setValue, refetch } = useContext(FeaturesContext);
  const { api } = useAxios();
  const { id = '' } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (!(formData.get('image') instanceof File)) {
      formData.delete('image');
    }

    api
      .post('features/', formData, {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // refetch table
        refetch();

        // reset
        setValue(inputs.name, '');
        setValue(inputs.image, '');
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      });
  };

  return (
    <FormBox>
      <FormHeader id={id} />
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
       * Always check this input name ➡ 'image'
       */
      if (key == 'image') {
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

export const EditFeatures = () => {
  const { value, setValue, refetch } = useContext(FeaturesContext);
  const { api } = useAxios();
  const { id = '' } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`features/${id}/`)
      .then((res) => {
        if (res.data) {
          setValue(inputs.name, res.data.name);
          setValue(inputs.image, res.data.image);
        }
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .patch(`features/${id}/`, encode(value), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        refetch();

        // reset
        setValue(inputs.name, '');
        setValue(inputs.image, '');

        navigate('/categories');
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      });
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <FormBox>
          <FormHeader id={id} />
          <SharedForm onSubmit={handleSubmit} />
        </FormBox>
      )}
    </>
  );
};
