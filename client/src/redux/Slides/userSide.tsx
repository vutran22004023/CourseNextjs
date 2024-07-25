'use client'
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: '',
  name: "",
  email: "",
  access_Token: "",
  avatar: "",
  isAdmin: false,
  status: false,
  password: '',
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      const { name, email, access_Token, avatar, _id, isAdmin, status } = payload;
      state.name = name || "";
      state.email = email || "";
      state.access_Token = access_Token || "";
      state.avatar = avatar || "";
      state.id = _id || '';
      state.isAdmin = isAdmin || false;
      state.status = status || false;
      state.password = 'not password'
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;