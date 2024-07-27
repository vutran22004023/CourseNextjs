import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',
  name: "",
  email: "",
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
      state.avatar = avatar || "";
      state.id = _id || '';
      state.isAdmin = isAdmin || false;
      state.status = status || false;
      state.password = 'not password';

      // Lưu trữ access_Token trong memory hoặc cookies thay vì trong state
      if (access_Token) {
        setToken(access_Token);
      }
    },
    resetUser: (state) => {
      Object.assign(state, initialState);
      removeToken(); // Xóa token khỏi cookies hoặc memory khi người dùng đăng xuất
    },
  },
});

// Hàm lưu trữ token vào cookies
const setToken = (token: string) => {
  document.cookie = `access_Token=${token}; Secure; SameSite=Strict; Path=/`;
};

// Hàm xóa token từ cookies
const removeToken = () => {
  document.cookie = `access_Token=; Max-Age=0; Path=/`;
};

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
