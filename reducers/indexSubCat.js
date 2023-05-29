import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const indexSlice = createSlice({
  name: "indexSubCat",

  initialState,
  reducers: {
    getIndex: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getIndex } = indexSlice.actions;
export default indexSlice.reducer;
