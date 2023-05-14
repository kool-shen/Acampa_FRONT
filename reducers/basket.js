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
      const { productindex, mot } = action.payload;
      state.value[productindex].mot = mot;
    },
    updateProductSignature: (state, action) => {
      const { productindex, signature } = action.payload;
      state.value[productindex].signature = signature;
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  updateProductMot,
  updateProductSignature,
  setClientData,
} = basketSlice.actions;
export default basketSlice.reducer;
