import "../index.css";
import Footer from "./Footer"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import items from "../data/menudata";
import { useState, useEffect } from "react";

export default function Hero() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderItems = items.slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderItems.length]);

  return (
    <>
      <section className="hero d-flex align-items-center">
        <div className="container">
          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="display-4 fw-bold">
              Experience <span className="text-warning">Luxury Dining</span>
            </h1>

            <p className="text-muted my-3">
              Where taste meets elegance. Crafted with passion, served with perfection.
            </p>

            <div className="d-flex flex-wrap gap-2">
              <Link to="/menu" className="btn btn-warning">
                Explore Menu
              </Link>

              <Link to="/reservation" className="btn btn-outline-light">
                Book Table
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container my-5 text-center">
        <h2 className="text-warning mb-4">Why Choose Us</h2>

        <div className="row">
          <div className="col-md-4">
            <h4>🍔 Fresh Food</h4>
            <p>Prepared daily with high-quality ingredients.</p>
          </div>

          <div className="col-md-4">
            <h4>🚀 Fast Service</h4>
            <p>Quick delivery and instant service.</p>
          </div>

          <div className="col-md-4">
            <h4>⭐ Premium Taste</h4>
            <p>Experience luxury dining like never before.</p>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white text-center py-5">
        <h3> Hungry? Order Your Favorite Meal Now </h3>
      </section>
      
      <section className="bg-dark text-white text-center py-5">
        <h2> ⏰ VISITING TIME</h2>
        <div className="img-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <hr className="line" />

          <h3 className="timing-text">
            MONDAY TO SATURDAY &nbsp;&nbsp; 8AM - 3PM
          </h3>

          <h3 className="timing-text mt-4">
            SUNDAY &nbsp;&nbsp; 9AM - 3PM
          </h3>

          <h3 className="timing-text mt-5">
            BRUNCH SERVED ON <br /> SATURDAY & SUNDAY
          </h3>

          <hr className="line mt-4" />
        </motion.div>

      </div>
      </section>
      <Footer></Footer>
    </>
  );
}