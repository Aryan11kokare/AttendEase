import { ClassRoom } from "../modles/classRoom.js";
import { Subject } from "../modles/subject.js";
import { User } from "../modles/user.js";

export const createClassRoom = async (req, res) => {
  try {
    const { name, branch } = req.body;

    const foundClassRoom = await ClassRoom.findOne({
      name: name,
      branch: branch,
    });

    if (foundClassRoom) {
      return res.status(500).json("class already created!");
    }

    const newClassroom = new ClassRoom({
      name: name,
      branch: branch,
    });
    await newClassroom.save();
    res.status(200).json("classroom crated successfully");
  } catch (e) {
    console.log(e);
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name, code, classRoomId, teacherId } = req.body;
    const foundSubject = await Subject.findOne({
      name: name,
      code: code,
    });

    const foundClassRoom = await ClassRoom.findById(classRoomId);

    if (foundSubject) {
      return res.status(500).json("subject already exist!");
    }

    if (!foundClassRoom) {
      return res.status(500).json("classRoom not  exist!");
    }

    const newSubject = new Subject({
      name: name,
      code: code,
      classRoom: classRoomId,
      teacher: teacherId,
    });
    await newSubject.save();
    foundClassRoom.subjects.push(newSubject._id);
    await foundClassRoom.save();
    res.status(200).json("subject created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const addStudentToClass = async (req, res) => {
  try {
    const { studentId, classroomId } = req.body;
    const student = await User.findById(studentId);
    const classroom = await ClassRoom.findById(classroomId);
    if (!student || student.role !== "Student")
      return res.status(400).json({ message: "Invalid student" });

    if (classroom.students.includes(student._id)) {
      return res.status(403).json("student aleready added");
    }

    student.classRoom = classroomId;
    await student.save();

    classroom.students.push(studentId);
    await classroom.save();

    res.json({ student, classroom });
  } catch (err) {
    console.log(err);
  }
};

export const addTeacherToClass = async (req, res) => {
  try {
    const { teacherId, classroomId } = req.body;
    const teacher = await User.findById(teacherId);
    const classroom = await ClassRoom.findById(classroomId);
    if (!teacher || teacher.role !== "Teacher")
      return res.status(400).json({ message: "Invalid Techer" });

    if (classroom.teachers.includes(teacher._id)) {
      return res.status(403).json("teacher aleready added");
    }

    classroom.teachers.push(teacher._id);
    await classroom.save();

    res.status(200).json("Teacher added Successfully");
  } catch (err) {
    console.log(err);
  }
};

export const deleteClassRoom = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    if (user.role !== "Admin") {
      return res.status(403).json("You don't have the permission to delete");
    }
    await ClassRoom.findByIdAndDelete(id);
    res.status(200).json("classRoom deleted successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    const foundSubject = await Subject.findById(id);
    if (!foundSubject) {
      return res.status(404).json("subject not found");
    }
    if (user.role !== "Admin") {
      return res.status(403).json("You don't have the permission to delete");
    }
    await ClassRoom.findByIdAndUpdate(foundSubject.classRoom, {
      $pull: { subjects: id },
    });
    await Subject.findByIdAndDelete(id);
    await res.status(200).json("Subject deleted successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const user = req.user;
    const classroomId = req.header("classroomId");
    const id = req.params.id;
    if (user.role !== "Admin") {
      return res.status(403).json("You don't have the permission to delete");
    }
    await ClassRoom.findByIdAndUpdate(classroomId, {
      $pull: { students: id },
    });
    await User.findByIdAndDelete(id);
    await res.status(200).json("Student deleted successfully");
  } catch (e) {
    console.log(e);
  }
};
