// src/pages/Products.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import plants from "../data/plants";

function Products() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  // Group plants by category
  const categories = plants.reduce((acc, plant) => {
    if (!acc[plant.category]) acc[plant.category] = [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  return (
    <div className="py-4 bg-light">
      <div className="container">
        <h2
          className="text-center mb-5 fw-bold"
          style={{ fontSize: "2.5rem", color: "#2e7d32" }}
        >
          Our Collection
        </h2>

        {Object.entries(categories).map(([category, categoryPlants]) => (
          <div key={category} className="mb-5">
            <h3
              className="text-uppercase text-success fw-bold mb-4"
              style={{
                borderBottom: "3px solid #4caf50",
                paddingBottom: "8px",
                letterSpacing: "1px",
              }}
            >
              {category}
            </h3>
            <div className="row g-4">
              {categoryPlants.map((plant) => (
                <div key={plant.id} className="col-12 col-md-6 col-lg-4">
                  <div
                    className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden"
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.03)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        transition: "filter 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.filter = "brightness(90%)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.filter = "brightness(100%)")
                      }
                    />
                    <div className="card-body d-flex flex-column p-3">
                      <h5
                        className="card-title fw-bold mb-2"
                        style={{ fontSize: "1.25rem" }}
                      >
                        {plant.name}
                      </h5>
                      <p className="text-success fw-bold fs-5 mb-3">
                        ${plant.price.toFixed(2)}
                      </p>
                      <button
                        className={`btn ${
                          isInCart(plant.id)
                            ? "btn-outline-success"
                            : "btn-success"
                        } w-100 py-2 fw-bold`}
                        onClick={() => dispatch(addToCart(plant))}
                        disabled={isInCart(plant.id)}
                        style={{
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isInCart(plant.id)) {
                            e.currentTarget.style.backgroundColor = "#2e7d32";
                            e.currentTarget.style.borderColor = "#2e7d32";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isInCart(plant.id)) {
                            e.currentTarget.style.backgroundColor = "";
                            e.currentTarget.style.borderColor = "";
                          }
                        }}
                      >
                        {isInCart(plant.id) ? "✓ Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
