import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,

  reducers: {
    fetchMenuStart: (state) => {
      state.loading = true;
    },

    fetchMenuSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },

    fetchMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
} = menuSlice.actions;

export default menuSlice.reducer;