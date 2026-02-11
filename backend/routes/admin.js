import { Router } from "express";
import {
  addStudentToClass,
  addTeacherToClass,
  createClassRoom,
  createSubject,
  deleteClassRoom,
  deleteStudent,
  deleteSubject,
} from "../controllers/admin.js";
import { auth } from "../middelware.js";

const router = Router();

router.post("/classroom", auth, createClassRoom);
router.post("/subject", auth, createSubject);
router.post("/add_student", auth, addStudentToClass);
router.post("/add_teacher", auth, addTeacherToClass);
router.delete("/classroom/:id", auth, deleteClassRoom);
router.delete("/subject/:id", auth, deleteSubject);
router.delete("/student/:id", auth, deleteStudent);

export default router;
