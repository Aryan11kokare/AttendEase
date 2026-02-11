import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducers.js";
import classroomReducers from "./reducers/classroomReducers.js";
import attendaceReducers from "./reducers/attendaceReducers.js";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    classroom: classroomReducers,
    attendance: attendaceReducers,
  },
});
