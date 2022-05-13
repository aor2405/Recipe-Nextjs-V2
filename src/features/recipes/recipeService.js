import axios from 'axios';

const API_URL = 'http://localhost:4000/api/recipes/';
const API_URL_ID = 'http://localhost:4000/api/recipes/';
const API_URL_IMAGE = 'http://localhost:4000/api/recipes/image-upload';

// Create new recipe
const createRecipe = async (recipeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, recipeData, config);

  return response.data;
};

const createRecipeImage = async (imageData) => {
  const response = await axios.post(API_URL_IMAGE, imageData);

  return response.data;
};

const getRecipes = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

const getSingleRecipe = async (recipeId) => {
  const response = await axios.get(API_URL_ID + recipeId);

  return response.data;
};

const updateRecipe = async (recipeData, route, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL_ID + route, recipeData, config);

  return response.data;
};

const deleteRecipe = async (recipeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL_ID + recipeId, config);

  return response.data;
};

// Get user specific recipes
// const getUserRecipes = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const response = await axios.get(API_URL, config);

//   console.log('RESPONSE', response.data[0]);
//   return response.data;
// };

const recipeService = {
  createRecipe,
  createRecipeImage,
  getRecipes,
  getSingleRecipe,
  updateRecipe,
  deleteRecipe,
  // getUserRecipes
};

export default recipeService;
