import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existing = state.find(item => item.name === action.payload.name);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQty: (state, action) => {
      const item = state.find(item => item.name === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.find(item => item.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem: (state, action) => {
      return state.filter(item => item.name !== action.payload);
    },

    clearCart: () => []
  }
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;