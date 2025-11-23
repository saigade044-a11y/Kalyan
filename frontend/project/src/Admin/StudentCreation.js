


import React, { useState } from 'react';

import './Css/CreateStudent.css';

const StudentCreation = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("Student"); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            fullName,
            email,
            password,
            phone,
            address,
            role
        };

        try {
            const response = await fetch(
                "http://localhost:5049/api/Admin/StudentRegister",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to register student");
            }

            alert("Student Registered Successfully!");

            // Clear form
            setFullName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setAddress("");
            setRole("Student");

        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div style={{ padding: "20px" }} className='p11'>
            <form onSubmit={handleSubmit} className='p12'>
                <h2>Student Registration Page</h2>

                <label>Full Name</label><br />
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                /><br /><br />

                <label>Email</label><br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />

                <label>Password</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />

                <label>Phone</label><br />
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                /><br /><br />

                <label>Address</label><br />
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                /><br /><br />

                <label>Role</label><br />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="Student">Student</option>
                </select><br /><br />

                <button type="submit" className='p13'>Register Student</button>
            </form>
        </div>
    );
};

export default StudentCreation;
