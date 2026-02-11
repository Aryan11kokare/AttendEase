import { Router } from "express";
import {
  getAttendceForSubject,
  getClassroomsOfTeacher,
  markAttendance,
  updateAttendace,
} from "../controllers/teacher.js";
import { auth } from "../middelware.js";

const router = Router();

router.get("/attendance", auth, getAttendceForSubject);
router.post("/attendance", auth, markAttendance);
router.post("/attendace/:id", auth, updateAttendace);
router.get("/classrooms", auth, getClassroomsOfTeacher);

export default router;
