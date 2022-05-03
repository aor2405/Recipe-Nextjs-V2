const express = require('express');
const router = express.Router();
const {
  getRecipes,
  postRecipe,
  imageRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const { singleUploadCtrl } = require('../middleware/imageMiddleware');

router.route('/').get(getRecipes).post(protect, postRecipe);
router.route('/image-upload').post(singleUploadCtrl, imageRecipe);
router.route('/:id').put(protect, updateRecipe).delete(protect, deleteRecipe);

module.exports = router;
