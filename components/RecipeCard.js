import { Recipe } from '../mockData/index';
import NavBar from './layout/mainNavigation';
import AllRecipe from './Logo/AllRecipe';

export default function RecipeCard() {
  return (
    <div className="relative bg-slate-100 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className=" h-1/3 sm:h-2/3">
          <NavBar />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center flex justify-evenly">
          <div className="mt-10">
            {' '}
            <AllRecipe />
          </div>
          <div className="w-40">
            <img src="/images/table.svg" alt="" />
          </div>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {Recipe.map((post) => (
            <div
              key={post.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.imageUrl}
                  alt="Recipe image"
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-900">
                    {post.recipetitle}
                  </p>
                  <p className="mt-3 text-base text-gray-500">
                    {post.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    {/* <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span> */}
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.authorUrl}
                      alt=""
                    />
                    {/* </a> */}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 hover:underline">
                      {post.author}
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
