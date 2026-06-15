import "../index.css";
import Testimonials from "../components/Testimonals";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Footer from "./Footer";
import { CustomerContext } from "../contexts/CustomerContext";
import {validateName,validateEmail,validateRating, validatePhone,
  validateMessage} from "../utils/Validation";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno:"",
    rating: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { customer } = useContext(CustomerContext);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
   if (!customer) {
    navigate("/customer-login");
    return;
  }

  const newErrors = {
    name: validateName(formData.name),
    email: validateEmail(formData.email),
    phoneno: validatePhone(formData.phoneno),
    rating: validateRating(formData.rating),
    message: validateMessage(formData.message),
  };

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error !== "")) {
    return;
  }

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
      setFormData({
        name: "",
        email: "",
        phoneno:"",
        rating: "",
        message: "",
      });
      setErrors({});
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
                    <label className="form-label fw-semibold text-dark">
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="form-control rounded-3"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (<small className="text-danger">{errors.name}</small>)}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold text-dark">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control rounded-3"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}/>
                    {errors.email && (<small className="text-danger">{errors.email}</small>)}
                  </div>

                  <div className="col-md-6 mb-3" >
                    <label className="form-label fw-semibold text-dark">
                      Phone No
                    </label>

                    <input
                      type="tel"
                      name="phoneno"
                      className="form-control rounded-3"
                      placeholder="Enter your phone no"
                      value={formData.phoneno}
                      onChange={handleChange}/>
                    {errors.phoneno && (<small className="text-danger">{errors.phoneno}</small>)}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold text-dark">
                    Rating
                  </label>

                  <select
                    name="rating"
                    className="form-select rounded-3"
                    value={formData.rating}
                    onChange={handleChange}>
                    <option value="">Select Rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Very Good</option>
                    <option value="3">⭐⭐⭐ Good</option>
                    <option value="2">⭐⭐ Average</option>
                    <option value="1">⭐ Poor</option>
                  </select>
                  {errors.rating && (<small className="text-danger">{errors.rating}</small>)}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold text-dark">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows="5"
                    className="form-control rounded-3"
                    placeholder="Write your feedback..."
                    value={formData.message}
                    onChange={handleChange}>
                   </textarea>
                  {errors.message && (<small className="text-danger">{errors.message}</small>)}
                </div>

                <button
                  type="submit"                  
                  className="btn btn-dark w-100 py-2 rounded-3 fw-semibold">
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