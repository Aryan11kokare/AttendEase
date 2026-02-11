import { Schema, model } from "mongoose";

const classRoomSchema = new Schema({
  name: { type: String, required: true }, // Example: "BSc CS - 1st Year"
  branch: { type: String, required: true },
  subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
  students: [{ type: Schema.Types.ObjectId, ref: "User" }], // only student users
  teachers: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const ClassRoom = model("ClassRoom", classRoomSchema);
