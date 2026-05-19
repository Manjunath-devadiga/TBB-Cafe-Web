import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

export default function Order() {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  // CART TOTAL
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // SINGLE ITEM TOTAL
  const manualTotal =
    (prices[item] || 0) * quantity;

  // FINAL TOTAL
  const total =
    cart.length > 0
      ? cartTotal
      : manualTotal;

  // SUBMIT ORDER
  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION
    if (!name) {
      alert("Please enter your name");
      return;
    }
    if (!address) {
      alert("Please enter your address");
      return;
    }

    if (cart.length === 0 && !item) {
      alert("Please select an item");
      return;
    }

    // ORDER OBJECT
    const orderData = {
      name,
      address,
      items:
        cart.length > 0
          ? cart.map((cartItem) => ({
            name: cartItem.name,
            quantity: cartItem.quantity,
            price: cartItem.price,
          }))
          : [
            {
              name: item,
              quantity,
              price: prices[item],
            },
          ],

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

      const data = await response.json();

      if (data.success) {

        alert("Order Placed Successfully!");

        dispatch(clearCart());

        setName("");
        setItem("");
        setQuantity(1);

      } else {
        alert("Order Failed");
      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-5 col-lg-4">

          <form
            className="order-box"
            onSubmit={handleSubmit}
          >

            {/* CUSTOMER NAME */}
            <input
              className="form-control mb-3"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
            <textarea
              className="form-control mb-3"
              placeholder="Delivery Address"
              rows="3"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
            />

            {/* CART ITEMS */}
            {cart.length > 0 && (

              <div className="mb-3">

                <p className="text-warning">
                  Items from Cart:
                </p>

                {cart.map((item) => (

                  <div key={item.name}>

                    {item.name}
                    {" × "}
                    {item.quantity}

                    {" - ₹"}

                    {item.price * item.quantity}

                  </div>

                ))}

              </div>

            )}

            {/* TOTAL */}
            <h5 className="text-warning text-center">

              Total: ₹{total}

            </h5>

            {/* SUBMIT BUTTON */}
            <motion.button
              className="btn btn-warning w-100 mt-3"
              type="submit"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
            >
              Place Order
            </motion.button>

          </form>

        </div>

      </div>

    </div>
  );
}