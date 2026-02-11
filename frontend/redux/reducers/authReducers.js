import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudents,
  getAllTeachers,
  getUserProfile,
  login,
  register,
} from "../actions/authActions";

const initialState = {
  user: undefined,
  error: false,
  success: false,
  message: "",
  loading: false,
  user_Featch: false,
  teachers: [],
  students: [],
  teachers_featch: false,
  students_featch: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = false;
        state.message = "Pending...";
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = "user register Successfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;

        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = false;
        state.message = "Pending...";
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.message = "user login Successfully";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.message = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = false;
        state.message = "Pending...";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.user_Featch = true;
        state.user = action.payload;
        state.message = "user featch Successfully";
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.user_Featch = false;
        state.message = action.payload;
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.teachers_featch = true;
        state.teachers = action.payload;
        state.message = "user featch Successfully";
      })
      .addCase(getAllTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.teachers_featch = false;
        state.message = action.payload;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.students_featch = true;
        state.students = action.payload;
        state.message = "user featch Successfully";
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.success = false;
        state.students_featch = false;
        state.message = action.payload;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
