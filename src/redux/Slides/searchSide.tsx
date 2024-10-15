"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const timeSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    Search: (state, { payload }) => {
      const { search } = payload;
      state.search = search || "";
    },
  },
});

export const { Search } = timeSlice.actions;
export default timeSlice.reducer;
