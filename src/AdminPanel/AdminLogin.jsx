import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
  try {
    const res = await fetch(
      "http://localhost:5000/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      // Save token
      localStorage.setItem(
        "adminToken",
        data.token
      );
      // Redux
      dispatch(loginSuccess(data.token));

      // Redirect
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);

    alert("Server Error");
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,rgb(32, 58, 23),rgb(62, 196, 134))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <div className="text-center mb-4">
          <h1 className="fw-bold text-light">Admin Login</h1>
          <p className="text-muted">
            Welcome back! Please login.
          </p>
        </div>

        <input
          className="form-control mb-3 p-3"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            borderRadius: "12px",
          }}
        />

        <input
          type="password"
          className="form-control mb-4 p-3"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderRadius: "12px",
          }}
        />

        <button
          className="btn btn-dark w-100 py-3 fw-bold"
          onClick={handleLogin}
          style={{
            borderRadius: "12px",
            fontSize: "18px",
          }}
        >
          Login
        </button>
      </motion.div>
    </div>
  );
}