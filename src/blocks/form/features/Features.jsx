import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import { FeaturesContext } from '../../../context/features/features-context';
import BackAnchor from '../../../components/BackAnchor';

const inputs = {
  name: 'name',
  image: 'image',
};

export const CreateFeatures = () => {
  const { value, setValue, refetch } = useContext(FeaturesContext);
  const { api } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('features/', new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Added`, {
          type: 'success',
        });

        // refetch table
        refetch();

        // reset
        setValue(inputs.name, '');
        setValue(inputs.image, '');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6')}>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
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
        <MediaInput
          value={value}
          inputName="image"
          setValue={(name, value) => {
            setValue(name, value);
          }}
          className=""
          required
        />
        <div className="">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

export const EditFeatures = () => {
  const { value, setValue, refetch } = useContext(FeaturesContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    api
      .get(`features/${id}/`)
      .then((res) => {
        setValue(inputs.name, res.data.name);
        setValue(preview, res.data.name);
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
      .patch(`features/${id}/`, new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Added`, { type: 'success' });

        refetch();

        // reset
        setValue(inputs.name, '');
        setValue(inputs.image, '');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
          <div className="flex items-center gap-2">
            <BackAnchor to="/features" />
            <h5 className="text-lg font-semibold">Edit Form</h5>
          </div>
          <hr />
          <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
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
            <MediaInput
              value={value}
              inputName="image"
              setValue={(name, value) => {
                setValue(name, value);
              }}
              className=""
            />
            <div className="">
              <SubmitButton type="submit" className="" />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
