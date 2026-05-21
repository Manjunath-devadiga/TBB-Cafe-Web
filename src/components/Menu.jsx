import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { discountConfig } from "../data/discountConfig";
import { motion } from "framer-motion";
import { MENU_TYPES, CATEGORY } from "../config/menuConfig";
import {
  fetchMenuStart,
  fetchMenuSuccess,
  fetchMenuFailure,
} from "../redux/menuSlice";

import headerImg from "../assets/Pasta.jpg";
import vegImg from "../assets/Salad.jpg";
import nonVegImg from "../assets/Masala Dosa.jpg";

export default function MenuPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
  (state) => state.menu);
  const [foodType, setFoodType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

useEffect(() => {
  const fetchMenu = async () => {
    try {
      dispatch(fetchMenuStart());

      const res = await fetch(
        "http://localhost:5000/api/menu"
      );
      const data = await res.json();
      dispatch(fetchMenuSuccess(data));
    } catch (err) {
      dispatch(fetchMenuFailure(err.message));
    }
  };

  fetchMenu();
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory("All");
  }, [foodType]);

  const categories = ["All", ...(CATEGORY[foodType] || [])];

  const filteredItems = items.filter(item => {
    const itemType = item.type?.toLowerCase();
    const searchText = search.toLowerCase();

    const matchType =
      foodType === "All" || itemType === foodType.toLowerCase();

    const matchCategory =
      foodType === "Veg" || foodType === "Non-Veg"
        ? selectedCategory === "All" || item.category === selectedCategory
        : true;

    const matchSearch =
      item.name?.toLowerCase().includes(searchText);

    return matchType && matchCategory && matchSearch;
  });


  return (
    <div
      className="container-fluid px-0"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #7c8072, #dec5bc)",
      }}
    >
      <section style={{ height: "300px", position: "relative" }}>
        <img
          src={headerImg}
          alt="menu"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
          }}
        />

        <motion.div
          className="text-center w-100"
          style={{ position: "absolute", top: "50%", transform: "translateY(-50%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-white fw-bold">Explore Our Menu</h1>
        </motion.div>
      </section>

      <section className="py-4" style={{ background: "#1f1f1f" }}>
        <div className="container">


          <div className="d-flex flex-wrap gap-2 mb-3">
            {MENU_TYPES.map(type => (
              <button
                key={type}
                className={`btn ${foodType === type ? "btn-success" : "btn-outline-success"
                  }`}
                onClick={() => setFoodType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {(foodType === "Veg" || foodType === "Non-Veg") && (
            <div className="d-flex flex-wrap gap-2 mb-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`btn ${selectedCategory === cat
                      ? "btn-warning"
                      : "btn-outline-light"
                    }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <input
            type="text"
            placeholder="Search food..."
            className="form-control"
            style={{ maxWidth: "250px" }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </section>

      <section className="container my-5 text-center">
        <div className="row g-3">
          {[vegImg, nonVegImg, headerImg].map((img, i) => (
            <div key={i} className="col-md-4">
              <motion.img
                src={img}
                className="img-fluid rounded shadow"
                style={{ height: "250px", width: "350px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-dark text-white text-center py-3">
        <h2>Foods you can Enjoy here!</h2>
      </section>

      <section className="container my-5 text-center">
        <div className="row g-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => {
              const discount =
                item.discount || discountConfig[item.id] || 0;

              const finalPrice =
                item.price - (item.price * discount) / 100;

              return (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="card h-100 text-light bg-secondary border-0 shadow">

                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="card-body">

                      {discount > 0 && (
                        <span className="badge bg-danger">
                          {discount}% OFF
                        </span>
                      )}

                      <h5>{item.name}</h5>

                      <p>
                        {discount > 0 ? (
                          <>
                            <del>₹{item.price}</del> ₹{finalPrice}
                          </>
                        ) : (
                          `₹${item.price}`
                        )}
                      </p>

                      <button
                        className="btn btn-warning w-80"
                        onClick={() =>
                          dispatch(
                            addToCart({ ...item, price: finalPrice })
                          )
                        }
                      >
                        Add to Cart
                      </button>

                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-light">No items found 😔</p>
          )}
        </div>
      </section>
    </div>
  );
}