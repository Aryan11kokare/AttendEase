import { Attendance } from "../modles/attendanceSchema.js";
import { ClassRoom } from "../modles/classRoom.js";

export const markAttendance = async (req, res) => {
  try {
    const { date, subjectId, classroomId, records } = req.body;
    const foundAttendance = await Attendance.findOne({
      date: date,
      subject: subjectId,
      classRoom: classroomId,
    });

    if (foundAttendance) {
      return res.status(500).json("Attendance already mark!");
    }

    const newAttendance = new Attendance({
      date: date,
      subject: subjectId,
      classRoom: classroomId,
      records: records,
    });
    await newAttendance.save();
    res.status(200).json("Attendacne mark successfully");
  } catch (e) {
    console.log(e);
  }
};

export const updateAttendace = async (req, res) => {
  try {
    const id = req.params.id;
    const { records } = req.body;
    const foundAttendance = await Attendance.findById(id);
    if (!foundAttendance) {
      return res.status(404).json("Attendance not found!");
    }

    foundAttendance.records = records;
    await foundAttendance.save();
    res.status(200).json("attendance updated successfully");
  } catch (e) {
    console.log(e);
  }
};

export const getAttendceForSubject = async (req, res) => {
  try {
    const date = req.header("code");
    const subjectId = req.header("subjectId");
    const classroomId = req.header("classroomId");

    const foundAttendance = await Attendance.findOne({
      date: date,
      subject: subjectId,
      classRoom: classroomId,
    })
      .populate("records.student")
      .populate("subject");
    if (!foundAttendance) {
      return res.status(404).json("Attendance not found!");
    }
    res.status(200).json(foundAttendance);
  } catch (e) {
    console.log(e);
  }
};

export const getClassroomsOfTeacher = async (req, res) => {
  const teacher = req.user;
  try {
    const classrooms = await ClassRoom.find({ teachers: teacher._id });
    res.status(200).json(classrooms);
  } catch (e) {
    console.log(e);
  }
};
