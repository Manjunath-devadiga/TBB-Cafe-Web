import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem
} from "../redux/cartSlice";

import Order from "./Order";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-5">
          <h2 className="mb-4">Your Cart</h2>

          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.name} className="card bg-dark text-white mb-3 p-3">
                
                <h5>{item.name}</h5>
                <p>₹{item.price}</p>

                <div className="d-flex align-items-center mb-2">
                  <button
                    className="btn btn-light me-2"
                    onClick={() => dispatch(decreaseQty(item.name))}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="btn btn-light ms-2"
                    onClick={() => dispatch(increaseQty(item.name))}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(removeItem(item.name))}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <h4 className="mt-3">Total: ₹{total}</h4>
          )}
        </div>
        <div className="col-md-7">
          <Order />
        </div>

      </div>
    </div>
  );
}