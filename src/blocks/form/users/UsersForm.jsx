import { twMerge } from 'tailwind-merge';
import SubmitButton from '../../../components/form/SubmitButton';
import Input from '../../../components/form/input/Input';
import { useContext, useEffect } from 'react';
import useAxios from '../../../context/useAxios';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    // get user by id
    // assign to context using setValue()
    if (id) {
      api.get(`users/${id}/`).then((res) => {
        if (res.data) {
          const data = res.data;
          setValue('email', data.email);
          setValue('username', data.username);
          setValue('first_name', data.first_name);
          setValue('last_name', data.last_name);
          setValue('role', data.role);
        }
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id) {
      api
        .patch(`users/${id}/`, new FormData(e.target), {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          toast(`User updated`, {
            type: 'success',
          });

          setValue({
            email: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            role: '',
          });

          navigate('/users');
        })
        .catch((err) => {
          showError({ err });
          console.log(err);
        });
    } else {
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
          setValue({
            email: '',
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            role: '',
          });
        })
        .catch((err) => {
          showError({ err });
          console.log(err);
        });
    }
  };

  return (
    <div className={twMerge('bg-white p-4 lg:p-6 space-y-4 max-w-xl')}>
      <div className="flex items-center gap-2">
        {id && <BackAnchor to="/users" />}
        <FormTitle>{id ? 'Edit User' : 'Create User'}</FormTitle>
      </div>
      <form className="space-y-4 lg:space-y-6" onSubmit={handleSubmit}>
        <Input
          label="username"
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(e.target.name, e.target.value);
          }}
          value={value.username}
          name="username"
          required
        />
        <Input
          label="first name"
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(e.target.name, e.target.value);
          }}
          value={value.first_name}
          name="first_name"
        />
        <Input
          label="last name"
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(e.target.name, e.target.value);
          }}
          value={value.last_name}
          name="last_name"
        />
        <Select
          name="role"
          label="role"
          options={[
            { label: 'admin', value: 'admin' },
            { label: 'staff', value: 'staff' },
            { label: 'super user', value: 'super-user' },
          ]}
          value={value.role}
          onChange={(e) => {
            setValue(e.target.name, e.target.value);
          }}
          required
        />
        <Input
          label="email"
          type="text"
          className="w-full"
          onChange={(e) => {
            setValue(e.target.name, e.target.value);
          }}
          value={value.email}
          name="email"
          required
          disabled={!!id}
        />
        {id ? null : (
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
        )}
        <div className="">
          <SubmitButton type="submit" className="" />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
