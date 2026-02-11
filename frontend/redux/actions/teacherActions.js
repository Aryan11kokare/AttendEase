import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const markAttendance = createAsyncThunk(
  "/teacher/markAttendance",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.post(
        "/teacher/attendance",
        {
          date: user.date,
          subjectId: user.subjectId,
          classroomId: user.classroomId,
          records: user.records,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

export const updateAttendace = createAsyncThunk(
  "/teacher/updateAttendace",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.post(
        `/teacher/attendace/${user.id}`,
        {
          records: user.records,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

export const getAttendceForSubject = createAsyncThunk(
  "/teacher/getAttendceForSubject",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.get("/teacher/attendance", {
        headers: {
          code: user.date,
          subjectId: user.subjectId,
          classroomId: user.classroomId,
          token: localStorage.getItem("token"),
        },
      });

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);

export const getclassroomsOfTeahcers = createAsyncThunk(
  "/teacher/getclassroomsOfTeahcers",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/teacher/classrooms", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  },
);
