import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Popover, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import NavBar from '../components/layout/mainNavigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <>
        <NavBar />
        <main>
          <div className="h-screen sm:mt-16">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="sm:pl-4 lg:py-24 w-full rounded-lg bg-burntOrange shadow">
                    <h1 className="mt-4 text-4xl font-extrabold text-peach sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      A better way to store your Recipes
                    </h1>
                    <p className="mt-4 sm:text-xl lg:text-lg xl:text-xl">
                      Jump right in and explore our many recipes that have been
                      submitted from all around the world. Feel free to share
                      some of our own and comment of others!
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="sm:flex">
                        <div className="mt-3 sm:mt-0 sm:ml-3 bg-peach rounded-lg">
                          <Link href="/recipes">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4  rounded-lg font-mediumfocus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                            >
                              View Recipes
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                    <img
                      className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none rounded-lg"
                      src="https://images.unsplash.com/photo-1601226809816-b8c32440158a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </>
    )
  );
}
