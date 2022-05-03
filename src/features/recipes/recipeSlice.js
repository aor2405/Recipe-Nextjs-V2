import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recipeService from './recipeService';

const initialState = {
  recipe: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new recipe
export const createRecipe = createAsyncThunk(
  'recipes/create',
  async (recipeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.createRecipe(recipeData, token);
    } catch (err) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createRecipeImage = createAsyncThunk(
  'recipes/create-image',
  async (imageData, thunkAPI) => {
    try {
      return await recipeService.createRecipeImage(imageData);
    } catch (err) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, thunkAPI) => {
    try {
      return await recipeService.getRecipes();
    } catch (err) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user specific recipes
// export const getRecipes = createAsyncThunk(
//   'recipes/getUserRecipes',
//   async (_, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await recipeService.getRecipes(token);
//     } catch (err) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipe.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipe = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
