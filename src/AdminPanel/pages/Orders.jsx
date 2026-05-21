import { useEffect } from "react";
import { useDispatch, useSelector,} from "react-redux";
import {
  orderStart,
  orderSuccess,
  orderFailure,
} from "../../redux/orderSlice";
import Sidebar from "../Sidebar";

export default function Orders() {

  const dispatch = useDispatch();
  const {
    orders,
    loading,
    error,
   } = useSelector((state) => state.orders);

  // FETCH ORDERS
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      dispatch(orderStart());
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