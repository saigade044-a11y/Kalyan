import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Admin Components
import SideBar from "./Admin/SideBar";
import AllCourses from "./Admin/AllCourses";
import CreateCourse from "./Admin/CreateCourse";
import AllEnrolledStudents from "./Admin/AllEnrolledStudents";
import ViewSingleCourse from "./Admin/ViewSingleCourse";
import EditPost from "./Admin/EditPost";
import AllStudents from "./Admin/AllStudents";
import StudentCreation from "./Admin/StudentCreation";
import EditeStudent from "./Admin/EditeStudent";

// Student Components
import Login from "./Student/Login";
import StudentHome from "./Student/StudentHome";
import CourseDetails from "./Student/CourseDetails";
import EnrolledCourses from "./Student/EnrolledCourses";
import RoleRoute from "./Student/RoleRoute";
import PrivateRoute from "./Student/PrivateRoute";


function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all courses
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await fetch('http://localhost:5049/api/Course/GetAllCourses', {
          method: "GET",
          headers: {
            "accept": "text/plain"
          }
        });

        if (!response.ok) throw new Error("Error fetching courses");

        const data = await response.json();
        setCourses(data);

      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchingData();
  }, []);

  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* ------------------ Admin Routes ------------------ */}
      <Route path="/SideBar" element={
        <RoleRoute allowedRoles={["Admin"]}><SideBar /></RoleRoute>
      } />
      <Route path="/AllCourses" element={
        <RoleRoute allowedRoles={["Admin"]}>
          <AllCourses
            courses={courses.filter(item => item.courseName.toLowerCase().includes(search.toLowerCase()))}
            search={search}
            setSearch={setSearch}
            loading={loading}
          />
        </RoleRoute>
      } />
      <Route path="/ViewSingleCourse/:id" element={
        <RoleRoute allowedRoles={["Admin"]}><ViewSingleCourse courses={courses} /></RoleRoute>
      } />
      <Route path="/EditPost/:id" element={
        <RoleRoute allowedRoles={["Admin"]}><EditPost /></RoleRoute>
      } />
      <Route path="/CreateCourse" element={
        <RoleRoute allowedRoles={["Admin"]}><CreateCourse /></RoleRoute>
      } />
      <Route path="/AllEnrolledStudents" element={
        <RoleRoute allowedRoles={["Admin"]}><AllEnrolledStudents /></RoleRoute>
      } />
      <Route path="/AllStudents" element={
        <RoleRoute allowedRoles={["Admin"]}><AllStudents /></RoleRoute>
      } />
      <Route path="/StudentCreation" element={
        <RoleRoute allowedRoles={["Admin"]}><StudentCreation /></RoleRoute>
      } />
      <Route path="/EditeStudent/:id" element={
        <RoleRoute allowedRoles={["Admin"]}><EditeStudent /></RoleRoute>
      } />

      {/* ------------------ Student Routes ------------------ */}
      <Route path="/student/home" element={
        <RoleRoute allowedRoles={["Student"]}><StudentHome /></RoleRoute>
      } />
      <Route path="/student/course/:id" element={
        <RoleRoute allowedRoles={["Student"]}><CourseDetails /></RoleRoute>
      } />
      <Route path="/student/enrolled" element={
        <RoleRoute allowedRoles={["Student"]}><EnrolledCourses /></RoleRoute>
      } />

      {/* Default route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
