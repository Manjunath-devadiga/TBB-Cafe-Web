import "../index.css";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function AboutUs() {
  return (
    <>  
    <section className="about-section text-center text-light py-5">
      <div className="container">
        <motion.h1
          className="about-title mb-4"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ABOUT US
        </motion.h1>
        <motion.p
          className="about-text mx-auto mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome to <strong>TBB Cafe</strong> — your everyday escape into
          the world of rich aromas and handcrafted flavors. We are passionate about serving freshly brewed coffee made from carefully selected beans sourced from trusted farms. Every cup we serve is a blend of quality, consistency, and love.
        </motion.p>

        <motion.p
          className="about-text mx-auto mb-5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Whether you're starting your morning, catching up with friends, or working on your next big idea, our café offers a warm and cozy environment designed just for you. At Coffee Station, we don’t just serve coffee — we create experiences that bring people together.
        </motion.p>

      
        <motion.div
          className="about-logo mb-5"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h5 className="mb-0">TBB CAFE</h5>
          <small>CAFE</small>
        </motion.div>

        <div className="row justify-content-center g-4">
          {[ 
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
            "https://images.unsplash.com/photo-1511920170033-f8396924c348"
          ].map((img, index) => (
            <div className="col-10 col-md-4" key={index}>
              <motion.img
                src={img}
                alt="coffee"
                className="img-fluid about-img"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            </div>
          ))}
        </div>

        <div className="row mt-5 text-center">
          {[
            { title: "🌱 Fresh Beans", desc: "We source high-quality beans directly from trusted farms to ensure every sip is fresh and flavorful." },
            { title: "👨‍🍳 Expert Baristas", desc: "Our skilled baristas craft each cup with precision and passion to deliver the perfect coffee experience." },
            { title: "🏡 Cozy Ambience", desc: "Relax, work, or hang out in our comfortable space designed to make you feel at home." }
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
        <motion.div
          className="mt-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-3">Our Story</h3>
          <p className="about-text mx-auto mb-4">
            Our journey began with a simple idea — to bring authentic, high-quality coffee to our community. We partner with sustainable farms and believe in ethical sourcing, ensuring that every cup supports both quality and the people behind it.
          </p>
        </motion.div>
        <div className="row justify-content-center g-4">
          {[
            "https://media.istockphoto.com/id/938716300/photo/farm-coffee-plantation-in-brazil.webp?a=1&b=1&s=612x612&w=0&k=20&c=3dcRS0aieyzr42NooR54uzZdRXS4MozFP7h4L9HzVMM=",
            "https://plus.unsplash.com/premium_photo-1682148098085-72b02a2d6604"
          ].map((img, index) => (
            <div className="col-10 col-md-5" key={index}>
              <motion.img
                src={img}
                alt="farm"
                className="img-fluid about-img"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
    <Footer></Footer>
    </>
  );
}