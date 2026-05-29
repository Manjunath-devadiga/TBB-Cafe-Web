import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  fetchMenuSuccess,
  fetchMenuFailure,
} from "../redux/menuSlice";

import { discountConfig } from "../data/discountConfig";
import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import headerImg from "../assets/Pasta.jpg";

export default function MenuPage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { items } = useSelector(
    (state) => state.menu
  );

  const [foodType, setFoodType] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    const fetchMenu = async () => {
      try {

        const res = await fetch(
          "http://localhost:5000/api/menu"
        );

        const data = await res.json();

        dispatch(
          fetchMenuSuccess(data)
        );

      } catch (err) {

        dispatch(
          fetchMenuFailure(err.message)
        );
      }
    };

    fetchMenu();

  }, [dispatch]);

  useEffect(() => {

    const params =
      new URLSearchParams(
        location.search
      );

    setFoodType(
      params.get("type") || ""
    );

    setSelectedCategory(
      params.get("category") || ""
    );

  }, [location.search]);

  useEffect(() => {
    setSelectedCategory("");
  }, [foodType]);

  const menuTypes = [
    ...new Set(
      items
        .map((item) => item.type)
        .filter(Boolean)
    ),
  ];

  const categories = [
    ...new Set(
      items
        .filter(
          (item) =>
            foodType &&
            item.type === foodType &&
            item.category
        )
        .map(
          (item) => item.category
        )
    ),
  ];

  const filteredItems =
    items.filter((item) => {

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
    });

  const handleSearch = () => {

    const foundItem =
      filteredItems.find((item) =>
        item.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );

    if (foundItem) {

      document.getElementById(`menu-item-${foundItem.id}`)
        ?.scrollIntoView({behavior: "smooth",block: "center"});
    }
  };

  return (

    <div style={{background: "#fff",minHeight: "100vh"}}>
      {/* HERO */}
      <section style={{ height: "50vh",position: "relative"}}>
        <img
          src={headerImg}
          alt=""
          style={{width: "100%",height: "100%",objectFit: "cover",filter:"brightness(60%)"}}/>

        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-white fw-bold menu-heading">
            Menu
          </h1>

          <p className="text-light">
            Freshly crafted food & drinks
          </p>

        </div>
      </section>

      {/* SEARCH */}

      <div className="container py-4">
        <div className="mx-auto"
          style={{maxWidth: "550px",}}>

          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) =>setSearch(e.target.value)}
            onKeyDown={(e) =>e.key === "Enter" && handleSearch()}
            className="form-control"
            style={{
              borderRadius: "40px",
              padding: "15px 22px",
              border:"1px solid #ddd",
              boxShadow:"0 4px 12px rgba(0,0,0,0.05)",
              background: "#fff",
              color: "#000",
            }}
          />
        </div>
      </div>

      {/* MAIN */}

      <div className="container pb-5">
        <div className="row g-4">
          {/* SIDEBAR */}

          <div className="col-12 col-md-4 col-lg-3">
            <div className="menu-sidebar"
              style={{position: "sticky",
                top: "100px",}}>

              <h4
                className="fw-bold mb-4"
                style={{color: "#1e3932"}}>
                Menu
              </h4>

              <div className="d-flex flex-column gap-2">
                {menuTypes.map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => setFoodType(type)}
                      className="btn text-start"
                      style={{background:foodType === type
                            ? "#1e3932"
                            : "transparent",
                        color: foodType === type
                            ? "#fff"
                            : "#333",
                        borderRadius:"12px",
                        padding:"12px 18px",
                        fontWeight:"500",}}>
                      {type}
                    </button>
                  )
                )}
              </div>

              {/* CATEGORY */}

              {categories.length > 0 && (
                <div className="mt-5">
                  <h6 className="fw-bold mb-3">
                    Categories
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    {categories.map(
                      (cat) => (
                        <button
                          key={cat}
                          onClick={() =>setSelectedCategory(cat)}
                          className="btn text-start"
                          style={{background:selectedCategory ===cat
                                ? "#d4a373"
                                : "#f8f8f8",
                            color:selectedCategory ===cat
                                ? "#fff"
                                : "#333",
                            borderRadius:"10px",
                            padding:"10px 16px",}}>
                          {cat}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* MENU ITEMS */}

          <div className="col-12 col-md-8 col-lg-9">
            <div className="row g-4">
              {filteredItems.map(
                (item) => {

                  const discount =
                    item.discount ||
                    discountConfig[item.id] || 0;

                  const finalPrice =
                    item.price -(item.price * discount) /100;

                  return (
                    <div
                      key={item.id}
                      id={`menu-item-${item.id}`}
                      className="col-12 col-sm-12 col-md-6">
                      <motion.div
                        whileHover={{y: -4}}
                        className="menu-card"
                        style={{
                          background:"#fff",
                          borderRadius:"20px",
                          overflow:"hidden",
                          border:"1px solid #eee",
                        }}>

                        {/* IMAGE */}

                        <div className="menu-img-box">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="menu-img"
                          />
                        </div>

                        {/* CONTENT */}

                        <div className="p-3 p-md-4 d-flex flex-column justify-content-between menu-content">
                          <div>
                            <div className="d-flex justify-content-between align-items-start gap-2">
                              <h5 className="fw-bold menu-title mb-0">
                                {item.name}
                              </h5>

                              <span
                                style={{
                                  background:
                                    discount > 0
                                      ? "#e63946"
                                      : "transparent",

                                  color:
                                    discount > 0
                                      ? "#fff"
                                      : "transparent",
                                  fontSize: "11px",
                                  padding: "5px 10px",
                                  borderRadius: "30px",
                                  minWidth: "70px",
                                  textAlign: "center",
                                  whiteSpace: "nowrap",
                                }}>
                                {discount > 0
                                  ? `${discount}% OFF`
                                  : "EMPTY"}
                              </span>
                            </div>
                          </div>
          
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              {discount > 0 ? (
                                <>
                                  <span
                                    style={{
                                      textDecoration:"line-through",
                                      color:"#999",
                                      marginRight:"8px"}}>
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
                              onClick={() => {

                                const user =
                                  JSON.parse(
                                    localStorage.getItem(
                                      "customer"
                                    )
                                  );

                                if (!user) {navigate("/customer-login");
                                  return;
                                }
                                dispatch(addToCart({
                                    ...item,
                                    price:
                                      finalPrice,
                                  })
                                );
                              }}className="btn menu-btn">
                              Add item
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                }
              )}
            </div>

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
      </div>
    </div>
  );
}

