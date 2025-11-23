import React from 'react'
import { Link } from 'react-router-dom'
import './Css/sidebarcsscode.css'
const SideBar = () => {
  return (

    <aside className='p1'>


      <img src="https://png.pngtree.com/png-vector/20240809/ourmid/pngtree-businesswoman-with-headset-clipart---3d-illustration-png-image_13419271.png"></img>

      <ul className='p2'>

        <li><Link to="/AllCourses">All Courses</Link></li>
        <li><Link to="/CreateCourse">Create Course</Link></li>
        <li> <Link to="/AllEnrolledStudents">All Course And Enrolled Students</Link></li>
        <li><Link to="/AllStudents">All Students</Link></li>

        <li> <Link to="/StudentCreation">Create Student</Link></li>

      </ul>

    </aside>

  )
}

export default SideBar