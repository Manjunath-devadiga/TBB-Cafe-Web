import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { fetchMenuSuccess, fetchMenuFailure } from "../redux/menuSlice";
import { discountConfig } from "../data/discountConfig";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import headerImg from "../assets/Pasta.jpg";

export default function MenuPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items } = useSelector(
    (state) => state.menu
  );

  // STATES

  const [foodType, setFoodType] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [search, setSearch] =
    useState("");

  // FETCH MENU

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/menu"
        );

        const data = await res.json();

        dispatch(fetchMenuSuccess(data));
      } catch (err) {
        dispatch(
          fetchMenuFailure(err.message)
        );
      }
    };

    fetchMenu();
  }, [dispatch]);

  // URL FILTERS

  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );
    setFoodType(params.get("type") || "");
    setSelectedCategory(params.get("category") || "");
  }, [location.search]);

  // RESET CATEGORY ON TYPE CHANGE

  useEffect(() => {
    setSelectedCategory("");
  }, [foodType]);

  // MENU TYPES

  const menuTypes = [
    ...new Set(
      items
        .map((item) => item.type)
        .filter(Boolean)
    ),
  ];

  // CATEGORIES

  const categories = [
    ...new Set(
      items
        .filter(
          (item) =>
            foodType &&
            item.type === foodType &&
            item.category
        )
        .map((item) => item.category)
    ),
  ];

  // FILTER ITEMS

  const filteredItems = items.filter(
    (item) => {
      const matchType =
        !foodType ||
        item.type === foodType;

      const matchCategory =
        !selectedCategory ||
        item.category ===
          selectedCategory;

      const matchSearch =
        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchType &&
        matchCategory &&
        matchSearch
      );
    }
  );

  // SEARCH ENTER

  const handleSearch = () => {
    const foundItem =
      filteredItems.find((item) =>
        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    if (foundItem) {
      document
        .getElementById(`menu-item-${foundItem.id}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}

      <section
        style={{
          height: "75vh",
          position: "relative",
        }}
      >
        <img
          src={headerImg}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(55%)",
          }}
        />

        <div
          className="position-absolute top-50 start-50 translate-middle text-center"
          style={{ zIndex: 2 }}
        >
          <motion.h1
            initial={{opacity: 0,y: -20}}
            animate={{opacity: 1,y: 0}}
            className="fw-bold text-white"
            style={{
              fontSize: "4rem",
              letterSpacing: "2px",
            }}
          >
            OUR MENU
          </motion.h1>

          <p
            className="text-light mt-3"
            style={{
              fontSize: "1.1rem",
            }}
          >
            Fresh Ingredients • Premium
            Taste
          </p>
        </div>
      </section>

      {/* SEARCH */}

      <div className="container">
        <div
          className="mx-auto"
          style={{
            maxWidth: "520px",
            marginTop: "-35px",
            position: "relative",
            zIndex: 5,
          }}
        >
          <input
            type="text"
            placeholder="Search your favourite food..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSearch()
            }
            className="form-control border-0 shadow-lg"
            style={{
              borderRadius: "50px",
              padding:
                "16px 25px",
              fontSize: "15px",
            }}
          />
        </div>
      </div>

      {/* TYPES */}

      <div className="container py-5">
        <div className="d-flex flex-wrap justify-content-center gap-3">

          {menuTypes.map((type) => (
            <button
              key={type}
              onClick={() =>
                setFoodType(type)
              }
              className="btn"
              style={{
                borderRadius: "30px",
                padding:"10px 25px",
                fontWeight: "600",
                transition:"0.3s ease",
                border:foodType === type ? "none": "1px solid #ddd",
                background:foodType === type? "#d4a373": "#fff",
                color:foodType === type? "#fff": "#444",
                boxShadow: foodType === type? "0 4px 15px rgba(212,163,115,0.3)": "none",
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* CATEGORIES */}

        {categories.length > 0 && (
          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(
                    cat
                  )
                }
                className="btn"
                style={{
                  borderRadius:"20px",
                  padding:"8px 20px",
                  transition:"0.3s ease",
                  border: selectedCategory === cat? "none": "1px solid #ddd",
                  background:selectedCategory === cat? "#d4a373": "#fff",
                  color:selectedCategory === cat? "#fff": "rgb(10, 1, 1)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MENU */}

      <div className="container pb-5">
        <div className="row g-4">
          {filteredItems.map((item) => {
            const discount =
              item.discount || discountConfig[item.id] ||0;

            const finalPrice =item.price - (item.price *discount) /100;

            return (
              <div
                key={item.id}
                id={`menu-item-${item.id}`}
                className="col-lg-4 col-md-6"
              >
                <motion.div
                  whileHover={{y: -6,}}
                  transition={{duration: 0.3,}}
                  style={{
                    background:"#fff",
                    borderRadius:"25px",
                    overflow:"hidden",
                    border:"1px solid #eee",
                    height:"100%",
                    boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
                  }}>
                  {/* IMAGE */}

                  <div
                    style={{
                      height:"250px",
                      overflow:"hidden",
                    }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width:"100%",
                        height:"100%",
                        objectFit:"cover",
                        transition:"0.4s ease",
                      }}
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fw-bold mb-0">
                        {item.name}
                      </h4>

                      {discount >
                        0 && (
                        <span
                          className="badge"
                          style={{
                            background:"#e63946",
                            padding:"7px 10px",
                            fontSize:"12px",
                          }}
                        >{discount}% OFF
                        </span>
                      )}
                    </div>

                    <p
                      className="mt-3"
                      style={{
                        color:"#777",
                        fontSize:"14px",
                        lineHeight:"1.7",
                      }}
                    >
                      Delicious freshly
                      prepared food with
                      premium ingredients.
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-4">

                      <div>
                        {discount >
                        0 ? (
                          <><span
                              style={{
                                textDecoration:"line-through",
                                color:"#999",
                                marginRight:"8px",
                              }}>₹{item.price}
                            </span>

                            <span className="fw-bold fs-5">
                              ₹{finalPrice}
                            </span>
                          </>
                        ) : (
                          <span className="fw-bold fs-5">
                            ₹{item.price}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          dispatch(
                            addToCart(
                              {
                                ...item,
                                price:finalPrice,
                              }
                            )
                          )
                        }
                        className="btn"
                        style={{
                          background:"#d4a373",
                          color:"#fff",
                          borderRadius:"50px",
                          padding:"10px 22px",
                          border:"none",
                          fontWeight:"600",
                          transition:"0.3s ease",
                        }}
                      >
                        Add
                      </button>

                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* EMPTY */}

        {filteredItems.length ===
          0 && (
          <div className="text-center py-5">
            <h4>
              No food items found 😔
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}