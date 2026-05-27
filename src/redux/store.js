import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import menuReducer from "./menuSlice";
import reservationReducer from "./reservationSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    menu: menuReducer,
    reservations: reservationReducer,
    orders: orderReducer,
  },
});