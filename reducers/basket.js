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
    updateProductMot: (state, action) => {
      const { productIndex, mot } = action.payload;
      state.value[productIndex].mot = mot;
    },
    updateProductSignature: (state, action) => {
      const { productIndex, signature } = action.payload;
      state.value[productIndex].signature = signature;
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  updateProductMot,
  updateProductSignature,
} = basketSlice.actions;
export default basketSlice.reducer;
