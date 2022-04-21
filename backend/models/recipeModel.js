const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    ingredients: {
      type: String,
      required: [true, 'Please add ingredients'],
    },
    method: {
      type: String,
      required: [true, 'Please add a method'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
