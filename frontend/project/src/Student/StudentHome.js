import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
const StudentHome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5049/api/Course/GetAllCourses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <h2>All Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.courseId}>
            {course.courseName} - {course.courseDescription}{" "}
            <Link to={`/student/course/${course.courseId}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentHome;
