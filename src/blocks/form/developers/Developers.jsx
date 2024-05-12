import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import { DevelopersContext } from '../../../context/developers/developers-context';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import { errorToast } from '../../../components/ShowError';
import BackAnchor from '../../../components/BackAnchor';
import FormTitle from '../../../components/form/FormTitle';
import FormBox from '../../../components/form/FormBox';

const inputs = {
  name: 'name',
  image: 'image',
};

const SharedForm = ({ onSubmit = (e) => {} }) => {
  const { value, setValue } = useContext(DevelopersContext);

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
        name={inputs.image}
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
        {id && <BackAnchor to="/developers" />}
        <FormTitle>{id ? 'Edit Form' : 'Create form'}</FormTitle>
      </div>
      <hr />
    </>
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

export const CreateDevelopers = () => {
  const { setValue, refetch } = useContext(DevelopersContext);
  const navigate = useNavigate();

  // Clear inputs when component mounts
  useEffect(() => {
    setValue(inputs.name, '');
    setValue(inputs.image, '');
  }, []);

  const { api } = useAxios();
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('developers/', new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res) {
          // refetch table
          refetch();

          // reset
          setValue(inputs.name, '');
          setValue(inputs.image, '');

          navigate('/developers');
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

export const EditDevelopers = () => {
  const { value, setValue, refetch } = useContext(DevelopersContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Assign values to inputs when component mounts
  // For edit form
  useEffect(() => {
    api
      .patch(`developers/${id}/`)
      .then((res) => {
        if (res.data) {
          const data = res.data;
          setValue(inputs.name, data.name);
          setValue(inputs.image, data.image);
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
      .patch(`developers/${id}/`, encode(value), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res) {
          // refetch table
          refetch();

          // reset
          setValue(inputs.name, '');
          setValue(inputs.image, '');

          // redirect
          navigate('/developers');
        }
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
