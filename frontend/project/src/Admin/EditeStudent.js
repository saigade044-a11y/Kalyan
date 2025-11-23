import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const EditeStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const student = location.state?.student;

    const [fullName, setFullName] = useState(student?.fullName || "");
    const [email, setEmail] = useState(student?.email || "");
    const [password, setPassword] = useState(student?.password || "");
    const [phone, setPhone] = useState(student?.phone || "");
    const [address, setAddress] = useState(student?.address || "");
    const [role, setRole] = useState(student?.role || "Student");

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!student) {
            alert("Student data missing!");
            return;
        }

        const updatedStudent = {
            studentId: student.studentId,
            fullName,
            email,
            password,
            phone,
            address,
            role,
        };

        try {
            const response = await fetch(
                `http://localhost:5049/api/Admin/Update/${student.studentId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedStudent),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update student");
            }

            alert("Student updated successfully!");
            navigate("/AllStudents");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Edit Student - ID: {id}</h2>

            {!student && (
                <h3 style={{ color: "red" }}>⚠ No student data received.</h3>
            )}

            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                />
                <br /><br />

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <br /><br />

                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <br /><br />

                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                />
                <br /><br />

                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
                <br /><br />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Student">Student</option>
                </select>
                <br /><br />

                <button type="submit">Update Student</button>
            </form>
        </div>
    );
};

export default EditeStudent;
