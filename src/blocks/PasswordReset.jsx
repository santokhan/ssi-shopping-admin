import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';
import api from '../axios/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Print from '../components/Print';
import { getPasswordWarnings } from '../utils/pattern';
import PasswordWarnings from '../components/form/input/PasswordWarnings';
import filterSpecialCharacters from '../utils/filterSpecialCharacters';
import Input from '../components/form/input/Input';

const PasswordReset = () => {
  const initialState = {
    new_password: '',
    confirm_password: '',
    isLoading: false,
  };
  const [state, setState] = useState(initialState);
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function setNewPassword(e) {
    e.preventDefault();

    setState({ ...state, isLoading: true });

    if (getPasswordWarnings(state.new_password).length == 0) {
      if (state.new_password !== state.confirm_password) {
        toast('Passwords do not match');
        setState({ ...state, isLoading: false });
        return;
      } else {
        api
          .post('users/set-new-password/?token=' + resetToken, {
            new_password: state.confirm_password,
          })
          .then((res) => {
            setState({ ...state, isLoading: false });

            if (res.data) {
              toast('Password reset successful');
              navigate('/signin');
            }
          })
          .catch((err) => {
            toast(err.message);
            console.log(err);
            setState({ ...state, isLoading: false });
          });
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-white relative w-full max-w-md shadow p-4 lg:p-10 rounded-xl">
      <div className="w-full space-y-8">
        <Link to="/" className="flex justify-center">
          <Logo />
        </Link>
        <form className="mt-4 space-y-4" onSubmit={setNewPassword}>
          <h5 className="text-xl font-semibold">Set new password</h5>
          <Input
            type="password"
            name="new_password"
            value={state.new_password}
            onChange={handleChange}
            placeholder="New Password"
            required
          />
          <PasswordWarnings password={state.new_password} />
          <Input
            type="password"
            name="confirm_password"
            value={state.confirm_password}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
          <div className="">
            <button className="w-full rounded-md bg-dark-blue-500 hover:bg-dark-blue-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-opacity-90 lg:text-base">
              Reset
              <ArrowUpRightIcon className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
          <p className="font-medium text-gray-800 flex justify-end gap-2">
            Go to
            <a
              href="/signin"
              className="text-dark-blue-500 hover:text-dark-blue-400 inline-block text-base hover:underline"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
