const asyncHandler = require('express-async-handler');

const getRecipes = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get recipes' });
});

const postRecipe = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  res.status(200).json({ message: 'Create recipe' });
});

const updateRecipe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update recipe ${req.params.id}` });
});

const deleteRecipe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete recipe ${req.params.id}` });
});

module.exports = {
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
};
