import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const register = createAsyncThunk(
  "/user/register",
  async (user, thunkApi) => {
    try {
      if (user.role === "Student") {
        const responce = await clientServer.post("/auth/register", {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
          rollNo: user.rollNo,
        });
        return thunkApi.fulfillWithValue(responce.data);
      } else {
        const responce = await clientServer.post("/auth/register", {
          username: user.username,
          email: user.email,
          password: user.password,
          role: user.role,
        });
        return thunkApi.fulfillWithValue(responce.data);
      }
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const login = createAsyncThunk("/user/login", async (user, thunkApi) => {
  try {
    const responce = await clientServer.post("/auth/login", {
      email: user.email,
      password: user.password,
    });

    localStorage.setItem("token", responce.data.token);
    if (responce.data.role === "Student") {
      localStorage.setItem("role", responce.data.role);
    }
    if (responce.data.role === "Admin") {
      localStorage.setItem("role", responce.data.role);
    }
    if (responce.data.role === "Teacher") {
      localStorage.setItem("role", responce.data.role);
    }
    return thunkApi.fulfillWithValue("user logged In successfully");
  } catch (e) {
    return thunkApi.rejectWithValue(e.response.data);
  }
});

export const getUserProfile = createAsyncThunk(
  "/user/getUserProfile",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/auth/getUserProfile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const getClassrooms = createAsyncThunk(
  "/user/getClassrooms",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get(`/auth/classrooms/`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const getClassroomById = createAsyncThunk(
  "/auth/user/getClassroomById",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.get(
        `/auth/classroom/${user.classroomId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const getAllTeachers = createAsyncThunk(
  "/user/getAllTeachers;",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get(`/auth/teachers`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const getAllSubjects = createAsyncThunk(
  "/user/getAllSubjects;",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get(`/auth/subjects`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const getAllStudents = createAsyncThunk(
  "/user/getAllStudents;",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get(`/auth/students`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
