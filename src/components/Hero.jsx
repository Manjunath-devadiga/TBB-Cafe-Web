import "../index.css";
import Footer from "./Footer"
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import MenuCard from "./MenuCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { CustomerContext } from "../contexts/CustomerContext";


export default function Hero() {
  const [homeMenu, setHomeMenu] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customer } = useContext(CustomerContext);

  const handleAddToCart = (item) => {
    if (!customer) {
      navigate("/customer-login");
      return;
    }
    dispatch(addToCart(item));
  };

  useEffect(() => {
    fetch("http://localhost:5000/home-menu")
      .then((res) => res.json())
      .then((data) => setHomeMenu(data))
      .catch((err) => console.log(err));
  }, []);

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
              <span className="text-light">Experience Luxury Dining</span>
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

      <section className="home-content">

        <div className="container py-5">
          <h2 className="why-title">
            Why Choose Us
          </h2>


          <div className="row align-items-center justify-content-center mt-5">

            {/* Left Quote */}
            <div className="col-md-4 text-center">
              <div className="quote">
                <span>“</span>
                Good food is the foundation of genuine happiness.
                <span>”</span>
              </div>
            </div>


            {/* Coffee Image */}
            <div className="col-md-3 text-center">
              <img
                src="/coffeeimage.png"
                alt="Cold Coffee"
                className="coffee-img"
              />
            </div>


            {/* Right Quote */}
            <div className="col-md-4 text-center">
              <div className="quote">
                <span>“</span>
                Every sip of cold coffee tells a refreshing story.
                <span>”</span>
              </div>
            </div>

          </div>



          {/* Features */}

          <div className="row mt-5 feature-row">


            <div className="col-md-3 feature">
              <div className="icon">🍔</div>
              <h4>Fresh Food</h4>
              <p>
                Prepared daily with high-quality ingredients.
              </p>
            </div>



            <div className="col-md-3 feature">
              <div className="icon">🚀</div>
              <h4>Fast Service</h4>
              <p>
                Quick delivery and instant service.
              </p>
            </div>



            <div className="col-md-3 feature">
              <div className="icon">⭐</div>
              <h4>Premium Taste</h4>
              <p>
                Experience luxury dining like never before.
              </p>
            </div>



            <div className="col-md-3 feature">
              <div className="icon">☕</div>
              <h4>
                Signature Cold Coffee
              </h4>
              <p>
                Rich, creamy, and refreshing in every sip.
              </p>
            </div>
          </div>
        </div>

        {/* Today's Special */}
        <div className="container py-5">
          <h3 className="why-title">Today's Special</h3>

          <div className="row g-4">
            {homeMenu.map((item) => {
              const discount = item.discount || 0;

              const finalPrice =
                item.price - (item.price * discount) / 100;

              return (
                <div
                  key={item.id}
                  className="col-lg-4 col-md-6"
                >
                  <MenuCard
                    item={item}
                    discount={discount}
                    finalPrice={finalPrice}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                </div>
              );
            })}
          </div>
        </div>


        {/* Visiting Time */}
        <div className="text-center py-5 text-warning">

          <h2 className="why-title">⏰ Visiting Time</h2>

          <div className="img-container text-white">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

              <hr className="line" />

              <h3 className="timing-text">
                MONDAY TO SATURDAY &nbsp;&nbsp; 10AM - 07PM
              </h3>

              <h3 className="timing-text mt-4">
                SUNDAY &nbsp;&nbsp; 10AM - 07PM
              </h3>

              <h3 className="timing-text mt-5">
                BRUNCH SERVED ON <br />
                SATURDAY & SUNDAY
              </h3>

              <hr className="line mt-4" />

            </motion.div>

          </div>

        </div>



      </section>
      <Footer></Footer>
    </>
  );
}