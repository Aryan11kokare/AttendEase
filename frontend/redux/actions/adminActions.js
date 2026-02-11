import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const addClassRoom = createAsyncThunk(
  "/admin/addClassRoom",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.post(
        "/admin/classroom",
        {
          name: user.name,
          branch: user.branch,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);

export const createSubject = createAsyncThunk(
  "/admin/createSubject",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.post(
        "/admin/subject",
        {
          name: user.name,
          code: user.code,
          classRoomId: user.classRoomId,
          teacherId: user.teacherId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);

export const addStudentToClass = createAsyncThunk(
  "/admin/addStudentToClass",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.post(
        "/admin/add_student",
        {
          studentId: user.studentId,
          classroomId: user.classroomId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);

export const deleteClassRoom = createAsyncThunk(
  "/admin/deleteClassRoom",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.delete(
        `/admin/classroom/${user.classRoomId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);

export const deleteSubject = createAsyncThunk(
  "/admin/deleteSubject",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.delete(
        `/admin/subject/${user.subjectId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);

export const deleteStudent = createAsyncThunk(
  "/admin/deleteSubject",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.delete(
        `/admin/student/${user.studentId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
            classroomId: user.classRoomId,
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);

export const addTeacherToClass = createAsyncThunk(
  "/admin/addTeacherToClass",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.post(
        "/admin/add_teacher",
        {
          teacherId: user.teacherId,
          classroomId: user.classroomId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  },
);
