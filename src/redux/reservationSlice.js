import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
  error: null,
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,

  reducers: {
    reservationSuccess: (state, action) => {
      state.reservations = action.payload;
    },

    reservationFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  reservationSuccess,
  reservationFailure,
} = reservationSlice.actions;

export default reservationSlice.reducer;