import api from '../axios/api';
import { useNavigate, redirect } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SignInForm = () => {
    const [state, setState] = useState({
        email: "",
        phone: "",
        isLoading: false,
    })

    const { signin, isAuthenticated } = useAuth();
    const navigate = useNavigate()
    const authorized = isAuthenticated();

    function handleSignIn(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        setState({ ...state, isLoading: true });
        api.post('token/', { username: username, password })
            .then((res) => {
                // setState({ ...state, isLoading: false });

                if (res.data) {
                    // Save token to auth context
                    const user = null;
                    const token = res.data;
                    signin(user, token);
                    navigate('/')
                }
            })
            .catch((err) => {
                toast(err.message)
                console.log(err);
            }).finally(() => {
                setState({ ...state, isLoading: false })
            });
    }

    useEffect(() => {
        if (authorized) {
            navigate('/')
        }
    }, [authorized, navigate])

    console.log(state);

    return (
        <div className="w-full flex flex-wrap items-center gap-8 rounded-xl bg-white p-4 sm:p-6 lg:flex-nowrap lg:p-12">
            <div className="bg-white relative mx-auto grid w-96 max-w-md place-items-center lg:flex-shrink-0">
                <div className="w-full space-y-8 text-center">
                    <h1 className="text-center text-2xl font-semibold md:text-3xl lg:text-4xl">Login</h1>
                    <form className="w-full" onSubmit={handleSignIn}>
                        <div className="mb-5 space-y-2">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="placeholder-text-blue text-blue focus:border-blue w-full rounded-md bg-slate-100 px-4 py-3 text-sm font-medium outline-none focus-visible:shadow-none lg:py-4 lg:text-base"
                                spellCheck="false"
                                required
                            />
                        </div>
                        <div className="mb-5 space-y-2">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="placeholder-text-blue text-blue focus:border-blue w-full rounded-md bg-slate-100 px-4 py-3 text-sm font-medium outline-none focus-visible:shadow-none lg:py-4 lg:text-base"
                                required
                            />
                            <div className="flex justify-end">
                                {/* <a href="/auth/forgot" className="text-blue-400 text-xs font-medium hover:underline">Forgot password?</a> */}
                            </div>
                        </div>
                        <div className="w-full">
                            <button className="w-full rounded-md bg-blue-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-opacity-90 lg:text-base">Login</button>
                        </div>
                    </form>
                    {/* <p className="font-medium text-gray-800">Don&apos;t have an account? <a href="/auth/register" className="text-blue-400 hover:text-blue inline-block text-base hover:underline">Register</a></p> */}
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
