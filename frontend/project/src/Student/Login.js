import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ named import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5049/api/Authorize/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message || "Invalid credentials");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Decode JWT
      const decoded = jwtDecode(data.token);
      console.log("Decoded JWT:", decoded);

      // Extract role and username robustly
      const role =
        decoded.role ||
        decoded.Role ||
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      const username =
        decoded.unique_name ||
        decoded.username ||
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/name"];

      // Optional: store studentId if included in JWT
      if (decoded.studentId) localStorage.setItem("studentId", decoded.studentId);

      if (!role) {
        alert("Role not found in token");
        return;
      }

      localStorage.setItem("email", username || "");

      // Navigate based on role
      if (role.toLowerCase() === "admin") navigate("/SideBar");
      else if (role.toLowerCase() === "student") navigate("/student/home");
      else alert("Unknown role");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "#0A3D62" }}>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #0A3D62",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "5px",
          border: "1px solid #0A3D62",
        }}
      />
      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#0A3D62",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
