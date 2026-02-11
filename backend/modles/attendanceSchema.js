import { Schema, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    date: { type: Date, required: true },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    classRoom: {
      type: Schema.Types.ObjectId,
      ref: "ClassRoom",
      required: true,
    },
    markedBy: { type: Schema.Types.ObjectId, ref: "User" }, // Teacher
    records: [
      {
        student: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Attendance = model("Attendance", attendanceSchema);
