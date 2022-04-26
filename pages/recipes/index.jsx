import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import axios from 'axios';

import RecipeCard from '../../components/RecipeCard';
import Button from '../../components/Button';

export default function Home() {
  // useEffect(async () => {
  //   const response = await axios.get('api/recipes');
  //   console.log(response);
  // });

  //Select the loaded customers' list from central state
  const userList = useSelector((state) => state.auth);
  const { user } = userList;

  return (
    <div>
      <RecipeCard />
      {user ? (
        <Link href="/recipes/new-recipe" passHref>
          <Button name="New Recipe" />
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
