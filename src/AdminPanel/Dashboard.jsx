import AddMenuItem from "./AddMenuItem";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import Sidebar from "./Sidebar";

export default function Dashboard() {

  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    customers: 0,
    sales: 0,
  });

  const [orders, setOrders] = useState([]);
  const [trendingmenu, setTrending] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));

    // FETCH RECENT ORDERS
    fetch("http://localhost:5000/api/dashboard/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));

    // FETCH TRENDING ITEMS
    fetch("http://localhost:5000/api/dashboard/trending")
      .then((res) => res.json())
      .then((data) => setTrending(data))
      .catch((err) => console.log(err));

  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar></Sidebar>
      <div className="main-content container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold">
              Welcome to Our Cafe ☕
            </h2>

            <p className="text-muted">
              Admin Dashboard Overview
            </p>
          </div>

          <div className="d-flex align-items-center gap-3 flex-wrap">

            <input
              type="text"
              placeholder="Search something"
              className="search-box"
            />

          </div>
        </div>

        {/* STATS */}
        <div className="row g-4 mb-4">

          <div className="col-md-3">
            <StatCard
              title="Total Orders"
              value={stats.totalOrders} />
          </div>

          <div className="col-md-3">
            <StatCard
              title="Customers"
              value={stats.customers} />
          </div>

          <div className="col-md-6">
            <StatCard
              title="Total Sales"
              value={`₹${stats.sales}`} />
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="custom-card">
          <div className="d-flex justify-content-between mb-4">
            <h4>Recent Orders</h4>
            <span className="see-all">
              Latest Orders
            </span>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.customer_name}</td>
                      <td>{order.items}</td>
                      <td>{order.quantities}</td>
                      <td>₹{order.total_price}</td>
                      <td>
                        <span className="badge bg-success">
                          Paid
                        </span>
                      </td>
                    </tr>

                  ))) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Orders Found
                    </td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* TRENDING */}
        <div className="col-lg-4">
          <div className="custom-card">
            <div className="d-flex justify-content-between mb-4">
              <h4>Trending Items</h4>
            </div>

            {trendingmenu.length > 0 ? (
              trendingmenu.map((menu, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between mb-4">
                  <div>
                    <h6 className="mb-1">
                      {menu.item}
                    </h6>

                    <small className="text-muted">
                      Total Ordered
                    </small>
                  </div>

                  <strong>
                    {menu.totalSales}
                  </strong>

                </div>
              ))) : (

              <p>No Trending Items</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* STAT CARD */
function StatCard({ title, value }) {

  return (
    <div className="custom-card">
      <div className="d-flex justify-content-between mb-3">
        <h6>{title}</h6>
      </div>

      <h2 className="fw-bold mb-4">
        {value}
      </h2>

      <div className="progress">
        <div
          className="progress-bar custom-progress"
          style={{ width: "70%" }}>
        </div>
      </div>
    </div>
  );
}