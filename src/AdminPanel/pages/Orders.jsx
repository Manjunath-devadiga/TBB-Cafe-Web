import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  // FETCH ORDERS
  useEffect(() => {

    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));

  }, []);

  // DELETE ORDER
  const deleteOrder = async (id) => {

    try {

      await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      setOrders((prev) =>
        prev.filter((order) => order.id !== id)
      );

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content container-fluid">

        <div className="mb-4">

          <h2 className="fw-bold">
            Customer Orders 📦
          </h2>

          <p className="text-muted">
            Manage all customer orders
          </p>

        </div>

        <div className="custom-card">

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>

                <tr>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {orders.length > 0 ? (

                  orders.map((order, index) => (

                    <tr key={index}>

                      <td>
                        {order.customer_name}
                      </td>

                      <td style={{ minWidth: "220px" }}>
                        {order.address}
                      </td>

                      <td>
                        {order.item}
                      </td>

                      <td>
                        {order.quantity}
                      </td>

                      <td>
                        ₹{order.total_price}
                      </td>

                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </td>

                      <td>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteOrder(order.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      No Orders Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}