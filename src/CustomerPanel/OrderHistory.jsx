import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/${customer.id}`
      );

      const data = await res.json();
      console.log(data);
      setOrders(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">
        My Orders
      </h2>

      <div className="row">
        {orders.map((order) => (
          <div
            key={order.id}
            className="col-md-6 mb-4"
          >
            <div className="border-0">
              <div className="card-body">

                <h5>
                  Order #{order.id}
                </h5>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.customer_name}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.address}
                </p>

                <p>
                  <strong>Item:</strong>{" "}
                  {order.items}
                </p>

                <p>
                  <strong>Quantity:</strong>{" "}
                  {order.quantities}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {order.total_price}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}