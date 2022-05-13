import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import NavBar from '../../../components/layout/mainNavigation';
import Spinner from '../../../components/Spinner';
import {
  getSingleRecipe,
  deleteRecipe,
} from '../../../src/features/recipes/recipeSlice';

function index() {
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState('');

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user } = userList;

  const recipeList = useSelector((state) => state.recipes);
  const { recipes, isLoading, isError, message, isSuccess } = recipeList;

  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);

    if (isError) {
      console.log('ERROR', isError);
    }
    const recipeId = window.location.pathname;
    setPathname(recipeId);

    dispatch(getSingleRecipe(recipeId.slice(9)));
    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    mounted && (
      <>
        <NavBar />

        <div className="max-w-3xl mx-auto mt-8 pb-8 sm:max-w-7xl sm:px-8 sm:grid sm:grid-cols-12 sm:gap-8">
          <aside className="sm:col-span-4 h-screen">
            <div className="w-full rounded-lg bg-burntOrange shadow text-peach  ">
              <div className="flex-shrink-0">
                <h2 className="text-2xl font-bold font-header pl-6 pt-6">
                  Description
                </h2>
                <div className="mt-2 px-4 text">{recipes.description}</div>
              </div>
              <p className="text-2xl font-bold font-header pt-6 mb-2 ml-8">
                Ingredients
              </p>
              <ul className="ml-6 pb-6 list-disc">
                {recipes.ingredients &&
                  recipes.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
              </ul>
            </div>
          </aside>

          <article className="mt-8 sm:mt-0 sm:col-span-8">
            <div className="w-full rounded-lg bg-burntOrange text-peach  shadow">
              <div className="flex justify-center">
                <h1 className="text-5xl font-extrabold font-header mt-3">
                  {recipes.title}
                </h1>
              </div>
              <div className="py-6 mx-6">
                <div className="flex justify-center">
                  <img
                    className="h-48 w-80 object-cover rounded-md "
                    src={recipes.image}
                    alt="Recipe image"
                  />
                </div>
                <h2 className="text-2xl mt-6 font-bold font-header">Method</h2>
                <ul className="ml-6 mt-2 list-decimal">
                  {recipes.method &&
                    recipes.method.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                </ul>
              </div>
              <div>
                {user._id === recipes.user && (
                  <div className="mt-2 pb-8 flex justify-center">
                    <div className="mt-3 sm:mt-3 sm:ml-3 w-40 bg-peach rounded-lg">
                      <Link href={`/recipes/${pathname.slice(9)}/edit`}>
                        <button
                          type="submit"
                          className="block w-full py-3 px-4 text-burntOrange rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-3 sm:ml-3 w-40 bg-peach rounded-lg">
                      <Link href="/recipes">
                        <button
                          onClick={() => {
                            dispatch(deleteRecipe(recipes._id));
                          }}
                          className="block w-full py-3 px-4 text-burntOrange rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                        >
                          Delete
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </>
    )
  );
}

export default index;
