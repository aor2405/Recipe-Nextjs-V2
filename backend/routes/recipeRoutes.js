const express = require('express');
const router = express.Router();
const {
  getRecipes,
  postRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getRecipes).post(protect, postRecipe);
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe);

module.exports = router;
