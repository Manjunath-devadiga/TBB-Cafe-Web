import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import {
  reservationStart,
  reservationSuccess,
  reservationFailure,
} from "../../redux/reservationSlice";
import Sidebar from "../Sidebar";

export default function ReservationManagement() {

const dispatch = useDispatch();
const {
  reservations,
  loading,
  error,
} = useSelector((state) => state.reservations);

  // fetch reservations
  useEffect(() => {
  const fetchReservations = async () => {
  try {

    dispatch(reservationStart());
    const res = await fetch(
      "http://localhost:5000/api/reservations"
    );

    const data = await res.json();
    if (data.success) {
      dispatch(
        reservationSuccess(data.reservations));
     }
  } catch (err) {
    dispatch(
      reservationFailure(err.message));
  }
  };
   fetchReservations();
   },
 [dispatch]);


  // confirm reservation
 const confirmReservation = async (id) => {

  try {
    const res = await fetch(
      `http://localhost:5000/api/reservations/confirm/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();
    alert(data.message);
    fetchReservations();

  } catch (err) {
    dispatch(
      reservationFailure(err.message));
  }
};

  // cancel reservation
 const cancelReservation = async (id) => {

  try {
    const res = await fetch(
      `http://localhost:5000/api/reservations/cancel/${id}`,
      {
        method: "PUT",
      }
    );

    const data = await res.json();
    alert(data.message);
    fetchReservations();

  } catch (err) {

    dispatch(
      reservationFailure(err.message));
  }
};

  return (
    <div className="dashboard-container">    
     <Sidebar />
    <div className="main-content container-fluid">
     <div className="container py-5">
      <h2 className="text-center mb-4">
        Reservation Management
      </h2>

      <div className="table-responsive">
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Table No</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.date}</td>
                <td>{r.time}</td>
                <td>{r.guests}</td>
                <td>{r.table_no}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "Confirmed"
                        ? "bg-success"
                        : r.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>

                  <div className="d-flex gap-2 flex-wrap">

                    {/* confirm */}
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        confirmReservation(r.id)
                      }
                      disabled={r.status === "Confirmed"}
                    >
                      Confirm
                    </button>

                    {/* cancel */}
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        cancelReservation(r.id)
                      }
                    >
                      Cancel
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
 </div>
</div>
  );

}