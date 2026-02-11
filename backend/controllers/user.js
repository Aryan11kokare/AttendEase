import { User } from "../modles/user.js";
import { Subject } from "../modles/subject.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ClassRoom } from "../modles/classRoom.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, role, rollNo } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(409).json("user already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    if (role === "Student") {
      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
        role: role,
        rollNo: rollNo,
      });
      await newUser.save();
    } else {
      const newUser = new User({
        username: username,
        email: email,
        password: hashPassword,
        role: role,
      });
      await newUser.save();
    }

    res.status(200).json("user created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json("user not exists!");
    }
    const isPassword = await bcrypt.compare(password, foundUser.password);
    if (!isPassword) {
      return res.status(403).json("wrong password");
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.JWT_SECRETE,
    );

    res.status(200).json({ token: token, role: foundUser.role });
  } catch (e) {
    console.log(e);
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

export const getClassroomById = async (req, res) => {
  try {
    const id = req.params.id;
    const classroom = await ClassRoom.findById(id)
      .populate("teachers")
      .populate("subjects")
      .populate("students");
    res.status(200).json(classroom);
  } catch (e) {
    console.log(e);
  }
};

export const getClassRooms = async (req, res) => {
  try {
    const classrooms = await ClassRoom.find();
    res.status(200).json(classrooms);
  } catch (e) {
    console.log(e);
  }
};

export const getAllTeacher = async (req, res) => {
  try {
    const teachers = await User.find({ role: "Teacher" });
    res.status(200).json(teachers);
  } catch (e) {
    console.log(e);
  }
};

export const getAllStudnets = async (req, res) => {
  try {
    const Studnets = await User.find({ role: "Student" }).populate("classRoom");
    res.status(200).json(Studnets);
  } catch (e) {
    console.log(e);
  }
};

export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({}).populate("teacher");
    res.status(200).json(subjects);
  } catch (e) {
    console.log(e);
  }
};
