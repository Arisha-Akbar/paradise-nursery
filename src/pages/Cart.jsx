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
                <h2>Your cart is empty 🌱</h2>
                <p className="text-muted">Add some plants to get started!</p>
                <Link to="/products" className="btn btn-outline-success mt-3">
                    Browse Plants
                </Link>
            </div>
        );
    }

    return (
        <div className="py-5">
            <h2 className="mb-4 fw-bold">🛒 Your Shopping Cart</h2>

            <div className="row mb-4">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        {cartItems.map((item) => (
                            <div key={item.id} className="card-body border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                            className="rounded"
                                        />
                                    </div>
                                    <div className="col">
                                        <h6 className="fw-bold mb-1">{item.name}</h6>
                                        <p className="text-muted mb-0">
                                            ${item.price.toFixed(2)} each
                                        </p>
                                    </div>
                                    <div className="col-auto d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className="fw-bold" style={{ minWidth: "30px", textAlign: "center" }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="col-auto text-end">
                                        <p className="fw-bold mb-2">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-4"></div>
                    <div className="card shadow-sm bg-light">
                        <div className="card-body">
                            <h5 className="card-title fw-bold mb-3">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Items:</span>
                                <span className="fw-bold">{totalItems}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span className="fs-5 fw-bold">Total:</span>
                                <span className="fs-5 fw-bold text-success">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <button
                                className="btn btn-success w-100 fw-bold mb-2"
                                onClick={() => alert("Checkout feature coming soon!")}
                            >
                                Proceed to Checkout
                            </button>
                            <Link
                                to="/products"
                                className="btn btn-outline-secondary w-100"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
