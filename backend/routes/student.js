import { Router } from "express";
import { auth } from "../middelware.js";
import { getMyAttendace } from "../controllers/student.js";

const router = Router();

router.get("/attendance", auth, getMyAttendace);

export default router;
