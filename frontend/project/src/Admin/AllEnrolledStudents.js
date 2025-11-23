import React, { useReducer, useEffect } from "react";

const FETCH_INIT = "FETCH_INIT";
const FETCH_START = "FETCH_START";
const FETCH_END = "FETCH_END"; 

const initialstate = {
  loading: false,
  data: [],
  error: null,
};

const handleswitch = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, loading: true, error: null };

    case FETCH_START:
      return { ...state, loading: false, data: action.payload };

    case FETCH_END:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const AllEnrolledStudents = () => {
  const [state, dispatch] = useReducer(handleswitch, initialstate);

  const fetchEnrolledData = async () => {
    dispatch({ type: FETCH_INIT });

    try {
      const response = await fetch(
        "http://localhost:5049/api/Admin/AllStudentEnrollments"
      );

      if (!response.ok) {
        throw new Error("We are getting an error while fetching the data");
      }

      let data = await response.json();
      dispatch({ type: FETCH_START, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_END, payload: error.message });
    }
  };

  useEffect(() => {
    fetchEnrolledData();
  }, []);

  const { loading, data, error } = state;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Enrolled Students</h2>

      {loading && <h3>Loading...</h3>}

      {error && <h3 style={{ color: "red" }}>{error}</h3>}

      {data.length === 0 && !loading && <p>No students found.</p>}

      {data.map((student) => (
        <div
          key={student.studentId}
          style={{
            border: "1px solid black",
            padding: "15px",
            marginBottom: "20px",
          }}
        >
          <h3>Student: {student.studentName}</h3>
          <p>Email: {student.studentEmail}</p>

          <h4>Enrolled Courses:</h4>

          <table
            border="1"
            cellPadding="10"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Capacity</th>
                <th>Enrolled Count</th>
                <th>Available Seats</th>
              </tr>
            </thead>

            <tbody>
              {student.enrolledCourses.map((course) => (
                <tr key={course.courseId}>
                  <td>{course.courseId}</td>
                  <td>{course.courseName}</td>
                  <td>{course.capacity}</td>
                  <td>{course.enrolledCount}</td>
                  <td>{course.availableSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default AllEnrolledStudents;
