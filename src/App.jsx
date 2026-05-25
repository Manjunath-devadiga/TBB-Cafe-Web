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