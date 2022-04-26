import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '../Logo/Logo';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../src/features/auth/authSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const dispatch = useDispatch();

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user } = userList;
  const router = useRouter();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.replace('/recipes');
  };

  return (
    <Disclosure as="nav" className="bg-white shadow border-2 border-cyan-500">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto  px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <Link href="/">
                    <a>
                      <Logo />
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/recipes">
                    <a
                      href="#"
                      className=" text-gray-500 inline-flex items-center px-1 pt-1 text-sm font-medium"
                    >
                      Recipes
                    </a>
                  </Link>
                  <Link href="/contact">
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Contact
                    </a>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <div>
                    <button className="flex" onClick={onLogout}>
                      <LogoutIcon className="w-5 h-5 mr-1 mt-1" />
                      <p>Logout</p>
                    </button>
                  </div>
                ) : (
                  <>
                    {' '}
                    <div className="mr-4">
                      <Link href="/login">
                        <a className="flex">
                          <LoginIcon className="w-5 h-5 mr-1 mt-1" />
                          <p>Login</p>
                        </a>
                      </Link>
                    </div>
                    <Link href="/register">
                      <a className="flex">
                        <UserCircleIcon className="w-5 h-5 mr-1 mt-1" />
                        <p>Register</p>
                      </a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
