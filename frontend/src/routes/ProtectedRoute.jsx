
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role missing (IMPORTANT FIX)
  if (!userRole) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // ❌ Wrong role handling
  if (userRole !== role) {
    if (userRole === "seller") {
      return <Navigate to="/seller-dashboard" replace />;
    }

    if (userRole === "buyer") {
      return <Navigate to="/buyer-dashboard" replace />;
    }

    // fallback safety
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized access
  return children;
};

export default ProtectedRoute;