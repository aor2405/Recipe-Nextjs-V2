import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { register, reset } from '../../src/features/auth/authSlice';
import Spinner from '../../components/Spinner';
import { LockClosedIcon } from '@heroicons/react/solid';
import NavBar from '../../components/layout/mainNavigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();

  const router = useRouter();

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user, isLoading, isError, isSuccess, message } = userList;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Thank you for registering');
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));

      router.replace('/recipes');
    }
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
                Create an account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm"
                    placeholder="Enter your name"
                    onChange={onChange}
                  />
                </div>
                <div>
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm"
                    placeholder="Enter your email address"
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
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm"
                    placeholder="Enter your password"
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="Password"
                    autoComplete="confirm-password"
                    value={confirmPassword}
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm"
                    placeholder="Confirm password"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-peach"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                    <LockClosedIcon
                      className="h-5 w-5 text-burntOrange "
                      aria-hidden="true"
                    />
                  </span>
                  Register
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
