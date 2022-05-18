import { useState, useEffect } from 'react';
import Link from 'next/link';

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
          <div className="lg:h-screen">
            <div className="mx-auto max-w-6xl lg:px-8">
              <div className="mt-16 md:grid md:grid-cols-2 md:gap-8">
                <div className="mx-auto max-w-md px-4 text-center sm:max-w-2xl sm:px-8 md:flex md:items-center lg:px-0 lg:text-left">
                  <div className="w-full rounded-lg bg-burntOrange shadow lg:pl-4 lg:py-2">
                    <h1 className="text-peach font-extrabold pt-12 text-3xl sm:mt-5 md:text-4xl lg:text-6xl">
                      A better way to store your Recipes
                    </h1>
                    <p className="mt-4 sm:text-base md:text-lg xl:text-xl">
                      Jump right in and explore our many recipes that have been
                      submitted from all around the world. Feel free to share
                      some of our own and comment of others!
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <div className="flex justify-center pb-4">
                        <div className="bg-peach w-48 mt-3 sm:mt-0 sm:ml-3 rounded-lg">
                          <Link href="/recipes">
                            <button
                              type="submit"
                              className="block w-full py-3 px-4 rounded-lg"
                            >
                              View Recipes
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invisible md:visible lg:m-0 md:relative">
                  <div className="mx-auto max-w-md px-4 lg:max-w-none lg:px-0">
                    <img
                      className="w-full rounded-lg lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://images.unsplash.com/photo-1601226809816-b8c32440158a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                      alt="Image of stir fry cooking"
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
