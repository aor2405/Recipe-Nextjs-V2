import NavBar from '../../../components/layout/mainNavigation';
import { useState } from 'react';
import axios from 'axios';

export default function NewRecipeForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    method: '',
    ingredients: '',
    image: '',
  });

  function handleChange(e) {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  }

  function imageHandler(e) {
    const image = e.target.files[0];
    setFormData({
      ...formData,
      [e.target.name]: image,
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { title, description, method, ingredients, image } = formData;

      const form = new FormData();
      form.append('title', title);
      form.append('description', description);
      form.append('method', method);
      form.append('ingredients', ingredients);
      form.append('image', image);

      let data = {};
      for (var pair of form.entries()) {
        data[pair[0]] = pair[1];
      }
      // const response = await axios.post('/api/recipes', {
      //   data,
      // });
      const response = await axios.post('/recipe/new-recipe', {
        data,
      });
      console.log('RESPIONSE', response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-grey-100">
        <div className="max-w-7xl mx-auto mt-6 py-6 sm:px-6 lg:px-8">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add a new recipe
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This recipe will be available for all users of Recipes to
                  explore and rate.
                </p>
              </div>
              <div>
                {' '}
                <div className="mx-auto mt-12 max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                  <img
                    src="https://images.unsplash.com/photo-1459789034005-ba29c5783491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2738&q=80"
                    alt="Photo of a Waffle"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={submitHandler} enctype="multipart/form-data">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-slate-50 space-y-6 sm:p-6">
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Recipe Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="title"
                          name="title"
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Brief description for your Recipe.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Ingredients
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="ingredients"
                          name="ingredients"
                          rows={3}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          value={formData.ingredients}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Method
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="method"
                          name="method"
                          rows={3}
                          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          value={formData.method}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cover photo
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
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
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-cyan-600 hover:text-cyan-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500"
                            >
                              <span>Upload a file</span>
                              <input
                                onChange={imageHandler}
                                id="file-upload"
                                name="image"
                                type="file"
                                className="sr-only"
                                accept=".jpg, .png, .jpeg"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </>
  );
}
