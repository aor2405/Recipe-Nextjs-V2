import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

import RecipeCard from '../../components/RecipeCard';
import Button from '../../components/Button';

export default function Home() {
  // useEffect(async () => {
  //   const response = await axios.get('api/recipes');
  //   console.log(response);
  // });

  return (
    <div>
      <RecipeCard />
      <Link href="/recipes/new-recipe" passHref>
        <Button name="New Recipe" />
      </Link>
    </div>
  );
}
