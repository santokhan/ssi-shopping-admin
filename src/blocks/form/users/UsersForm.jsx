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
import { Title } from '../../../components/page-header/PageHeader';
import FormTitle from '../../../components/form/FormTitle';
import BackAnchor from '../../../components/BackAnchor';

const inputs = {
  email: 'email',
  username: 'username',
  first_name: 'first_name',
  last_name: 'last_name',
  role: 'role',
};

export const CreateUsers = () => {
  const { value, setValue, refetch } = useContext(UsersContext);
  const { api } = useAxios();
  const { id } = useParams();

  useEffect(() => {
    // if (res) {
    //   setValue(inputs.username, res.username);
    //   setValue(inputs.first_name, res.first_name);
    //   setValue(inputs.last_name, res.last_name);
    //   setValue(inputs.role, res.role);
    //   setValue(inputs.email, res.email);
    // }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // api
    //   .post('users/', new FormData(e.target), {
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
    <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
      <div className="flex items-center gap-2">
        {id && <BackAnchor to="/users" />}
        <FormTitle>{id ? 'Edit User' : 'Create User'}</FormTitle>
      </div>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <Input
          label={inputs.username}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.username, e.target.value);
          }}
          value={value[inputs.username]}
          name={inputs.username}
          required
        />
        <Input
          label={inputs.first_name}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.first_name, e.target.value);
          }}
          value={value[inputs.first_name]}
          name={inputs.first_name}
        />
        <Input
          label={inputs.last_name}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.last_name, e.target.value);
          }}
          value={value[inputs.last_name]}
          name={inputs.last_name}
        />
        <Input
          label={inputs.email}
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(inputs.email, e.target.value);
          }}
          value={value[inputs.email]}
          name={inputs.email}
          required
        />
        <Select
          name={inputs.role}
          label={inputs.role}
          options={[
            { label: 'admin', value: 'admin' },
            { label: 'staff', value: 'staff' },
            { label: 'super user', value: 'super-user' },
          ]}
          value={value[inputs.role]}
          onChange={(e) => {
            setValue(inputs.role, e.target.value);
          }}
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
        setValue(inputs.firstName, res.data.name);
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
        setValue(inputs.firstName, '');
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
              label={inputs.firstName}
              type="text"
              className="w-full"
              onChange={(e) => {
                setValue(inputs.firstName, e.target.value);
              }}
              value={value[inputs.firstName]}
              name={inputs.firstName}
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
