const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id });
  res.status(200).json(recipes);
});

const postRecipe = asyncHandler(async (req, res) => {
  console.log('POST REQ SUCCESSFUL');
  // if (!req.body.text) {
  //   res.status(400);
  //   throw new Error('Please add a text field');
  // }
  // const recipe = await Recipe.create({
  //   user: req.user.id,
  //   title: req.body.title,
  //   method: req.body.method,
  //   description: req.body.description,
  //   ingredients: req.body.ingredients,
  // });
  // res.status(200).json(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    res.status(400);
    throw new Error('Recipe not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedRecipe);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.status(400);
    throw new Error('Recipe not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  if (recipe.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await recipe.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
};
