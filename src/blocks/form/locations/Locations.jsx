import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import { LocationsContext } from '../../../context/locations/locations-context';

const inputs = {
  title: 'title',
  icon: 'icon',
};

export const CreateLocations = () => {
  const { value, setValue, refetch } = useContext(LocationsContext);
  const { api } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('amenities/', new FormData(e.target), {
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
        console.log(err);
      });
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6')}>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <Input
          label={inputs.title}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.title, e.target.value);
          }}
          value={value[inputs.title]}
          name={inputs.title}
          required
        />
        <MediaInput
          value={value}
          inputName="icon"
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

export const EditLocations = () => {
  const { value, setValue, refetch } = useContext(LocationsContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setValue(inputs.title, 'edit_title');
    // setValue(inputs.icon, 'edit_icon');
    api
      .get(`amenities/${id}/`)
      .then((res) => {
        setValue(inputs.title, res.data.title);
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
      .patch(`amenities/${id}/`, new FormData(e.target), {
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
          <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
            <Input
              label={inputs.title}
              type="text"
              className="w-full"
              onChange={(e) => {
                setValue(inputs.title, e.target.value);
              }}
              value={value[inputs.title]}
              name={inputs.title}
              required
            />
            <MediaInput
              value={value}
              inputName="icon"
              setValue={(name, value) => {
                setValue(name, value);
              }}
              className=""
              required={true}
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
