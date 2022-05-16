import Link from 'next/link';
import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import {
  MenuIcon,
  XIcon,
  LoginIcon,
  LogoutIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';

import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../src/features/auth/authSlice';

import Logo from '../Logo/Logo';

const navigation = [
  { name: 'Recipce', href: '/recipes', current: true },
  { name: 'Contact', href: '/contact', current: false },
];

export default function Example() {
  const dispatch = useDispatch();
  // Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user } = userList;
  const router = useRouter();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    router.replace('/recipes');
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <Disclosure as="nav" className="shadow border-b-2 border-burntOrange">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            {/* <div className="relative items-center justify-between h-16 sm:flex"> */}
            <div className="relative items-center justify-between h-16 sm:flex">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  {/* <div className="mt-2 invisible xs:visible flex-shrink-0 flex items-center"> */}
                  <div className="mt-2 flex-shrink-0 w-48 xs:w-56 sm:w-72">
                    <Link href="/">
                      <a>
                        <Logo />
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block md:ml-6">
                  <div className="flex space-x-4 pt-3 ">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="px-3 py-2 rounded-md text-sm font-medium"
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    {user && (
                      <div className="px-3 py-2 text-sm font-medium">
                        <Link href="/recipes/new-recipe">
                          <a className="flex">
                            <p>Add recipe</p>
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="invisible md:visible flex">
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

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium"
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {user ? (
                <div>
                  <div>
                    <Link href="/recipes/new-recipe">
                      <a className="flex ">
                        <p className="block px-3 py-2 text-base font-medium">
                          Add recipe
                        </p>
                      </a>
                    </Link>
                  </div>
                  <button className="flex" onClick={onLogout}>
                    <p className="block px-3 py-2 text-base font-medium">
                      Logout
                    </p>
                  </button>
                </div>
              ) : (
                <>
                  {' '}
                  <div className="mr-4 px-2 pt-2 pb-3 space-y-1">
                    <Link href="/login">
                      <a className="flex">
                        <p>Login</p>
                      </a>
                    </Link>
                  </div>
                  <Link href="/register">
                    <a className="flex px-2 pt-2 pb-3 space-y-1">
                      <p>Register</p>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
