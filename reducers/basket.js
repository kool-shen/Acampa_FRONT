import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const basketSlice = createSlice({
  name: "basket",

  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    removeFromBasket: (state, action) => {
      const index = action.payload;
      if (index !== -1) {
        state.value.splice(index, 1);
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;
export default basketSlice.reducer;
