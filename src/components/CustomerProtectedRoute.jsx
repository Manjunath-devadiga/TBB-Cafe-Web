import { Navigate } from "react-router-dom";
import {getToken} from "../utils/customerAuth";

export default function CustomerProtectedRoute({
  children,
}) {

  const token = getToken();

  if (!token) {
    return (
      <Navigate
        to="/customer-login"
      />
    );
  }

  return children;
}