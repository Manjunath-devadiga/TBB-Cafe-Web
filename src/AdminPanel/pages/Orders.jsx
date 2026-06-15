import { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { orderSuccess,orderFailure } from "../../redux/orderSlice";
import Sidebar from "../Sidebar";

export default function Orders() {

  const dispatch = useDispatch();
  const {
    orders,
    error,
  } = useSelector((state) => state.orders);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/orders"
        );

        const data = await res.json();
        dispatch(orderSuccess(data));

      } catch (err) {
        dispatch(orderFailure(err.message));
      }
    };
    fetchOrders();
  }, [dispatch]);

  const updateStatus = async (
  id,
  status
) => {
  try {
    await fetch(
      `http://localhost:5000/api/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const updatedOrders =
      orders.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      );

    dispatch(
      orderSuccess(updatedOrders)
    );

  } catch (err) {
    console.error(err);
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
                  <th>Status</th>
                  <th>Date</th>
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
                        {order.items}
                      </td>
                      <td>
                        {order.quantities}
                      </td>
                      <td>
                        ₹{order.total_price}
                      </td>
                      <td>
                        <select
                          className="form-select"
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(
                              order.id,
                              e.target.value
                            )
                          }
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Packed">
                            Packed
                          </option>

                          <option value="Dispatched">
                            Dispatched
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>
                        </select>
                      </td>

                      <td>
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </td>
                      <td></td>
                    </tr>
                  ))) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center"
                    >
                      No Orders Found
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}