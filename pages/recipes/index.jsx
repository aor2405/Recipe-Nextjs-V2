import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getRecipes, reset } from '../../src/features/recipes/recipeSlice';
import RecipeCard from '../../components/RecipeCard';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import NavBar from '../../components/layout/mainNavigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user } = userList;

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
        <RecipeCard recipes={recipes} />
        {user ? (
          <Link href="/recipes/new-recipe" passHref>
            <Button name="New Recipe" />
          </Link>
        ) : (
          <></>
        )}
      </>
    )
  );
}
