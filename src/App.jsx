import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import StudentProfile from "./pages/StudentProfile";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:studentId" element={<StudentProfile />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
}
