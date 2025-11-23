import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {


    const fetchCourse = async () => {

      try {

        const response = await fetch(
          `http://localhost:5049/api/Course/GetCourseById/${id}`
        );



        if (!response.ok) {
          throw new Error("Failed to fetch course data");
          
        }

        const data = await response.json();

        // Pre-fill form fields
        setCourseName(data.course.courseName);
        setCourseDescription(data.course.courseDescription);
        setCapacity(data.course.capacity);

      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCourse = {
      courseId: id,
      courseName,
      courseDescription,
      capacity: Number(capacity),
    };

    try {
      const response = await fetch(
        `http://localhost:5049/api/Course/UpdateCourseById/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      alert("Course updated successfully!");
      setCourseDescription('');
      setCapacity('');
      setCourseName('');

    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading Course Details...</p>;

  return (
    <div>
      <h2>Edit Course</h2>

      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Course Name:</label><br />
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Course Description:</label><br />
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <br />

        <div>
          <label>Capacity:</label><br />
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default EditPost;
