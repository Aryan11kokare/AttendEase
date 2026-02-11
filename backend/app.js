import dotenv from "dotenv";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

import authRoutes from "./routes/user.js";
import studentsRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import adminRoutes from "./routes/admin.js";

main()
  .then(() => console.log("connected to Database"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/teacher", teacherRoutes);
app.use("/student", studentsRoutes);

const port = process.env.PORT || 8000;

app.listen(8000, () => console.log(`server running on port ${port}`));
