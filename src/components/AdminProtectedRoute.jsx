import { Navigate } from "react-router-dom";
import { getAdminToken } from "../utils/adminAuth";

export default function AdminProtectedRoute({
  children,
}) {
  const token = getAdminToken();

  if (!token) {
    return (
      <Navigate to="/admin-login" />
    );
  }

  return children;
}