import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getMyAttendance } from "../../redux/actions/studentActions.js";
import { getUserProfile } from "../../redux/actions/authActions.js";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const attendanceState = useSelector((state) => state.attendance);
  const authState = useSelector((state) => state.auth);
  const [classroomSubjects, setClassroomSubjects] = useState([]);
  const [subject, setSubject] = useState();
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState([]);
  const [summary, setSummary] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);
    await dispatch(getUserProfile());
    await dispatch(getMyAttendance());
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
    setAttendance(attendanceState?.myAttendace);
    const newSummry = [];
    for (const summ in attendanceState?.summary) {
      const obj = {
        name: summ,
        total: attendanceState?.summary[summ].total,
        present: attendanceState?.summary[summ].present,
      };
      newSummry.push(obj);
    }

    const newMonthly = [];
    for (const mon in attendanceState?.monthly) {
      const obj = {
        subjectName: mon,
        records: attendanceState?.monthly[mon],
      };
      newMonthly.push(obj);
    }

    setMonth(newMonthly);
    setSummary(newSummry);
  }, [attendanceState?.myAttendace]);

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
          Student Dashboard
        </h1>

        {!isLoading && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-600 mb-1">
                  Overall Attendance
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {attendanceState.percentage}%
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-600 mb-1">Total Classes</div>
                <div className="text-3xl font-bold text-gray-700">
                  {attendanceState.totalClasses}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-600 mb-1">Present</div>
                <div className="text-3xl font-bold text-green-600">
                  {attendanceState.totalPresent}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-600 mb-1">Absent</div>
                <div className="text-3xl font-bold text-red-600">
                  {attendanceState.totalAbsent}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Subject-wise Attendance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {summary?.map((cs, index) => {
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <h3 className="font-semibold text-gray-800 mb-3">
                        {cs.name}
                      </h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Total Classes:</span>
                          <span className="font-medium">{cs.total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Present:</span>
                          <span className="font-medium text-green-600">
                            {cs.present}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Absent:</span>
                          <span className="font-medium text-red-600">
                            {cs.total - cs.present}
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              Attendance
                            </span>
                            <span
                              className={`text-xl font-bold ${
                                cs.present >= 75
                                  ? "text-green-600"
                                  : 70 >= 60
                                    ? "text-yellow-600"
                                    : "text-red-600"
                              }`}
                            >
                              {((cs.present / cs.total) * 100).toFixed(2)}%
                            </span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                cs.present >= 75
                                  ? "bg-green-600"
                                  : 40 >= 60
                                    ? "bg-yellow-600"
                                    : "bg-red-600"
                              }`}
                              style={{
                                width: `${(cs.present / cs.total) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {summary?.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No subjects assigned to your classroom yet
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-xl font-semibold mb-2 md:mb-0">
                  Monthly Attendance Report
                </h2>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {month?.map((cs, index) => {
                return (
                  <div key={index} className="mb-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-3 pb-2 border-b">
                      {cs.subjectName.toUpperCase()}
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                              Date
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {cs.records.map((re) => (
                            <tr key={0} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-sm">
                                {new Date(re.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span
                                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                                    re.status === "Present"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {/* {record.status.charAt(0).toUpperCase() +
                                  record.status.slice(1)} */}
                                  {re.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}

              {/* {classroomSubjects.every(
                (cs) => getMonthlyAttendance(cs.subject_id).length === 0
              ) && (
                <div className="text-center py-8 text-gray-500">
                  No attendance records found for the selected month
                </div>
              )} */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
