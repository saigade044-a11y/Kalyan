import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllStudents = () => {
    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");



    useEffect(() => {
        const handleFetch = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    "http://localhost:5049/api/Admin/AllStudents"
                );

                if (!response.ok) {
                    throw new Error("We are facing an error while fetching student data.");
                }

                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
                alert(err.message);
            } finally {
                setLoading(false);
            }
        };

        handleFetch();
    }, []);



    //based on search
    const filteredStudents = students.filter((item) =>
        item.fullName.toLowerCase().includes(search.toLowerCase())
    );



    //delete based on id
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `http://localhost:5049/api/Admin/Delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) throw new Error("Failed to delete student");

            alert("Student deleted successfully!");

            window.location.reload();


        } catch (err) {
            alert(err.message);
        }
    };




    return (
        <div style={{ padding: "20px" }}>
            <form>
                <input
                    type="text"
                    autoFocus
                    placeholder="Enter The Student Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <h2>Student Details</h2>


            {loading && <h3>Loading…</h3>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}

            {!loading && !error && (
                <h3>Total Students: {filteredStudents.length}</h3>
            )}


            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>StudentId</th>
                        <th>FullName</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>DateTime</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredStudents.map((item) => (
                        <tr key={item.studentId}>
                            <td>{item.studentId}</td>
                            <td>{item.fullName}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.role}</td>
                            <td>{item.datetime}</td>
                            <td>
                                <Link
                                    to={`/EditeStudent/${item.studentId}`}
                                    state={{ student: item }}
                                >
                                    <button>Edit</button></Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.studentId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllStudents;
