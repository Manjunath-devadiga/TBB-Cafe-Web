import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    orderStart: (state) => {
      state.loading = true;
    },

    orderSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },

    orderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  orderStart,
  orderSuccess,
  orderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;