import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";

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
      setOrders(data);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div className="container">

        <h2
          style={{
            fontWeight: "700",
            marginBottom: "30px",
          }}
        >
          My Orders
        </h2>

        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "#fff",
              border: "1px solid #ffb2a8",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >

            {/* LEFT */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                flex: "2",
                minWidth: "250px",
              }}
            >

              {/* ICON */}
              <div
                style={{
                  width: "55px",
                  height: "55px",
                  background: "#ffa500",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "22px",
                }}
              >
                <FaBox />
              </div>

              {/* ITEMS */}
              <div>
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "#555",
                    lineHeight: "1.5",
                  }}
                >
                  {order.items}
                </p>

                <small
                  style={{
                    color: "#999",
                  }}
                >
                  Qty: {order.quantities}
                </small>
              </div>
            </div>

            {/* PRICE */}
            <div
              style={{
                minWidth: "100px",
                fontWeight: "600",
                color: "#444",
              }}
            >
              ₹{order.total_price}
            </div>

            {/* ITEMS COUNT */}
            <div
              style={{
                minWidth: "100px",
                color: "#666",
              }}
            >
              Items:{" "}
              {order.quantities
                .split(",")
                .reduce(
                  (sum, q) =>
                    sum + Number(q),
                  0
                )}
            </div>

            {/* STATUS */}
            <div
              style={{
                minWidth: "160px",
                fontWeight: "500",
                color:
                  order.status === "Delivered"
                    ? "green"
                    : order.status ===
                      "Dispatched"
                      ? "#007bff"
                      : "#ff9800",
              }}
            >
              ● {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}