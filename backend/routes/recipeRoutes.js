const express = require('express');
const router = express.Router();
const {
  getRecipes,
  singleRecipe,
  postRecipe,
  imageRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');
const { singleUploadCtrl } = require('../middleware/imageMiddleware');

router.route('/').get(getRecipes).post(protect, postRecipe);
router.route('/image-upload').post(singleUploadCtrl, imageRecipe);
router.route('/:id').get(singleRecipe).delete(protect, deleteRecipe);
router.route('/:id/edit').put(protect, updateRecipe);

module.exports = router;
