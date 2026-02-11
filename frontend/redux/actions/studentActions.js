import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "..";

export const getMyAttendance = createAsyncThunk(
  "/student/getMyAttendace",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/student/attendance", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
