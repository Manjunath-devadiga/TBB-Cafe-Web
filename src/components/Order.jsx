import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { getCustomer } from "../utils/customerAuth";

export default function Order() {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();
  const customer = getCustomer();

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => {
    const finalPrice =
      item.discount > 0
        ? item.price - (item.price * item.discount) / 100
        : item.price;

    return sum + finalPrice * item.quantity;
  }, 0);

  // SUBMIT ORDER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!phoneNo.trim()) {
      alert("Please enter phone number");
      return;
    }

    if (!address.trim()) {
      alert("Please enter address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // ORDER OBJECT
    const orderData = {
      customerId: customer?.id || null,
      name: name.trim(),
      phoneNo: phoneNo.trim(),
      address: address.trim(),

      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.finalPrice || item.price,
      })),

      total,
    };

    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      // SUCCESS
      if (data.success) {
        alert("Order Placed Successfully!");

        dispatch(clearCart());

        setName("");
        setPhoneNo("");
        setAddress("");
      } else {
        alert(data.message || "Order Failed");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Server Error");
    }
  };

  // EMPTY CART UI
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4>Your cart is empty 🛒</h4>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="bg-white p-4 rounded shadow-sm"
        style={{
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h3 className="text-center mb-4">
          Place Order
        </h3>

        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {/* PHONE */}
          <input
            type="tel"
            className="form-control mb-3"
            placeholder="Enter Phone Number"
            value={phoneNo}
            onChange={(e) =>
              setPhoneNo(e.target.value)
            }
          />

          {/* ADDRESS */}
          <textarea
            className="form-control mb-3"
            placeholder="Enter Delivery Address"
            rows="3"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          {/* TOTAL */}
          <div className="d-flex justify-content-between mb-3">
            <span>Total Amount</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>

          {/* BUTTON */}
          <motion.button
            type="submit"
            className="btn btn-warning w-100"
            whileTap={{ scale: 0.95 }}
          >
            Place Order
          </motion.button>
        </form>
      </div>
    </div>
  );
}