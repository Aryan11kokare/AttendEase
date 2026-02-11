import { createSlice } from "@reduxjs/toolkit";
import {
  addClassRoom,
  addStudentToClass,
  addTeacherToClass,
  createSubject,
  deleteClassRoom,
} from "../actions/adminActions";
import {
  getAllSubjects,
  getClassroomById,
  getClassrooms,
} from "../actions/authActions";
import { getclassroomsOfTeahcers } from "../actions/teacherActions";

const initialState = {
  classRoom: undefined,
  classrooms: [],
  teachersClassrooms: [],
  subjects: [],
  success: false,
  error: false,
  loading: false,
  message: "",
  classFeatch: false,
  classRoomsFeatch: false,
  teacherClassRoomsFeatch: false,
  subjectsFeatch: false,
};

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClassRoom.pending, (state) => {
        state.loading = false;
        state.message = "pending...";
      })
      .addCase(addClassRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload;
      })
      .addCase(addClassRoom.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(createSubject.pending, (state) => {
        state.loading = false;
        state.message = "pending...";
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(addStudentToClass.pending, (state) => {
        state.loading = false;
        state.message = "pending...";
      })
      .addCase(addStudentToClass.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(addTeacherToClass.pending, (state) => {
        state.loading = false;
        state.message = "pending...";
      })
      .addCase(addTeacherToClass.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteClassRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = action.payload;
      })
      .addCase(deleteClassRoom.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getClassrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.classRoomsFeatch = true;
        state.error = false;
        state.classrooms = action.payload;
      })
      .addCase(getClassrooms.rejected, (state, action) => {
        state.loading = false;
        state.classRoomsFeatch = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getclassroomsOfTeahcers.fulfilled, (state, action) => {
        state.loading = false;
        state.teacherClassRoomsFeatch = true;
        state.error = false;
        state.teachersClassrooms = action.payload;
      })
      .addCase(getclassroomsOfTeahcers.rejected, (state, action) => {
        state.loading = false;
        state.teacherClassRoomsFeatch = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getClassroomById.fulfilled, (state, action) => {
        state.loading = false;
        state.classFeatch = true;
        state.error = false;
        state.classRoom = action.payload;
      })
      .addCase(getClassroomById.rejected, (state, action) => {
        state.loading = false;
        state.classFeatch = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectsFeatch = true;
        state.error = false;
        state.subjects = action.payload;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.subjectsFeatch = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = classroomSlice.actions;
export default classroomSlice.reducer;
