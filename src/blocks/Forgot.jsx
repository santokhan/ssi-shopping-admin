import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';
import api from '../axios/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const ForgotForm = () => {
  const [state, setState] = useState({
    email: '',
    isLoading: false,
  });

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const authorized = isAuthenticated();

  function handleForgot(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');

    setState({ ...state, isLoading: true });
    api
      .post('forgot/', { username: username })
      .then((res) => {
        setState({ ...state, isLoading: false });

        if (res.data) {
          navigate('/');
        }
      })
      .catch((err) => {
        toast(err.message);
        console.log(err);
      })
      .finally(() => {
        setState({ ...state, isLoading: false });
      });
  }

  useEffect(() => {
    if (authorized) {
      navigate('/');
    }
  }, [authorized, navigate]);

  return (
    <div className="bg-white relative w-full max-w-md shadow p-4 lg:p-10 rounded-xl">
      <div className="w-full space-y-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div>
          <h5 className="text-xl font-semibold">Forgot password</h5>
        </div>
        <form className="mt-4 space-y-4" onSubmit={handleForgot}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-start font-medium block">
              Enter email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              placeholder="santo@mail.com"
              required
            />
          </div>
          <div className="">
            <button className="w-full rounded-md bg-dark-blue-500 hover:bg-dark-blue-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-opacity-90 lg:text-base">
              Reset
              <ArrowUpRightIcon className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
          <p className="font-medium text-gray-800">
            Go to{' '}
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

export default ForgotForm;
