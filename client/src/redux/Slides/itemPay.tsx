import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: '',  // Khởi tạo id rỗng
};

const itemPayCourseSlice = createSlice({
  name: "itemPayCourse",
  initialState,
  reducers: {
    // Hàm reducer để xử lý việc cập nhật id
    setItemPay: (state, { payload }) => {
      const { idPayCourse } = payload; // Log idPayCourse để kiểm tra giá trị
      state.id = idPayCourse || '';  // Cập nhật state.id với idPayCourse hoặc chuỗi rỗng nếu không có idPayCourse
    },
  },
});

export const { setItemPay } = itemPayCourseSlice.actions; // Xuất hàm action
export default itemPayCourseSlice.reducer; // Xuất reducer
