import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  recipe: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
