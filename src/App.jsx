import { useState } from "react";

import Navbar from "./components/Navbar";
import Orders from "./AdminPanel/pages/Orders";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import AboutUs from "./components/About us";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import Dashboard from "./AdminPanel/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./components/Order";
import AdminLogin from "./AdminPanel/AdminLogin";
import MenuManagement from "./AdminPanel/pages/Menumanagement";
import ReservationManagement from "./AdminPanel/pages/Reservationmanagement";
import CustomerRegister from "./CustomerPanel/CustomerRegister";
import CustomerLogin from "./CustomerPanel/CustomerLogin";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";

export default function App() {
  const [cart, setCart] = useState([]);


  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> 
          <Route path="/reservation" element={<CustomerProtectedRoute><Reservation /></CustomerProtectedRoute>} />
          <Route path="/order" element={<CustomerProtectedRoute> <Order /> </CustomerProtectedRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Menumanagement" element={<MenuManagement />} />
          <Route path="/ReservationManagement" element={<ReservationManagement />}/>        
          <Route path="/customer-register" element={<CustomerRegister />}/> 
          <Route path="/customer-login" element={<CustomerLogin />}/> 

        </Routes>

      </div>
      <Footer />
    </BrowserRouter>
  );
}
