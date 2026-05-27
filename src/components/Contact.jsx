import "../index.css";
import Testimonials from "../components/Testimonals";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    guests: "",
    date: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:5000/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (response.ok) {
    alert("Enquiry Submitted Successfully!");

    setForm({
      name: "",
      email: "",
      phone: "",
      purpose: "",
      guests: "",
      date: "",
      time: "",
      message: "",
    });
  } else {
    alert("Failed to submit enquiry");
  }
};
  return (
    <section
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(to right, #7c8072, #dec5bc)",
      }}
    >
      <div className="container">
        <div className="row g-4 align-items-start">

          {/* Contact Section */}
          <div className="col-lg-5 text-center">
            <div className="p-4">
              <h2 className="fw-bold mb-4">Contact Info</h2>

              <p className="text-dark fs-5">
                📍 Kharadi IT Park, Pune - 411014
              </p>

              <p className="text-dark fs-5">
                📞 +91 1234567890
              </p>

              <p className="text-dark fs-5">
                ✉️ info@TheOGcafe.com
              </p>

              <Testimonials />
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-lg rounded-4 p-4">
              <h2 className="text-center mb-4 fw-bold text-primary">
                Cafe Enquiry Form
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white">Full Name</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white">Email</label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white">Phone Number</label>

                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Enter phone number"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label text-white">
                      Purpose of Enquiry
                    </label>

                    <select
                      className="form-select"
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Purpose</option>
                      <option>Table Booking</option>
                      <option>Birthday Party</option>
                      <option>Catering</option>
                      <option>Feedback</option>
                      <option>General Question</option>
                      <option>Job Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label text-white">
                      Number of Guests
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      placeholder="Guests"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label text-white">Date</label>

                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label text-white">Time</label>

                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label text-white">
                    Message / Special Request
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your enquiry..."
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-dark w-100 py-2 fs-5 rounded-3" >
                  Submit Enquiry
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}