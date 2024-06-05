import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect } from 'react';
import useAxios from '../../../context/useAxios';
import { useParams } from 'react-router-dom';
import Select from '../../../components/form/input/SelectOption';
import { UsersContext } from '../../../context/users/UserContext';
import FormTitle from '../../../components/form/FormTitle';
import BackAnchor from '../../../components/BackAnchor';
import Print from '../../../components/Print';
import { toast } from 'react-toastify';
import showError from '../../../components/ShowError';

const inputs = {
  email: 'email',
  username: 'username',
  first_name: 'first_name',
  last_name: 'last_name',
  role: 'role',
};

const UserForm = () => {
  const { value, setValue, refetch } = useContext(UsersContext);
  const { api } = useAxios();
  const { id } = useParams();

  useEffect(() => {
    // get user by id
    // assign to context using setValue()
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post('users/create/', new FormData(e.target), {
        header: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        toast(`New user added`, {
          type: 'success',
        });

        // refetch table
        refetch();

        // reset
        setValue(inputs.name, '');
        setValue(inputs.image, '');
      })
      .catch((err) => {
        showError({ err });
        console.log(err);
      });
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6 space-y-4')}>
      {/* <Print data={value} /> */}
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
        <Input
          label="password"
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(e.target.name, e.target.value);
          }}
          value={value.password}
          name="password"
          required
        />
        <div className="">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
