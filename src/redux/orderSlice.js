import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {
    orderSuccess: (state, action) => {
      state.orders = action.payload;
    },

    orderFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  orderSuccess,
  orderFailure,
} = orderSlice.actions;

export default orderSlice.reducer;