import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

// Requires user to be logged in
export function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
}

// Requires user to have admin role
export function AdminRoute({ children }) {
  const { currentUser, userData } = useAuth();
  if (!currentUser)             return <Navigate to="/login"     replace />;
  if (userData?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}
