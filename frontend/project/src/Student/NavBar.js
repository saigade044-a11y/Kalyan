import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/student/home">All Courses</Link> |{" "}
      <Link to="/student/enrolled">My Courses</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
