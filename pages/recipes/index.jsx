import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getRecipes, reset } from '../../src/features/recipes/recipeSlice';
import RecipeCardMock from '../../components/RecipeCardMock';
import RecipeCard from '../../components/RecipeCard';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user } = userList;

  const recipeList = useSelector((state) => state.recipes);
  const { recipe, isLoading, isError, message } = recipeList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      console.log('ERROR', isError);
    }

    dispatch(getRecipes());
    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    mounted && (
      <div>
        {/* {recipe && (
          <div>
            {recipe.map((recipe, idx) => (
              <div key={idx}>{recipe.title}</div>
            ))}
          </div>
        )} */}
        <RecipeCard recipes={recipe} />
        <RecipeCardMock />
        {user ? (
          <Link href="/recipes/new-recipe" passHref>
            <Button name="New Recipe" />
          </Link>
        ) : (
          <></>
        )}
      </div>
    )
  );
}
