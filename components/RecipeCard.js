import Link from 'next/link';

import AllRecipe from './Logo/AllRecipe';

export default function RecipeCard(recipes) {
  return (
    <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-12 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center flex justify-evenly">
          <div className="mt-10">
            <AllRecipe />
          </div>
          <div className="w-40">
            <img src="/images/table.svg" alt="" />
          </div>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {recipes.recipes.map((recipe, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-burntOrange text-peach"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={recipe.image}
                  alt="Recipe image"
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <Link href={`/recipes/${recipe._id}`}>
                    <button className="text-xl font-semibold text-gray-900">
                      {recipe.title}
                    </button>
                  </Link>
                  <p className="mt-3 text-base text-gray-500">
                    {recipe.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    {/* <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span> */}
                    {/* <img
                      className="h-10 w-10 rounded-full"
                      src={post.authorUrl}
                      alt=""
                    /> */}
                    {/* </a> */}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 hover:underline italic">
                      Posted by: {recipe.userName}
                    </p>
                    {/* <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
