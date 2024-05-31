import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect, useState } from 'react';
import { AmenitiesContext } from '../../../context/amenities/amenities-context';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import BackAnchor from '../../../components/BackAnchor';
import InputFileSingle from '../../../components/form/input/InputFileSingle';
import { errorToast } from '../../../components/ShowError';

const inputs = {
  title: 'title',
  icon: 'icon',
};

const AmenitiesForm = ({ handleSubmit }) => {
  const { value, setValue } = useContext(AmenitiesContext);

  return (
    <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
      <Input
        label="title"
        type="text"
        className="w-full"
        onChange={(e) => {
          setValue('title', e.target.value);
        }}
        value={value.title}
        name={'title'}
        required
      />
      <InputFileSingle
        name="icon"
        required={!value.icon}
        setValue={setValue}
        value={value.icon}
      />
      <div className="">
        <SubmitButton type="submit" className="" />
      </div>
    </form>
  );
};

export const CreateAmenities = () => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);
  const { api } = useAxios();

  useEffect(() => {
    setValue(inputs.title, '');
    setValue(inputs.icon, '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('amenities/', encode(value), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Amenities Added`, {
          type: 'success',
        });

        // refetch table
        refetch();

        // reset
        setValue(inputs.title, '');
        setValue(inputs.icon, '');
      })
      .catch((err) => {
        const errors = err?.response?.data;
        errorToast(errors);
      });
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6')}>
      <AmenitiesForm
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
    </div>
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
      if (key == inputs.icon) {
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

export const EditAmenities = () => {
  const { value, setValue, refetch } = useContext(AmenitiesContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`amenities/${id}/`)
      .then((res) => {
        setIsLoading(false);

        if (res.data) {
          const data = res.data;
          setValue(inputs.title, data.title);
          setValue(inputs.icon, data.icon);
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
      .patch(`amenities/${id}/`, encode(value), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Amenities Added`, {
          type: 'success',
        });

        // refetch table
        refetch();

        // reset
        setValue(inputs.title, '');
        setValue(inputs.icon, '');
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
        <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
          <div className="flex items-center gap-2">
            <BackAnchor to="/amenities" />
            <h5 className="text-lg font-semibold">Edit Form</h5>
          </div>
          <hr />
          <AmenitiesForm
            value={value}
            setValue={setValue}
            handleSubmit={handleSubmit}
            type="edit"
          />
        </div>
      )}
    </>
  );
};
