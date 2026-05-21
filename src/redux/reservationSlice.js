import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservations: [],
  loading: false,
  error: null,
};

const reservationSlice = createSlice({
  name: "reservations",
  initialState,

  reducers: {
    reservationStart: (state) => {
      state.loading = true;
    },

    reservationSuccess: (state, action) => {
      state.loading = false;
      state.reservations = action.payload;
    },

    reservationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  reservationStart,
  reservationSuccess,
  reservationFailure,
} = reservationSlice.actions;

export default reservationSlice.reducer;