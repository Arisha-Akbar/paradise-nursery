import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2 className="fw-bold text-success">Your cart is empty</h2>
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
    <div className="cart-page">
      <div className="container">
        <h2 className="cart-title">Your Shopping Cart</h2>

        <div className="cart-summary">
          <strong>Total Items:</strong> {totalItems}
          <span className="ms-3">
            <strong>Total Cost:</strong> ${totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-actions">
          <Link to="/products" className="btn btn-outline-secondary px-4 py-2">
            Continue Shopping
          </Link>
          <button
            className="btn btn-success px-4 py-2 shadow-sm"
            onClick={() => alert("Checkout feature coming soon!")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
