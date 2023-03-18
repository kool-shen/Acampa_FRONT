import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: "loading",

  initialState,
  reducers: {
    isLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { isLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
