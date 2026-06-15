import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  validateEmail,
  validatePassword,validatePhone,
  validateName
} from "../utils/validation";

export default function CustomerRegister() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phoneno);
    const passwordError = validatePassword(password);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phoneno = phoneError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
            phoneno,
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
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "20px" }}>

        <h2 className="text-center mb-4 text-dark">
          Customer Register
        </h2>

        <form
          onSubmit={handleRegister}>

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
          {errors.name && (<small className="text-danger">{errors.name} </small>)}

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
          {errors.email && (<small className="text-danger">{errors.email} </small>)}

          <input
            type="tel"
            className="form-control mb-3"
            placeholder="phone no"
            value={phoneno}
            onChange={(e) =>
              setPhoneno(
                e.target.value
              )
            }
          />
          {errors.phoneno && (<small className="text-danger">{errors.phoneno} </small>)}

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
          {errors.password && (<small className="text-danger">{errors.password} </small>)}

          <button
            className="btn btn-dark w-100"
            disabled={loading}>
            {
              loading
                ? "Creating..."
                : "Register"
            }
          </button>

        </form>
        <p className="text-center mt-3 text-dark">
          Go back to Login
          <Link to="/customer-login" className="ms-2" >
            Click here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}