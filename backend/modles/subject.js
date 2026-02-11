import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
  name: { type: String, required: true }, // Example: "Mathematics"
  code: { type: String, unique: true }, // Example: "MATH101"
  classRoom: { type: Schema.Types.ObjectId, ref: "ClassRoom" },
  teacher: { type: Schema.Types.ObjectId, ref: "User" }, // Teacher assigned
});

export const Subject = model("Subject", subjectSchema);
