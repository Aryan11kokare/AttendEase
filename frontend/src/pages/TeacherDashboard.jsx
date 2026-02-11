import { useState, useEffect, useMemo } from "react";
import { AArrowDown, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttendceForSubject,
  getclassroomsOfTeahcers,
  markAttendance,
  updateAttendace,
} from "../../redux/actions/teacherActions.js";
import { getClassroomById } from "../../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const classState = useSelector((state) => state.classroom);
  const attendaceState = useSelector((state) => state.attendance);
  const [classrooms, setClassrooms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [records, setRecords] = useState([]);
  const [updatedRecords, setUpdatedRecords] = useState([]);
  const [updatedDate, setUpadatedDate] = useState();
  const [error, setError] = useState();
  const [classroomId, setClassroomId] = useState();
  const [classroomName, setClassroomName] = useState();
  const [subjectId, setSubjectId] = useState();
  const [subjectName, setSubjectName] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(getclassroomsOfTeahcers());
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    fetchData();
  }, []);

  useEffect(() => {
    setClassrooms(classState?.teachersClassrooms);
  }, [classState?.teachersClassrooms]);

  useEffect(() => {
    setAttendance(attendaceState?.attendance);
    setUpdatedRecords(attendaceState?.attendance?.records);
  }, [attendaceState?.attendance]);

  useEffect(() => {
    setSubjects(classState?.classRoom?.subjects);
    setClassroomName(classState?.classRoom?.name);
    setStudents(classState?.classRoom?.students);
  }, [classState?.classRoom]);

  const handleAttendanceChange = (studentId, status) => {
    const newRecords = records?.filter((el) => el.student !== studentId);
    newRecords.push({ student: studentId, status: status });
    setRecords(newRecords);
  };

  const handleUpdatedAttendanceChange = (id, student, status) => {
    const newRecords = updatedRecords?.filter((el) => el._id !== id);
    newRecords.push({ student: student, status: status, _id: id });
    setUpdatedRecords(newRecords);
  };

  const handleMarkAttendane = async () => {
    setIsLoading(true);
    const responce = await dispatch(
      markAttendance({
        date: selectedDate,
        subjectId: subjectId,
        classroomId: classroomId,
        records: records,
      }),
    );

    if (responce?.error?.message === "Rejected") {
      await setIsLoading(false);
      await setError(JSON.stringify(responce.payload.response.data));
    } else {
      setIsLoading(false);
      fetchData();
    }
  };

  const handleSearchAttendace = async () => {
    dispatch(
      await getAttendceForSubject({
        date: updatedDate,
        subjectId: subjectId,
        classroomId: classroomId,
      }),
    );
  };

  const handleUpdatedAttendance = async () => {
    setIsLoading(true);
    await dispatch(
      updateAttendace({
        id: attendance._id,
        records: updatedRecords,
      }),
    );
    setAttendance([]);
    setUpdatedRecords([]);
    setUpadatedDate();
    setClassroomId("");
    setSubjectId("");
    setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Teacher Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Class & Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classroom
              </label>
              <select
                value={classroomId}
                onChange={(e) => {
                  setClassroomId(e.target.value);
                  dispatch(getClassroomById({ classroomId: e.target.value }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a classroom</option>
                {classrooms.map((cs) => (
                  <option key={cs._id} value={cs._id}>
                    {cs.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                {subjects?.map((el) => (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-xl font-semibold">Mark Attendance</h2>
              {true && (
                <p className="text-sm text-gray-600 mt-1">
                  {classroomName}&nbsp;&nbsp;subjectname&nbsp;&nbsp;
                  {selectedDate}
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      Present
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                      Absent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students?.map((student) => {
                    return (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm">{student.rollNo}</td>
                        <td className="px-6 py-4 text-sm font-medium">
                          {student.username}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleAttendanceChange(student._id, "Present");
                            }}
                            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleAttendanceChange(student._id, "Absent");
                            }}
                            className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {students?.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No students found in this classroom
              </div>
            )}
          </div>

          <br />
          {records?.length === students?.length && (
            <button
              onClick={handleMarkAttendane}
              className="w-full px-4 py-2 rounded-xl bg-blue-500 text-white font-medium"
            >
              Mark the Attendace for {selectedDate}
            </button>
          )}
        </>

        {subjectName && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-600">
              Select a class and subject to mark attendance
            </p>
          </div>
        )}
        <hr className="my-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Update Attendance
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Class & Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classroom
              </label>
              <select
                value={classroomId}
                onChange={(e) => {
                  setClassroomId(e.target.value);
                  dispatch(getClassroomById({ classroomId: e.target.value }));
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a classroom</option>
                {classrooms.map((cs) => (
                  <option key={cs._id} value={cs._id}>
                    {cs.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                {subjects?.map((el) => (
                  <option key={el._id} value={el._id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={updatedDate}
                onChange={(e) => setUpadatedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <br />
          <button
            className="w-full bg-blue-500 rounded-xl py-2 px-4 font-medium text-white"
            onClick={handleSearchAttendace}
          >
            Search for Attendance
          </button>
        </div>
        {updatedRecords?.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b bg-gray-50">
                <h2 className="text-xl font-semibold">Update Attendance</h2>
                {true && (
                  <p className="text-sm text-gray-600 mt-1">
                    {classroomName}&nbsp;&nbsp;
                    {attendaceState?.attendance?.subject?.name}
                    &nbsp;&nbsp;
                    {updatedDate}
                  </p>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Roll No
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                        Present
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                        Absent
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {updatedRecords?.map((el, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm">
                            {el?.student?.rollNo || "Removed"}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            {el?.student?.username || "Removed"}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              checked={el.status === "Present"}
                              onChange={() => {
                                handleUpdatedAttendanceChange(
                                  el._id,
                                  el.student,
                                  "Present",
                                );
                              }}
                              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              // checked={false}
                              checked={el?.status === "Absent"}
                              onChange={() => {
                                handleUpdatedAttendanceChange(
                                  el._id,
                                  el.student,
                                  "Absent",
                                );
                              }}
                              className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <button
              onClick={handleUpdatedAttendance}
              className="w-full px-4 py-2 rounded-xl bg-blue-500 font-medium text-white"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
