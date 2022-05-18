import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getRecipes, reset } from '../../src/features/recipes/recipeSlice';
import RecipeCard from '../../components/RecipeCard';
import Spinner from '../../components/Spinner';
import NavBar from '../../components/layout/mainNavigation';
import AllRecipe from '../../components/Logo/AllRecipe';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const recipeList = useSelector((state) => state.recipes);
  const { recipes, isLoading, isError, message } = recipeList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log('ERROR', isError);
    }

    dispatch(getRecipes());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    mounted && (
      <>
        <NavBar />
        <div className="relative pt-4 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center flex justify-evenly">
              <div className="mt-10 w-72 lg:w-96">
                <AllRecipe />
              </div>
              <div className="hidden w-40 lg:block">
                <img
                  src="/images/table.svg"
                  alt="A couple sitting at a table eating a meal"
                />
              </div>
            </div>

            <RecipeCard recipes={recipes} />
          </div>
        </div>
      </>
    )
  );
}
