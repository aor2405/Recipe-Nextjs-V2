import Link from 'next/link';

export default function RecipeCard(recipes) {
  return (
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      {recipes.recipes.map((recipe, idx) => (
        <div
          key={idx}
          className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-burntOrange text-peach"
        >
          <div className="flex-shrink-0">
            <Link href={`/recipes/${recipe._id}`}>
              <img
                className="h-48 w-full object-cover cursor-pointer"
                src={recipe.image}
                alt="Recipe image"
              />
            </Link>
          </div>

          <div className="flex-1  p-6 flex flex-col justify-between">
            <div className="flex-1">
              <Link href={`/recipes/${recipe._id}`}>
                <button className="text-xl font-semibold hover:text-2xl">
                  {recipe.title}
                </button>
              </Link>
              <p className="mt-3 text-base text-peach">{recipe.description}</p>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-peach italic">
                  Posted by: {recipe.userName}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
