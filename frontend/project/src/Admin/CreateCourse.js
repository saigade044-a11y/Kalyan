import React, { useState } from "react";
import './Css/CreateCoursecss.css';

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      courseName,
      courseDescription,
      capacity: Number(capacity)
    };

    try {
      const response = await fetch(
        "http://localhost:5049/api/Course/CreateCourse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const result = await response.json();
      alert("Course created successfully! ID = " + result.course.courseId);
      setCourseName('');
      setCourseDescription('');
      setCapacity('');

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p10">
      <h2 className="p9">Create Course</h2>

      <form onSubmit={handleSubmit} className="p8">
        <label>Course Name</label>
        <input
          type="text"
          placeholder="Enter The Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />

        <label>Course Description</label>
        <textarea
          placeholder="Enter The Course Description"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
        />

        <label>Capacity</label>
        <input
          type="number"
          placeholder="Enter The Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <button type="submit" className="p11">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
