import { motion } from "framer-motion";

export default function MenuCard({
  item,
  finalPrice,
  discount,
  onAddToCart,
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="menu-card">
      <div className="menu-img-box">
        <img
          src={item.image}
          alt={item.name}
          className="menu-img"
        />
      </div>

      <div className="p-3 p-md-4 d-flex flex-column justify-content-between menu-content">
        <div>
          <div className="d-flex justify-content-between align-items-start gap-2">
            <h5 className="fw-bold menu-title mb-0">
              {item.name}
            </h5>

            {discount > 0 && (
              <span
                style={{
                  background: "#e63946",
                  color: "#fff",
                  fontSize: "11px",
                  padding: "5px 10px",
                  borderRadius: "30px",
                  whiteSpace: "nowrap",
                }}>
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="menu-price-box">
          {discount > 0 ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#999",
                  marginRight: "8px",
                }}
              >
                ₹{item.price}
              </span>

              <span className="fw-bold fs-5 menu-price">
                ₹{finalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="fw-bold fs-5 menu-price">
              ₹{item.price}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="menu-btn">
          Add Item
        </button>
      </div>
    </motion.div>
  );
}