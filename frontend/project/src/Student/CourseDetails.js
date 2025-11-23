import { useEffect, useState } from "react";
import Navbar from "./NavBar";

const StudentHome = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // Fetch student info
  useEffect(() => {
    const fetchStudent = async () => {
      const res = await fetch(
        `http://localhost:5049/api/Admin/ByEmail/${encodeURIComponent(email)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      const studentData = Array.isArray(data) ? data[0] : data;
      setStudent(studentData);
    };
    fetchStudent();
  }, [email, token]);




  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://localhost:5049/api/Course/GetAllCourses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCourses(data);
    };
    fetchCourses();
  }, [token]);

  // Fetch student enrollments




  useEffect(() => {
    if (!student) return;

    const fetchEnrollments = async () => {
      const res = await fetch(
        `http://localhost:5049/api/Student/MyEnrollements/${student.studentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setEnrolledCourses(data.EnrolledCourses || []);
    };
    fetchEnrollments();
  }, [student, token]);





  const handleEnroll = async (courseId) => {
    try {
      const res = await fetch("http://localhost:5049/api/Student/EnrollCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ StudentId1: student.studentId, CourseId1: courseId }),
      });

      if (res.ok) {
        alert("Enrolled successfully!");
        setEnrolledCourses([...enrolledCourses, courses.find(c => c.courseId === courseId)]);
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to enroll");
    }
  };




  const handleUnenroll = async (courseId) => {
    try {
      const res = await fetch("http://localhost:5049/api/Student/UnEnrolleCourse", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ StudentId1: student.studentId, CourseId1: courseId }),
      });

      if (res.ok) {
        alert("Unenrolled successfully!");
        setEnrolledCourses(enrolledCourses.filter(c => c.courseId !== courseId));
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to unenroll");
    }
  };


  

  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />

      {/* Student Details */}
      <div className="student-info">
        <h2>Student Details</h2>
        <p><strong>Name:</strong> {student.fullName}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
        <p><strong>Address:</strong> {student.address}</p>
      </div>

      <hr />

      {/* All Courses */}
      <div className="all-courses">
        <h2>All Courses</h2>
        {courses.map(course => {
          const isEnrolled = enrolledCourses.some(c => c.courseId === course.courseId);
          return (
            <div key={course.courseId} className="course-card">
              <h3>{course.courseName}</h3>
              <p>{course.courseDescription}</p>
              <p><strong>Available Seats:</strong> {course.availableSeats}</p>
              {isEnrolled ? (
                <button onClick={() => handleUnenroll(course.courseId)}>Unenroll</button>
              ) : (
                <button onClick={() => handleEnroll(course.courseId)}>Enroll</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentHome;
