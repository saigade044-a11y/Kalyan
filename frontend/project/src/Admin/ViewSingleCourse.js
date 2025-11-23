import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Css/ViewSingleCoursecss.css';

const ViewSingleCourse = ({ courses = [] }) => {
  const { id } = useParams();

  // Single course directly from props
  const singleCourse = courses.find((item) => item.courseId == id);

  // Enrolled Students
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  // Fetch enrolled students
  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5049/api/Admin/EnrolledStudentsByCourseId/${id}`
        );

        if (!response.ok) throw new Error("Failed to fetch enrolled students");

        const data = await response.json();
        setEnrolledStudents(data);

      } catch (err) {
        alert(err.message);
      }
    };

    fetchEnrolledStudents();
  }, [id]);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5049/api/Course/DeleteById/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete course");

      alert("Course deleted successfully!");
      window.location.href = "/AllCourses";

    } catch (err) {
      alert(err.message);
    }
  };

  // If course not found
  if (!singleCourse) return <p>No course found.</p>;

  return (
    <div className='p6'>
      <h1>Course Name: {singleCourse.courseName}</h1>
      <p>Course Description: {singleCourse.courseDescription}</p>

      <p><strong>Course ID:</strong> {singleCourse.courseId}</p>
      <p><strong>Capacity:</strong> {singleCourse.capacity}</p>
      <p><strong>Enrolled Students:</strong> {singleCourse.enrolledCount}</p>
      <p><strong>Available Seats:</strong> {singleCourse.availableSeats}</p>

      <Link to={`/EditPost/${singleCourse.courseId}`}>
        <button>Edit Course</button>
      </Link>

      <button onClick={() => handleDelete(singleCourse.courseId)}>
        Delete Course
      </button>

      <hr />

      <h2>Students Enrolled in This Course</h2>

      {enrolledStudents?.students?.length > 0 ? (
        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }} className='p7'>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Enrolled On</th>
            </tr>
          </thead>

          <tbody>
            {enrolledStudents.students.map((s) => (
              <tr key={s.studentId}>
                <td>{s.studentId}</td>
                <td>{s.fullName}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.enrolledOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students enrolled yet.</p>
      )}
    </div>
  );
};

export default ViewSingleCourse;
