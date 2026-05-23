import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    fetchMenuSuccess: (state, action) => {
      state.items = action.payload;
    },

    fetchMenuFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchMenuSuccess,
  fetchMenuFailure,
} = menuSlice.actions;

export default menuSlice.reducer;