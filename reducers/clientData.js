import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const clientSlice = createSlice({
  name: "clientData",

  initialState,
  reducers: {
    sendClientData: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { sendClientData } = clientSlice.actions;
export default clientSlice.reducer;
