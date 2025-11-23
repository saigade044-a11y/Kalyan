import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const decoded = jwtDecode(token);
  // ✅ Robust extraction
  const role = decoded.role || decoded.Role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  if (!role) return <Navigate to="/login" />;

  return allowedRoles.includes(role) ? children : <Navigate to="/login" />;
};

export default RoleRoute;
