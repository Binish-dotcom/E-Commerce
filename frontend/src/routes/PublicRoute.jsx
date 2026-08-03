import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && (role === "seller" || role === "buyer")) {
    return role === "seller" ? (
      <Navigate to="/seller-dashboard" replace />
    ) : (
      <Navigate to="/buyer-dashboard" replace />
    );
  }

  // If token exists but role is invalid, clean up
  if (token && role !== "seller" && role !== "buyer") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return children;
};

export default PublicRoute;