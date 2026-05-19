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

export default function App() {
  const [cart, setCart] = useState([]);


  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/menu" element={<Menu cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/reservation" element={<Reservation />} />          
          <Route path="/order" element={<Order />} />          
          <Route path="/Menumanagement" element={<MenuManagement />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

      </div>    
      <Footer />
    </BrowserRouter>
  );
}
