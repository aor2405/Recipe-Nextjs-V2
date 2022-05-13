import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recipeService from './recipeService';

const initialState = {
  recipes: [],
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

export const getSingleRecipe = createAsyncThunk(
  'recipes/getSingleRecipe',
  async (recipeId, thunkAPI) => {
    try {
      return await recipeService.getSingleRecipe(recipeId);
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

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async (recipeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.updateRecipe(
        recipeData.formData,
        recipeData.route,
        token
      );
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

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (recipeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.deleteRecipe(recipeId, token);
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

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.recipes.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.recipes.push(action.payload);
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createRecipeImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipeImage.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.recipes.push(action.payload);
      })
      .addCase(createRecipeImage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.recipes = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSingleRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = action.payload;
      })
      .addCase(getSingleRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = state.recipes.filter(
          (recipe) => recipe._id !== action.payload.id
        );
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
