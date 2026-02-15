import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 600, margin: "100px auto", padding: 24 }}>
      <h1>Student Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <button onClick={handleLogout} style={{ padding: "8px 24px" }}>
        Logout
      </button>
    </div>
  );
}
