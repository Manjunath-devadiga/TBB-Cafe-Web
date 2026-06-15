import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeItem,
} from "../redux/cartSlice";
import Order from "./Order";

export default function Cart() {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce(
    (sum, item) => {

      const finalPrice =
        item.discount > 0
          ? item.price -(
              item.price *
              item.discount
            ) /
              100
          : item.price;

      return (
        sum +
        finalPrice *
          item.quantity
      );
    },
    0
  );

  return (

    <div className="container py-4">
      <div className="row g-4">

        {/* CART */}

        <div className="col-12 col-lg-5">
          <h3 className="mb-4 fw-bold">
            Your Cart
          </h3>

          {cart.length === 0 ? (

            <p className="text-muted">
              Cart is empty
            </p>

          ) : (

            <>
              {cart.map((item) => {

                const finalPrice =
                  item.discount > 0
                    ? item.price -
                      (
                        item.price *
                        item.discount
                      ) /
                        100
                    : item.price;

                return (

                  <div
                    key={item.name}
                    className="cart-card border rounded-3 p-3 mb-3 bg-white" >

                    <div className="cart-wrapper d-flex">

                      {/* IMAGE */}

                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-img"
                      />

                      {/* DETAILS */}

                      <div className="ms-3 flex-grow-1 cart-content">

                        {/* TOP */}

                        <div className="d-flex justify-content-between align-items-start gap-2">

                          <div>

                            <h6 className="mb-1 fw-semibold cart-title">
                              {item.name}
                            </h6>

                            {/* PRICE */}

                            <div className="mb-2 d-flex align-items-center gap-2 flex-wrap">

                              <span className="fw-bold text-dark cart-price">
                                ₹{finalPrice.toFixed(2)}
                              </span>

                              <span
                                className="text-muted text-decoration-line-through small"
                                style={{
                                  visibility:
                                    item.discount > 0
                                      ? "visible"
                                      : "hidden",
                                }} >
                                ₹{item.price}
                              </span>

                              <span
                                className="badge bg-danger"
                                style={{fontSize:"11px",visibility:item.discount > 0
                                      ? "visible"
                                      : "hidden",
                                }}>
                                {item.discount} % OFF
                              </span>
                            </div>
                          </div>

                          {/* REMOVE */}

                          <button
                            className="btn btn-sm text-danger remove-btn"

                            onClick={() =>
                              dispatch(
                                removeItem( item.name )
                              )}>
                            Remove
                          </button>
                        </div>

                        {/* QUANTITY */}

                        <div className="d-flex align-items-center qty-box">

                          <button
                            className="btn btn-sm btn-light border"

                            onClick={() =>
                              dispatch(
                                decreaseQty( item.name)) }>
                            -
                          </button>

                          <span className="mx-3">
                            {item.quantity}
                          </span>

                          <button
                            className="btn btn-sm btn-light border"

                            onClick={() =>
                              dispatch(
                                increaseQty(item.name ))}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* TOTAL */}

              <div className="d-flex justify-content-between mt-4 border-top pt-3">

                <h5>Total</h5>

                <h5 className="fw-bold text-success">
                  ₹{total.toFixed(2)}
                </h5>
              </div>
            </>
          )}
        </div>

        {/* ORDER FORM */}

        <div className="col-12 col-lg-7">
          <Order />
        </div>
      </div>
    </div>
  );
}

