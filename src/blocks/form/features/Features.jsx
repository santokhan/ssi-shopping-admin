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
      <MediaInput
        name="image"
        setValue={setValue}
        required
        value={value.image}
      />
      <div className="">
        <SubmitButton type="submit" className="" />
      </div>
    </form>
  );
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
      <SharedForm onSubmit={handleSubmit} />
    </div>
  );
};

export const EditFeatures = () => {
  const { value, setValue, refetch } = useContext(FeaturesContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
          <SharedForm onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
};
