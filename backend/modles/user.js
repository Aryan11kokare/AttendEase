import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Admin", "Teacher", "Student"],
    required: true,
  },
  rollNo: {
    type: String, // only for students
  },
  classRoom: { type: Schema.Types.ObjectId, ref: "ClassRoom" }, // only for students
});

export const User = model("User", userSchema);
