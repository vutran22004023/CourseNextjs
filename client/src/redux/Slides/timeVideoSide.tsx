"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: "",
  isPlaying: false,
  percentCourse: null,
  totalVideo: null,
  totalcompletedVideo: null,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    timeVideos: (state, { payload }) => {
      const { time, isPlaying } = payload;
      state.time = time || "";
      state.isPlaying = isPlaying || false;
    },
    totalVideo: (state, { payload }) => {
      const { percentCourse, totalVideo, totalcompletedVideo } = payload;
      state.percentCourse = percentCourse;
      state.totalVideo = totalVideo;
      state.totalcompletedVideo = totalcompletedVideo;
    },
  },
});

export const { timeVideos, totalVideo } = timeSlice.actions;
export default timeSlice.reducer;
