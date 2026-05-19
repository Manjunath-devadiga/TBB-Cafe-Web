import { useState } from "react";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: ""
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };
  
  const validate = () => {
    let newErrors = {};

    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(form.name)) {
      newErrors.name = "Name should not contain numbers";
    }

    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.date) {
      newErrors.date = "Date is required";
    } else {
      const today = new Date().toLocaleDateString("en-CA");
      if (form.date < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }
    if (!form.time) {
      newErrors.time = "Time is required";
    }

    if (!form.guests) {
      newErrors.guests = "Guests required";
    } else if (form.guests < 1) {
      newErrors.guests = "At least 1 guest required";
    } else if (form.guests > 10) {
      newErrors.guests = "Max 10 guests allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
        setForm({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: ""
        });
        setErrors({});
      } else {
        setMessage("Error Booking");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  };

  return (
    <div className="reservation">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-dark text-white p-4">

              <h3 className="text-center mb-4">Reserve a Table</h3>

              {message && (
                <div className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-1"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
                  <input
                  className="form-control mb-1"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}                
                <input
                  type="date"
                  className="form-control mb-1"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
                {errors.date && <small className="text-danger">{errors.date}</small>}                
                <input
                  type="time"
                  className="form-control mb-1"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                />
                {errors.time && <small className="text-danger">{errors.time}</small>}               
                <input
                  type="number"
                  className="form-control mb-1"
                  name="guests"
                  placeholder="Number of Guests"
                  value={form.guests}
                  onChange={handleChange}
                />
                {errors.guests && <small className="text-danger">{errors.guests}</small>}

                <button
                  type="submit"
                  className="btn btn-warning w-100 mt-3"
                >
                  Reserve Now
                </button>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}