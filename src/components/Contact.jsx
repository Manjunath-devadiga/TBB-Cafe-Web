import "../index.css";
import Testimonials from "../components/Testimonals";
import { useState } from "react";
import Footer from "./Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", rating: "", message: "" });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
    <section
      className="container-fluid py-5"
      style={{background: "linear-gradient(to right, #7c8072, #dec5bc)"}}>
      <div className="container">
        <div className="row g-4 align-items-start">

          {/* Contact Section */}
          <div className="col-lg-5 text-center">
            <div className="p-4">
              <h2 className="fw-bold mb-4">Contact Info</h2>
               <p className="text-dark fs-5">
                📞 +91 1234567890
              </p>

              <p className="text-dark fs-5">
                ✉️ info@TheOGcafe.com
              </p>
              
              <p className="text-dark fs-5">
                📍 Kharadi IT Park, Pune - 411014
              </p>
              <div className="rounded-4 overflow-hidden shadow mt-4">
                <iframe
                  title="Cafe Location"
                  src="https://www.google.com/maps?q=Kharadi+IT+Park+Pune&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <Testimonials />
            </div>
          </div>

          {/* Feedback Form Section */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg rounded-4 p-4 bg-white">
              <h2 className="text-center fw-bold mb-4">
                Customer Feedback
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control rounded-3"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-3"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Rating
                  </label>

                  <select
                    name="rating"
                    className="form-select rounded-3"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Average</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows="5"
                    className="form-control rounded-3"
                    placeholder="Write your feedback..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100 py-2 rounded-3 fw-semibold"
                >
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
    <Footer></Footer>
    </>
  );
}