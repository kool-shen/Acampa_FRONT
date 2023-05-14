import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const deliverySlice = createSlice({
  name: "delivery",

  initialState,
  reducers: {
    clickDelivery: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clickDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
