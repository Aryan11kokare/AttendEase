import { createSlice } from "@reduxjs/toolkit";
import {
  getAttendceForSubject,
  markAttendance,
  updateAttendace,
} from "../actions/teacherActions.js";
import { getMyAttendance } from "../actions/studentActions";

const initialState = {
  attendance: undefined,
  success: false,
  error: false,
  loading: false,
  message: "",
  attendace_featch: false,
  myAttendace: [],
  summary: {},
  totalAbsent: 0,
  totalPresent: 0,
  totalClasses: 0,
  percentage: 0,
  monthly: {},
  myAttendace_featch: false,
};

const attendaceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(markAttendance.pending, (state) => {
        state.loading = false;
        state.pending = "pending...";
      })
      .addCase(markAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload;
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(updateAttendace.pending, (state) => {
        state.loading = false;
        state.pending = "pending...";
      })
      .addCase(updateAttendace.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload;
      })
      .addCase(updateAttendace.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getAttendceForSubject.pending, (state) => {
        state.loading = false;
        state.pending = "pending...";
      })
      .addCase(getAttendceForSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.attendace_featch = true;
        state.attendance = action.payload;
      })
      .addCase(getAttendceForSubject.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.attendace_featch = false;
        state.message = action.payload;
      })
      .addCase(getMyAttendance.pending, (state) => {
        state.loading = false;
        state.pending = "pending...";
      })
      .addCase(getMyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.myAttendace_featch = true;
        state.myAttendace = action.payload.attendances;
        state.monthly = action.payload.monthly;
        state.summary = action.payload.summary;
        state.totalAbsent = action.payload.totalAbsent;
        state.totalPresent = action.payload.totalPresent;
        state.totalClasses = action.payload.totalClasses;
        state.percentage = action.payload.attendancePercentage;
      })
      .addCase(getMyAttendance.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.myAttendace_featch = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = attendaceSlice.actions;
export default attendaceSlice.reducer;
