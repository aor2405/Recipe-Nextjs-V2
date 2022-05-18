import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { LockClosedIcon } from '@heroicons/react/solid';
import Spinner from '../../components/Spinner';
import { login, reset } from '../../src/features/auth/authSlice';
import NavBar from '../../components/layout/mainNavigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const router = useRouter();

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user, isLoading, isError, isSuccess, message } = userList;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success('Registeration completed!');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
    router.replace('/recipes');
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <NavBar />
      <div className="max-w-xl mx-auto px-8 grid grid-col-12 lg:max-w-7xl lg:grid-cols-12 lg:gap-8">
        <main className="h-screen pt-12 lg:pt-24 lg:col-start-4 lg:col-span-6">
          <div className="w-full rounded-lg bg-burntOrange shadow p-6">
            <div>
              <div className="flex justify-center">
                <img
                  className="w-40"
                  src="/images/table.svg"
                  alt="A couple sitting together enjoying a meal"
                />
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-peach">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px ">
                <div className="">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-peach">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-peach"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-burntOrange"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
