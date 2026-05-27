<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
=======
import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation,} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Orders from "./AdminPanel/pages/Orders";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import AboutUs from "./components/About us";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Dashboard from "./AdminPanel/Dashboard";
import Order from "./components/Order";
import AdminLogin from "./AdminPanel/AdminLogin";
import MenuManagement from "./AdminPanel/pages/Menumanagement";
import ReservationManagement from "./AdminPanel/pages/Reservationmanagement";

import CustomerRegister from "./CustomerPanel/CustomerRegister";
import CustomerLogin from "./CustomerPanel/CustomerLogin";
import OrderHistory from "./CustomerPanel/OrderHistory";

import CustomerProtectedRoute from "./components/CustomerProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

function AppContent() {

  const [cart, setCart] = useState([]);
  const location = useLocation();

  // ADMIN ROUTES
  const isAdminRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/orders") ||
    location.pathname.startsWith("/Menumanagement") ||
    location.pathname.startsWith("/ReservationManagement") ||
    location.pathname.startsWith("/admin-login");

  return (
    <>
      {!isAdminRoute && (<Navbar cartCount={cart.length} />)}

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Hero />}/>
          <Route path="/aboutus" element={<AboutUs />}/>
          <Route path="/menu" element={<CustomerProtectedRoute><Menu cart={cart} setCart={setCart}/></CustomerProtectedRoute>}/>
          <Route path="/cart" element={<CustomerProtectedRoute><Cart cart={cart} setCart={setCart}/></CustomerProtectedRoute>}/>
          <Route path="/reservation" element={<CustomerProtectedRoute><Reservation /></CustomerProtectedRoute>}/>
          <Route path="/order" element={<CustomerProtectedRoute><Order /></CustomerProtectedRoute>}/>
          <Route path="/orderhistory" element={<CustomerProtectedRoute><OrderHistory /></CustomerProtectedRoute>}/>
          <Route path="/contact" element={<Contact />}/>

          {/* CUSTOMER AUTH */}
          <Route path="/customer-register" element={<CustomerRegister />}/>
          <Route path="/customer-login" element={<CustomerLogin />}/>
          {/* ADMIN AUTH */}
          <Route path="/admin-login" element={<AdminLogin />}/>
          {/* ADMIN ROUTES */}
          <Route path="/dashboard" element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}/>
          <Route path="/orders" element={<AdminProtectedRoute><Orders /></AdminProtectedRoute>}/>
          <Route path="/Menumanagement" element={<AdminProtectedRoute><MenuManagement/></AdminProtectedRoute>}/>
          <Route path="/ReservationManagement" element={<AdminProtectedRoute><ReservationManagement/>          </AdminProtectedRoute>}/>

        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
>>>>>>> kailash-CafeWebsite-25/05/2026
