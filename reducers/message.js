import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const messageSlice = createSlice({
  name: "message",

  initialState,
  reducers: {
    clickMessage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clickMessage } = messageSlice.actions;
export default messageSlice.reducer;
