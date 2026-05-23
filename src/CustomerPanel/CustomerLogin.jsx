import { useState } from "react";
import { useNavigate, Link }from "react-router-dom";
import { motion } from "framer-motion";
import CustomerRegister from "./CustomerRegister";
export default function CustomerLogin() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const res = await fetch(

        "http://localhost:5000/api/customers/login",

        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      // SUCCESS
      if (data.success) {

        localStorage.setItem(
          "customerToken",
          data.token
        );

        localStorage.setItem(
          "customer",
          JSON.stringify(
            data.customer
          )
        );

        alert("Login Successful ✅");
        navigate("/");

      } else {

        alert(
          data.message ||
          "Login Failed"
        );

      }

    } catch (err) {

      console.log(err);
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
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px",
        }}
      >

        <h2 className="text-center mb-4">
          Customer Login
        </h2>

        <form
          onSubmit={handleLogin}
        >

          {/* EMAIL */}
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="form-control mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* LOGIN BUTTON */}
          <button className="btn btn-dark w-100" disabled={loading}>
            {
              loading
                ? "Logging in..."
                : "Login"
            }</button>
        </form>

        {/* REGISTER LINK */}
        <p className="text-center mt-3">

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