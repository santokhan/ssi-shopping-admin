import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import { DevelopersContext } from '../../../context/developers/developers-context';

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
      <MediaInput
        inputName={inputs.image}
        setValue={(name, value) => {
          setValue(name, value);
        }}
        className=""
        required={true}
        multiple={false}
        src={value.image}
      />
      <div className="">
        <SubmitButton type="submit" className="" />
      </div>
    </form>
  );
};

export const CreateDevelopers = () => {
  const { setValue, refetch } = useContext(DevelopersContext);

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
        }
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

export const EditDevelopers = () => {
  const { setValue, refetch } = useContext(DevelopersContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`developers/${id}/`, new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`Added`, {
          type: 'success',
        });
        if (res) {
          // refetch table
          refetch();

          // reset
          setValue(inputs.name, '');
          setValue(inputs.image, '');

          // redirect
          window.history.back();
        }
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
          <h5 className="text-lg font-semibold">Edit Form</h5>
          <hr />
          <SharedForm onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
};
