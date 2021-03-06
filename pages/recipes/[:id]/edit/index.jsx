import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Spinner from '../../../../components/Spinner';
import {
  createRecipeImage,
  updateRecipe,
} from '../../../../src/features/recipes/recipeSlice';

import NavBar from '../../../../components/layout/mainNavigation';

export default function editRecipeForm() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [pathname, setPathname] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    method: '',
    ingredients: [],
    image: '',
  });

  useEffect(() => {
    setMounted(true);
    const recipeId = window.location.pathname;
    setPathname(recipeId);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const recipeList = useSelector((state) => state.recipes);
  const { isLoading } = recipeList;

  function changeHandler(e) {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  }

  const imageHandler = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Return error message for validation
    if (!selectedImage) {
      return;
    }

    const imageData = new FormData();
    imageData.append('image', selectedImage);

    await dispatch(createRecipeImage(imageData)).then((result) => {
      setFormData((prevState) => ({
        ...prevState,
        image: result.payload.url,
      }));
    });
  };

  if (formData.image.length > 0) {
    const route = pathname.slice(9);
    dispatch(updateRecipe({ formData, route }));
    setFormData({
      title: '',
      description: '',
      method: '',
      ingredients: [],
      image: '',
    });

    router.replace('/recipes');
  }

  const customIdPending = 'custom-id-pending';

  if (isLoading) {
    toast.info('Updating your recipe!', {
      toastId: customIdPending,
      autoClose: 1000,
    });
    return <Spinner />;
  }

  return (
    mounted && (
      <>
        <NavBar />
        <div className="max-w-7xl mx-auto py-6 px-2 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <aside className="md:col-span-1">
              <div className="px-4 text-center sm:px-0">
                <h3 className="text-2xl font-medium leading-6">
                  Edit your recipe
                </h3>
                <p className="mt-2 text-sm text-grey">
                  This recipe will be available for all users of{' '}
                  <span className="italic">O'Reilly Recipes</span> to explore
                  and rate.
                </p>
              </div>
              <div>
                <div className="hidden mt-8 sm:max-w-2xl sm:px-6 md:block lg:max-w-none lg:px-0">
                  <img
                    src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt="Photo of a bowl of soup"
                  />
                </div>
              </div>
            </aside>

            <div className="mt-5 rounded-lg bg-burntOrange md:mt-0 md:col-span-2">
              <form
                onSubmit={onSubmit}
                method="POST"
                enctype="multipart/form-data"
              >
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 space-y-6 sm:p-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-peach"
                      >
                        Recipe Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="shadow-sm bg-peach focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md sm:text-sm"
                          value={formData.title}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-peach"
                      >
                        Brief description for your Recipe.
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="shadow-sm bg-peach focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md sm:text-sm"
                          value={formData.description}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-peach">
                        Ingredients - (Use the '.' symbol to show a new
                        ingredient)
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="ingredients"
                          name="ingredients"
                          rows={3}
                          className="shadow-sm bg-peach focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md sm:text-sm"
                          value={formData.ingredients}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-peach">
                        Method - (Use the '*' symbol to show a new step)
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="method"
                          name="method"
                          rows={3}
                          className="shadow-sm bg-peach focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md sm:text-sm"
                          value={formData.method}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-peach">
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-black border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-black"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-black lg:pl-32">
                            <label
                              htmlFor="image"
                              className="relative cursor-pointer bg-burntOrange rounded-md font-medium text-black hover:text-peach focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500"
                            >
                              <input
                                type="file"
                                class="admin__input"
                                id="image"
                                name="image"
                                className="w-full"
                                onChange={imageHandler}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-black">
                            PNG, JPG, JPEG up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex bg-peach justify-center py-2 px-4 border border-grey border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
}
