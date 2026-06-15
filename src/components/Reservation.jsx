import { useState, useEffect } from "react";
import { getCustomer } from "../utils/customerAuth";
import Footer from "./Footer";
import {
  validateName, validateEmail, validateDate, validateTime,validatePhone,
  validateFutureReservation, validateGuests, validateTableNo
} from "../utils/validation";


export default function Reservation() {

  const customer = getCustomer();

  const [form, setForm] = useState({
    customerId: customer?.id || null,
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "",
    phoneno: "",
    tableNo: ""
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [reservations, setReservations] = useState([]);

  // restaurant tables
  const tables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // fetch reservations
  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/reservations"
      );

      const data = await res.json();

      if (data.success) {
        setReservations(data.reservations);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // check table booked for same date + time
  const isTableBooked = (tableNo) => {

    return reservations.some((r) => {

      const reservationDate = r.date;

      return (
        Number(r.table_no) === Number(tableNo) &&

        reservationDate === form.date &&
        r.time?.slice(0, 5) ===
        form.time?.slice(0, 5) &&
        r.status?.toLowerCase() ===
        "confirmed"
      );
    });
  };

  // handle change
  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    const nameError = validateName(form.name);
    const emailError = validateEmail(form.email);
    const dateError = validateDate(form.date);
    const timeError = validateTime(form.time);
    const futureError = validateFutureReservation(form.date, form.time);
    const guestsError = validateGuests(form.guests);
    const phoneError = validatePhone(form.phoneno);
    const tableError = validateTableNo(form.tableNo);

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (dateError) newErrors.date = dateError;
    if (guestsError) newErrors.guests = guestsError;
    if (phoneError) newErrors.phoneno = phoneError;
    if (tableError) newErrors.tableNo = tableError;
    if (timeError) {
      newErrors.time = timeError;
    } else if (futureError) {
      newErrors.time = futureError;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit reservation
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      const res = await fetch(
        "http://localhost:5000/reserve",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (data.success) {

        setMessage(data.message);

        fetchReservations();

        setForm({
          customerId: customer?.id || null,
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "",
          phoneno: "",
          tableNo: ""
        });

        setErrors({});

      } else {

        setMessage(
          data.message || "Error Booking"
        );
      }

    } catch (err) {

      console.log(err);

      setMessage("Server error");
    }
  };

  const timeSlots = [];

  for (let hour = 10; hour <= 19; hour++) {
    for (let minute of [0, 30]) {
      if (hour === 19 && minute > 0) break;

      const time =
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

      timeSlots.push(time);
    }
  }

  return (
    <>
      <div className="reservation">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-dark text-white p-4 shadow">

                <h3 className="text-center mb-4">
                  Reserve a Table
                </h3>

                {/* message */}
                {message && (
                  <div
                    className={`alert ${message.includes("successful")
                      ? "alert-success"
                      : "alert-danger"
                      }`}>
                    {message}
                  </div>
                )}

                {/* date + time */}
                <div className="row mb-4">
                  {/* date */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Select Date
                    </label>

                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="form-control"
                      name="date"
                      value={form.date}
                      onChange={handleChange} />

                    {errors.date && (<small className="text-danger">{errors.date}</small>)}

                  </div>

                  {/* time */}
                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Select Time
                    </label>

                    <select
                      className="form-control"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select Time
                      </option>

                      {timeSlots.map((slot) => (
                        <option
                          key={slot}
                          value={slot}
                          disabled={
                            form.date ===
                            new Date().toISOString().split("T")[0] &&
                            new Date(
                              `${form.date} ${slot}`
                            ) < new Date()
                          }
                        >
                          {slot}
                        </option>
                      ))}
                    </select>

                    {errors.time && (<small className="text-danger">{errors.time}</small>)}

                  </div>
                </div>

                {/* table availability */}
                <div className="mb-4">

                  <h5 className="text-warning mb-3">
                    Table Availability
                  </h5>

                  {(!form.date || !form.time) && (
                    <div className="alert alert-info">
                      Please select date and time first
                    </div>
                  )}

                  <div className="row g-3">

                    {tables.map((table) => {
                      const booked = isTableBooked(table);
                      return (
                        <div
                          className="col-6 col-md-4 col-lg-3"
                          key={table}>

                          <button
                            type="button"
                            disabled={booked || !form.date || !form.time}
                            onClick={() =>
                              setForm({ ...form, tableNo: table })}
                            className={`btn w-100 py-3 ${booked
                              ? "btn-danger"
                              : form.tableNo ===
                                table
                                ? "btn-warning"
                                : "btn-success"
                              }`}>

                            <div className="fw-bold">
                              Table {table}
                            </div>

                            <small>
                              {booked
                                ? "Booked"
                                : "Available"}
                            </small>

                          </button>

                        </div>
                      );
                    })}
                  </div>

                  {errors.tableNo && (
                    <small className="text-danger d-block mt-2">
                      {errors.tableNo}
                    </small>
                  )}

                </div>

                {/* reservation form */}
                <form onSubmit={handleSubmit}>

                  {/* name */}
                  <div className="mb-3">

                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                    />

                    {errors.name && (
                      <small className="text-danger">
                        {errors.name}
                      </small>
                    )}

                  </div>

                  {/* email */}
                  <div className="mb-3">

                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                    />

                    {errors.email && (
                      <small className="text-danger">
                        {errors.email}
                      </small>
                    )}

                  </div>

                  {/* guests + phone */}

                  <div className="row">

                    {/* guests */}
                    <div className="col-md-6 mb-3">

                      <input
                        type="number"
                        className="form-control"
                        name="guests"
                        placeholder="Number of Guests(Max 5)"
                        value={form.guests}
                        onChange={handleChange}
                      />

                      {errors.guests && (
                        <small className="text-danger">
                          {errors.guests}
                        </small>
                      )}

                    </div>


                    {/* phone */}
                    <div className="col-md-6 mb-3">

                      <input
                        type="tel"
                        className="form-control"
                        name="phoneno"
                        placeholder="Phone Number"
                        value={form.phoneno}
                        onChange={handleChange}
                      />
                       {errors.phoneno && (
                        <small className="text-danger">
                          {errors.phoneno}
                        </small>
                      )}

                    </div>

                  </div>

                  {/* selected table */}
                  <div className="mb-3">

                    <input
                      type="text"
                      className="form-control"
                      value={
                        form.tableNo
                          ? `Table ${form.tableNo}`
                          : ""
                      }
                      placeholder="Selected Table"
                      readOnly
                    />

                  </div>

                  {/* button */}
                  <button
                    type="submit"
                    className="btn btn-warning w-100 mt-2"
                  >
                    Reserve Now
                  </button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}