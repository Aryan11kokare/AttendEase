import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import ClassroomsTab from "../components/ClassroomsTab.jsx";
import SubjectsTab from "../components/SubjectsTab.jsx";
import TeachersTab from "../components/TeachersTab.jsx";
import StudentsTab from "../components/StudentsTab.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addClassRoom,
  addStudentToClass,
  addTeacherToClass,
  createSubject,
  deleteClassRoom,
  deleteStudent,
  deleteSubject,
} from "../../redux/actions/adminActions.js";
import {
  getAllStudents,
  getAllSubjects,
  getAllTeachers,
  getClassroomById,
  getClassrooms,
} from "../../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const classState = useSelector((state) => state.classroom);
  const authState = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("classrooms");
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [again, setAgain] = useState(false);
  const [error, setError] = useState("");

  const [classrooms, setClassrooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const featchData = async () => {
    setIsLoading(true);
    await dispatch(getClassrooms());
    await dispatch(getAllTeachers());
    await dispatch(getAllSubjects());
    await dispatch(getAllStudents());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    featchData();
  }, []);

  useEffect(() => {
    setSubjects(classState.subjects);
  }, [classState.subjects]);

  useEffect(() => {
    setStudents(authState.students);
  }, [authState.students]);

  useEffect(() => {
    setClassrooms(classState.classrooms);
  }, [classState.classrooms]);

  useEffect(() => {
    setTeachers(authState.teachers);
  }, [authState.teachers]);

  const tabs = [
    { id: "classrooms", name: "Classrooms" },
    { id: "teachers", name: "Teachers" },
    { id: "subjects", name: "Subjects" },
    { id: "students", name: "Students" },
  ];

  const handleAdd = async (type) => {
    setError("");
    setIsLoading(true);
    if (type === "classroom") {
      await dispatch(
        addClassRoom({ name: formData.name, branch: formData.branch }),
      );
    } else if (type === "subject") {
      await dispatch(
        createSubject({
          name: formData.name,
          code: formData.code,
          classRoomId: formData.classroom_id,
          teacherId: formData.teacher,
        }),
      );
    } else if (type === "teacher") {
      await dispatch(
        addTeacherToClass({
          teacherId: formData.teacherId,
          classroomId: formData.classroom_id,
        }),
      );
    } else if (type === "student") {
      await dispatch(
        addStudentToClass({
          studentId: formData.studentId,
          classroomId: formData.classroom_id,
        }),
      );
    }
    setFormData({});
    setEditingItem(null);
    setTimeout(() => {
      setAgain((c) => !c);
      setIsLoading(false);
      featchData();
    }, 1000);
  };

  const handleUpdate = async (type, id) => {
    try {
      setError("");
      setIsLoading(true);
      if (type === "classroom") {
        console.log(id, formData);
      } else if (type === "subject") {
        console.log(id, formData);
      } else if (type === "teacher") {
        console.log(id, formData);
      } else if (type === "student") {
        console.log(id, formData);
      }
      setFormData({});
      setEditingItem(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setError("");
    setIsLoading(true);
    if (type === "classroom") {
      await dispatch(deleteClassRoom({ classRoomId: id }));
    } else if (type === "subject") {
      console.log(id);
      await dispatch(deleteSubject({ subjectId: id }));
    } else if (type === "teacher") {
      console.log(id);
    } else if (type === "student") {
      await dispatch(
        deleteStudent({ classRoomId: id?.classRoom?._id, studentId: id._id }),
      );
    }
    setTimeout(() => {
      featchData();
      setIsLoading(false);
    }, 1000);
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, id: item.id });
    setFormData(item);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingItem(null);
                  setFormData({});
                  setError("");
                }}
                className={`px-6 py-4 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="p-6">
            {isLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}

            {!isLoading && activeTab === "classrooms" && (
              <ClassroomsTab
                classrooms={classrooms}
                formData={formData}
                setFormData={setFormData}
                editingItem={editingItem}
                handleAdd={() => handleAdd("classroom")}
                handleUpdate={(id) => handleUpdate("classroom", id)}
                handleEdit={(item) => handleEdit("classroom", item)}
                handleDelete={(id) => handleDelete("classroom", id)}
              />
            )}

            {!isLoading && activeTab === "subjects" && (
              <SubjectsTab
                subjects={subjects}
                formData={formData}
                classrooms={classrooms}
                setFormData={setFormData}
                editingItem={editingItem}
                handleAdd={() => handleAdd("subject")}
                handleUpdate={(id) => handleUpdate("subject", id)}
                handleEdit={(item) => handleEdit("subject", item)}
                handleDelete={(id) => handleDelete("subject", id)}
              />
            )}

            {!isLoading && activeTab === "teachers" && (
              <TeachersTab
                teachers={teachers}
                formData={formData}
                classrooms={classrooms}
                setFormData={setFormData}
                editingItem={editingItem}
                handleAdd={() => handleAdd("teacher")}
                handleUpdate={(id) => handleUpdate("teacher", id)}
                handleEdit={(item) => handleEdit("teacher", item)}
                handleDelete={(id) => handleDelete("teacher", id)}
              />
            )}

            {!isLoading && activeTab === "students" && (
              <StudentsTab
                students={students}
                classrooms={classrooms}
                formData={formData}
                setFormData={setFormData}
                editingItem={editingItem}
                handleAdd={() => handleAdd("student")}
                handleUpdate={(id) => handleUpdate("student", id)}
                handleEdit={(item) => handleEdit("student", item)}
                handleDelete={(id) => handleDelete("student", id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
