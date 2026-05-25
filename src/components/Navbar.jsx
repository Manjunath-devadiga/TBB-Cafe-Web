import "../index.css";
import logoImg from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCustomer, logoutCustomer, } from "../utils/customerAuth";


export default function Navbar() {

  const customer = getCustomer();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-fluid">

        <motion.div
          className="navbar-brand d-flex align-items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="fw-bold">THE OG Cafe</span>
          <img src={logoImg} alt="logo" width="40" />
        </motion.div>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${open ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/aboutus" className="nav-link">
                Aboutus
              </NavLink>
            </li>

            <li
              className="nav-item dropdown"
              onMouseEnter={(e) =>
                e.currentTarget.classList.add("show")
              }
              onMouseLeave={(e) =>
                e.currentTarget.classList.remove("show")
              }
            >
              <NavLink to="/menu"
                className="nav-link dropdown-toggle"
                role="button"
              > Menu
              </NavLink>

              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/menu?type=Veg"
                    className="dropdown-item"
                  > Veg
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/menu?type=Non-Veg"
                    className="dropdown-item"
                  > Non-Veg
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/menu?type=Add-Ons"
                    className="dropdown-item"
                  >  Add-Ons
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/menu?type=Drinks"
                    className="dropdown-item"
                  > Drinks
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/menu?type=Desserts"
                    className="dropdown-item"
                  > Desserts
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to="/reservation" className="nav-link">
                Reservation
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>

          </ul>

          <div className="d-flex">
            <Link to="/cart" className="btn btn-outline-light">
              Cart ({totalItems})
            </Link>
          </div>
          {customer ? (
            <div className="d-flex align-items-center">

              <Link to="/orderhistory">
                <button className="btn btn-warning ms-3">
                  My Orders
                </button>
              </Link>

              <button
                className="btn btn-danger ms-3"
                onClick={() => {
                  logoutCustomer();
                  navigate("/customer-login");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/customer-login">
              <button className="btn btn-warning ms-3">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}