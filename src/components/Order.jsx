import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { getCustomer } from "../utils/customerAuth";
import { validateName,validatePhone,validateAddress} from "../utils/validation";

export default function Order() {
  const cart = useSelector((state) => state.cart || []);
  const dispatch = useDispatch();
  const customer = getCustomer();

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  const total = cart.reduce((sum, item) => {
    const finalPrice =
      item.discount > 0
        ? item.price - (item.price * item.discount) / 100
        : item.price;

    return sum + finalPrice * item.quantity;
  }, 0);


  const validate = () => {
    let newErrors = {};

    const nameError = validateName(name);
    const phoneError = validatePhone(phoneNo);
    const addressError = validateAddress(address);

    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phoneNo = phoneError;
    if (addressError) newErrors.address = addressError;

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validate()) return;
    setShowPopup(true);
  };

  // PLACE ORDER
  const placeOrder = async () => {

    const orderData = {
      customerId: customer?.id || null,
      name: name.trim(),
      email: customer?.email || "",
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

      const response = await fetch(
        "http://localhost:5000/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      if (data.success) {

        alert("Order Placed Successfully!");

        dispatch(clearCart());

        setName("");
        setPhoneNo("");
        setAddress("");

        setShowPopup(false);

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
        <h4>Your cart is empty 🛒 Visit Menu to place order</h4>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="bg-white p-4 rounded shadow-sm"
        style={{width: "100%",maxWidth: "420px"}}>
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
          {errors.name && (<small className="text-danger">{errors.name} </small>)}

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
          {errors.phoneNo && (<small className="text-danger">{errors.phoneNo} </small>)}

          {/* ADDRESS */}
          <textarea
            className="form-control mb-3"
            placeholder="Enter Delivery Address"
            rows="3"
            maxLength="200"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />
          {errors.address && (<small className="text-danger">{errors.address} </small>)}

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
      {/* PAYMENT POPUP */}
      {showPopup && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{
              width: "90%",
              maxWidth: "350px",
            }}
          >
            <h5 className="mb-3 text-center">
              Select Payment Method
            </h5>

            <button
              className="btn btn-warning w-100 mb-2"
              onClick={placeOrder}
            >
              Cash on Delivery
            </button>

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
