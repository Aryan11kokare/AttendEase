import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Home from "./pages/Home.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
