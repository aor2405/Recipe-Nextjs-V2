const express = require('express');
const router = express.Router();
const {
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');

router.route('/').get(getRecipes).post(postRecipe);
router.route('/:id').put(updateRecipe).delete(deleteRecipe);

module.exports = router;
