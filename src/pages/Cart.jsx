// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="py-5 text-center">
        <h2 className="fw-bold text-success">Your cart is empty 🌿</h2>
        <p className="text-muted">
          Add some plants and bring your garden to life!
        </p>
        <Link to="/products" className="btn btn-outline-success mt-3 px-4 py-2">
          Browse Plants
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4 container">
      <h2 className="mb-4 fw-bold">Your Shopping Cart</h2>

      <div className="alert alert-success p-3 mb-4 shadow-sm rounded-3">
        <strong>Total Items:</strong> {totalItems}
        <span className="ms-3">
          <strong>Total Cost:</strong> ${totalPrice.toFixed(2)}
        </span>
      </div>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center p-3 mb-3 rounded-3 shadow-sm bg-white"
          style={{ border: "1px solid #eee" }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "90px",
              height: "90px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
            className="shadow-sm"
          />

          <div className="ms-3 flex-grow-1">
            <h5 className="mb-1 fw-semibold">{item.name}</h5>
            <p className="text-muted mb-1">
              Unit Price: ${item.price.toFixed(2)}
            </p>
            <p className="fw-semibold text-success mb-0">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm btn-outline-secondary me-2 rounded-circle"
              style={{ width: "32px", height: "32px" }}
              onClick={() => dispatch(decreaseQuantity(item.id))}
              disabled={item.quantity <= 1}
            >
              −
            </button>

            <span className="mx-2 fw-bold fs-5">{item.quantity}</span>

            <button
              className="btn btn-sm btn-outline-secondary me-3 rounded-circle"
              style={{ width: "32px", height: "32px" }}
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              +
            </button>

            <button
              className="btn btn-sm btn-danger px-3 rounded-3"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 d-flex flex-wrap gap-3">
        <Link to="/products" className="btn btn-outline-secondary px-4 py-2">
          ← Continue Shopping
        </Link>
        <button
          className="btn btn-success px-4 py-2 shadow-sm"
          onClick={() => alert("Checkout feature coming soon!")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
