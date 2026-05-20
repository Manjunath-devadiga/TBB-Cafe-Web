import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

export default function Order() {

  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  // SUBMIT ORDER
  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // ORDER OBJECT
    const orderData = {

      name: name.trim(),
      address: address.trim(),

      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),

      total,
    };

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      // CHECK RESPONSE
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      // SUCCESS
      if (data.success) {
        alert("Order Placed Successfully!");
        dispatch(clearCart());
        setName("");
        setAddress("");

      } else {
        alert(data.message || "Order Failed");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Server Error");

    } finally {
      setLoading(false);
    }
  };

  // EMPTY CART UI
  if (cart.length === 0) {

    return (
      <div className="container py-5 text-center">

        <h3 className="text-warning">
          Your cart is empty 🛒
        </h3>

      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <form
            className="order-box p-4 rounded shadow"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              required
              className="form-control mb-3"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
            <textarea
              required
              className="form-control mb-3"
              placeholder="Delivery Address"
              rows="3"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

            <div className="mb-3">

              <p className="text-warning fw-bold">
                Items from Cart:
              </p>

              {cart.map((item, index) => (

                <div
                  key={`${item.name}-${index}`}
                  className="d-flex justify-content-between mb-2">
                  <span>
                    {item.name} × {item.quantity}
                  </span>

                  <span>
                    ₹
                    {Number(item.price) *
                      item.quantity}
                  </span>
                </div>))}
            </div>

            {/* TOTAL */}
            <h5 className="text-warning text-center">
              Total: ₹{total}
            </h5>

            {/* SUBMIT BUTTON */}
            <motion.button
              className="btn btn-warning w-100 mt-3"
              type="submit"
              disabled={loading}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
            > Place Order
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}