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
    <div className="py-4">
      <h2 className="text-center mb-5">🌿 Our Collection</h2>

      {Object.entries(categories).map(([category, categoryPlants]) => (
        <div key={category} className="mb-5">
          <h3
            className="text-uppercase text-muted fw-bold mb-3"
            style={{ borderBottom: "2px solid #e9ecef", paddingBottom: "6px" }}
          >
            {category}
          </h3>
          <div className="row g-4">
            {categoryPlants.map((plant) => (
              <div key={plant.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="card-img-top"
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{plant.name}</h5>
                    <p className="text-success fw-bold fs-5 mt-auto">
                      ${plant.price.toFixed(2)}
                    </p>
                    <button
                      className={`btn ${
                        isInCart(plant.id)
                          ? "btn-outline-success"
                          : "btn-success"
                      } mt-2`}
                      onClick={() => dispatch(addToCart(plant))}
                      disabled={isInCart(plant.id)}
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
  );
}

export default Products;
