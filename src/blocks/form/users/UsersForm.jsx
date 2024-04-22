import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import MediaInput from '../../../components/form/input/MediaInput';
import { useContext, useEffect, useState } from 'react';
import useAxios from '../../../context/useAxios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Spinner from '../../../components/loader/Spinner';
import CountriesProvider, {
  CountriesContext,
} from '../../../context/CountriesContext';
import CitiesProvider, { CitiesContext } from '../../../context/CitiesContext';
import Select from '../../../components/form/input/SelectOption';
import { UsersContext } from '../../../context/users/UserContext';

const inputs = {
  name: 'name',
  image: 'image',
};

export const CreateUsers = () => {
  const { value, setValue, refetch } = useContext(UsersContext);
  const { api } = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();
    // api
    //   .post('areas/', new FormData(e.target), {
    //     header: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     toast(`Added`, {
    //       type: 'success',
    //     });

    //     // refetch table
    //     refetch();

    //     // reset
    //     setValue(inputs.name, '');
    //     setValue(inputs.image, '');
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
          inputName={inputs.image}
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

export const EditUsers = () => {
  const { value, setValue, refetch } = useContext(UsersContext);
  const { api } = useAxios();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`areas/${id}/`)
      .then((res) => {
        setValue(inputs.name, res.data.name);
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
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
          <h5 className="text-lg font-semibold">Edit Form</h5>
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
              inputName={inputs.image}
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
