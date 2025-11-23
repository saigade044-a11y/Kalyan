import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Css/AllCoursescss.css';

const AllCourses = ({courses,search,setSearch,loading}) => {

    return (
        <div className='p4'>



            {loading && <p>Loading courses...</p>}

            {!loading && courses.length === 0 && (
                <p>There is No Courses In The Table. Please Create The Course.</p>
            )}


            {!loading && courses.length > 0 && (


                <>


                    <form className='p5'>

                        <input type='text'
                            autoFocus
                            placeholder='Enter The Course Name'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />




                    </form>




                    <table border="1" className='p5'>
                        <thead>
                            <tr>
                                <th>Course Id</th>
                                <th>Course Name</th>
                                <th>capacity</th>
                                <th>enrolledCount</th>
                                <th>availableSeats</th>
                                <th> Data Button</th>
                            </tr>
                        </thead>
                        <tbody>



                            {courses.map((item) => (



                                <tr key={item.courseId}>

                                    <td>{item.courseId}</td>
                                    <td>{item.courseName}</td>
                                    <td>{item.capacity}</td>
                                    <td>{item.enrolledCount}</td>
                                    <td>{item.availableSeats}</td>
                                    <td>

                                        <Link to={`/ViewSingleCourse/${item.courseId}`}>
                                            <button>View Data</button>
                                        </Link>


                                    </td>


                                </tr>


                            ))}


                        </tbody>
                    </table>

                </>

            )


            }


        </div>
    )
}

export default AllCourses