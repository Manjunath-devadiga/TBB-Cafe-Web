import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomerContext } from "../contexts/CustomerContext";
import {
  validateEmail,
  validatePassword,
} from "../utils/validation";

export default function CustomerLogin() {
  const navigate = useNavigate();

  const { login } = useContext(CustomerContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        localStorage.setItem(
          "customerToken",
          data.token
        );

        // Context Login
        login(data.customer);

        alert("Login Successful ✅");

        navigate("/");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,#0f2027,#203a43,#2c5364)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-4 text-dark">
          Customer Login
        </h2>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({
                ...errors,
                email: "",
              });
            }}
          />

          {errors.email && (
            <small className="text-danger d-block mb-2">
              {errors.email}
            </small>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({
                ...errors,
                password: "",
              });
            }}
          />

          {errors.password && (
            <small className="text-danger d-block mb-3">
              {errors.password}
            </small>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-3 text-dark">
          Don't have an account?
          <Link
            to="/customer-register"
            className="ms-2"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}