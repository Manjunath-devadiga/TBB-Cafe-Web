  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { motion } from "framer-motion";

  export default function CustomerRegister() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const res = await fetch(
          "http://localhost:5000/api/customers/register",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              name,
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

          localStorage.setItem(
            "customer",
            JSON.stringify(
              data.customer
            )
          );

          alert(
            "Registration Successful ✅"
          );
          navigate("/");

        } else {
          alert(data.message);
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
            "linear-gradient(to right,#141e30,#243b55)",
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
            Customer Register
          </h2>

          <form
            onSubmit={
              handleRegister
            }
          >

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

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

            <button
              className="btn btn-dark w-100"
              disabled={loading}
            >
              {
                loading
                  ? "Creating..."
                  : "Register"
              }
            </button>

          </form>
        </motion.div>
      </div>
    );
  }