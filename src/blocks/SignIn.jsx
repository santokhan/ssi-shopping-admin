import api from '../axios/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '../components/Logo';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import showError from '../components/ShowError';

const SignInForm = () => {
  const [state, setState] = useState({
    email: '',
    phone: '',
    isLoading: false,
  });
  const { signin, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    setState({ ...state, isLoading: true });
    api
      .post('token/', { username: username, password })
      .then((res) => {
        if (res.data) {
          const user = null;
          const token = res.data;
          signin(user, token);
          navigate('/');
        }
      })
      .catch((err) => {
        showError(err);
        setState({ ...state, isLoading: false });
        console.log(err);
      });
  }
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="bg-white relative grid w-full max-w-md place-items-center lg:flex-shrink-0 shadow p-4 lg:p-10 rounded-xl">
      <div className="w-full space-y-8">
        <Link to="/" className="flex justify-center">
          <Logo />
        </Link>
        <div>
          <h5 className="text-xl font-semibold text-center">Sign in</h5>
          <p className="text-center mt-1 text-sm">
            Sign in with this account across the following sites.
          </p>
        </div>
        <form className="w-full space-y-5" onSubmit={handleSignIn}>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="placeholder-text-blue text-blue focus:border-blue w-full rounded-md px-4 py-2.5 border text-sm outline-none focus-visible:shadow-none lg:text-base block"
            spellCheck="false"
            required
          />
          <div className="mb-5 space-y-2">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="placeholder-text-blue text-blue focus:border-blue w-full rounded-md px-4 py-2.5 border text-sm outline-none focus-visible:shadow-none lg:text-base"
              required
            />
            <div className="flex justify-end">
              <a
                href="forgot"
                className="text-dark-blue-500 hover:text-dark-blue-400 text-sm font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="w-full">
            <button className="w-full rounded-md bg-dark-blue-500 hover:bg-dark-blue-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-opacity-90 lg:text-base">
              Sign in <ArrowUpRightIcon className="inline-block ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
        <p className="font-medium text-gray-800 hidden">
          Don&apos;t have an account?{' '}
          <a
            href="/auth/register"
            className="text-blue-400 hover:text-blue inline-block text-base hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
