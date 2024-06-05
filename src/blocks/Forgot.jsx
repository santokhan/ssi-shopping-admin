import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';
import api from '../axios/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';

const ForgotForm = () => {
  const initialState = {
    email: '',
    isLoading: false,
  };
  const [state, setState] = useState(initialState);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleForgot(e) {
    e.preventDefault();

    // start loading
    setState((prev) => ({ ...prev, isLoading: true }));

    if (state.email) {
      api
        .post('users/forgot-password/', { email: state.email })
        .then((res) => {
          setState(initialState);
          toast('Reset link sent to your email', {
            type: 'success',
          });
          if (res.data) {
            const data = res.data;
            // Response
            // {
            //   "success": "Password reset email sent",
            //   "frontend_verification_url": "https://admin.bsmproperty.ae/reset-password?token=vZlNKr6bYBMWQ0i7QuG5gVWhd4ErpVRu5Rozy6L1WXWZ1rMVZTFQ3tpWBI5AXrNA0xGdMFKqD8veucDJcpuV7z08XumIYFxM6clSrQPRtwNLmzLnYPEFXYeuU1E1hcxb",
            //   "backend_verification_url": "/api/users/set-new-password/?token=vZlNKr6bYBMWQ0i7QuG5gVWhd4ErpVRu5Rozy6L1WXWZ1rMVZTFQ3tpWBI5AXrNA0xGdMFKqD8veucDJcpuV7z08XumIYFxM6clSrQPRtwNLmzLnYPEFXYeuU1E1hcxb"
            // }
            if (data?.frontend_verification_url) {
              const url = new URL(data.frontend_verification_url);
              navigate(url.pathname + url.search);
            }
          }
        })
        .catch((err) => {
          toast(err.message);
          setState(initialState);
        });
    }
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
        <form className="space-y-4" onSubmit={handleForgot}>
          <h5 className="text-xl font-semibold">Forgot password</h5>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="your.email@gmail.com"
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
            required
          />
          <div className="">
            <button className="w-full rounded-md bg-dark-blue-500 hover:bg-dark-blue-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-opacity-90 lg:text-base">
              Get reset link
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

export default ForgotForm;
