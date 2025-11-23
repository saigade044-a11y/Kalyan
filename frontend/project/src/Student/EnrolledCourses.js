import { useEffect, useState } from "react";
import Navbar from "./NavBar";
const EnrolledCourses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const fetchStudentId = async () => {
      const res = await fetch(`http://localhost:5049/api/Student/ByEmail/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStudentId(data[0]?.studentId);
    };
    fetchStudentId();
  }, [email, token]);

  useEffect(() => {
    const fetchEnrolled = async () => {
      if (!studentId) return;
      const res = await fetch(`http://localhost:5049/api/Student/MyEnrollements/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setEnrolled(data.EnrolledCourses || []);
    };
    fetchEnrolled();
  }, [studentId, token]);

  const handleUnenroll = async (courseId) => {
    if (!window.confirm("Are you sure you want to unenroll?")) return;

    const res = await fetch("http://localhost:5049/api/Student/UnEnrolleCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ StudentId1: studentId, CourseId1: courseId })
    });
    if (res.ok) {
      setEnrolled(enrolled.filter(c => c.courseId !== courseId));
      alert("Unenrolled successfully!");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>My Enrolled Courses</h2>
      <ul>
        {enrolled.map(course => (
          <li key={course.courseId}>
            {course.courseName} - {course.courseDescription}{" "}
            <button onClick={() => handleUnenroll(course.courseId)}>Unenroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrolledCourses;
