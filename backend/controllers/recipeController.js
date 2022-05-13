const asyncHandler = require('express-async-handler');
const path = require('path');
const DatauriParser = require('datauri/parser');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

const getRecipes = asyncHandler(async (req, res) => {
  const allRecipes = await Recipe.find({});
  res.status(200).json(allRecipes);
});

const singleRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const newIngredientsArray = recipe.ingredients.split('.');
  const newRecipe = { ...recipe._doc, ingredients: newIngredientsArray };
  res.status(200).json(newRecipe);
});

// const getUserRecipes = asyncHandler(async (req, res) => {
//   const recipes = await Recipe.find({ user: req.user.id });
//   res.status(200).json(recipes);
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinaryUpload = (file) => cloudinary.uploader.upload(file);

const parser = new DatauriParser();

const formatBufferTo64 = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const imageRecipe = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400);
      console.log('req.file not present');
    }
    const file64 = formatBufferTo64(req.file);
    const uploadResult = await cloudinaryUpload(file64.content);

    return res.json({
      cloudinaryId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

const postRecipe = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error('Please fill out the input fields');
  }
  const { title, method, description, ingredients, image } = req.body.formData;

  const newMethodArray = method.split('*');
  const newMethod = newMethodArray;

  const recipe = await Recipe.create({
    user: req.user.id,
    userName: req.user.name,
    title: title,
    method: newMethod,
    description: description,
    ingredients: ingredients,
    image: image,
  });
  return res.status(200).json(recipe);
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
  res.status(200).json([updatedRecipe]);
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
  singleRecipe,
  postRecipe,
  imageRecipe,
  updateRecipe,
  deleteRecipe,
};
