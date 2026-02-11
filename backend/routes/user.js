import { Router } from "express";
import {
  getAllStudnets,
  getAllSubjects,
  getAllTeacher,
  getClassroomById,
  getClassRooms,
  getUserProfile,
  login,
  register,
} from "../controllers/user.js";
import { auth } from "../middelware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getUserProfile", auth, getUserProfile);
router.get("/classrooms", auth, getClassRooms);
router.get("/classroom/:id", auth, getClassroomById);
router.get("/teachers", auth, getAllTeacher);
router.get("/subjects", auth, getAllSubjects);
router.get("/students", auth, getAllStudnets);

export default router;
